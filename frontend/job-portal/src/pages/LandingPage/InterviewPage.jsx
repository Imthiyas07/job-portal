import React, { useState, useEffect, useRef } from 'react';

// Main component for the interview chatbot
const InterviewPage = () => {
    // State variables to manage the chatbot's UI and data
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTtsLoading, setIsTtsLoading] = useState(false);
    // View state controls which screen is displayed: job analysis, role selection, interview chat, or review
    const [view, setView] = useState('jobAnalysis');
    const [jobDesc, setJobDesc] = useState('');
    const [generatedContent, setGeneratedContent] = useState(null);
    const [selectedJobRole, setSelectedJobRole] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const [apiError, setApiError] = useState(null);
    
    // Refs for managing DOM elements and APIs
    const messagesEndRef = useRef(null);
    const audioContextRef = useRef(null);

    // Predefined job roles for a quick start to the interview
    const jobRoles = [
        { name: 'Host / Hostess', description: 'Greeting and seating guests.' },
        { name: 'Server / Waiter / Waitress', description: 'Taking orders and providing table service.' },
        { name: 'Busser / Runner', description: 'Clearing tables and supporting staff.' },
        { name: 'Bartender', description: 'Preparing drinks and serving customers at the bar.' },
        { name: 'Barback', description: 'Assisting the bartender with supplies.' },
        { name: 'Cashier', description: 'Handling transactions and customer payments.' },
        { name: 'Executive Chef / Head Chef', description: 'Leading and managing the kitchen team.' },
        { name: 'Sous Chef', description: 'Assisting the head chef and overseeing kitchen operations.' },
        { name: 'Line Cook', description: 'Preparing dishes on the cooking line.' },
        { name: 'Prep Cook', description: 'Preparing ingredients and food items.' },
        { name: 'Pastry Chef / Baker', description: 'Creating desserts, pastries, and baked goods.' },
        { name: 'Dishwasher', description: 'Cleaning kitchenware and equipment.' },
        { name: 'Kitchen Porter', description: 'Maintaining kitchen cleanliness and hygiene.' },
        { name: 'Restaurant Manager', description: 'Overseeing all restaurant operations.' },
        { name: 'Assistant Manager', description: 'Supporting the manager in daily duties.' },
        { name: 'Shift Supervisor', description: 'Managing staff and operations during a shift.' },
        { name: 'Food & Beverage Manager', description: 'Managing all food and beverage services.' },
        { name: 'Banquet Manager', description: 'Planning and executing banquet events.' },
        { name: 'Steward', description: 'Handling supplies and maintenance tasks.' },
        { name: 'Barista', description: 'Preparing and serving coffee-based drinks.' },
        { name: 'Drive-Thru Operator', description: 'Serving customers through the drive-thru.' },
        { name: 'Delivery Driver', description: 'Delivering orders to customers.' },
        { name: 'Expediter (Expo)', description: 'Ensuring orders are accurate and delivered on time.' },
    ];

    // Scrolls to the bottom of the chat window when a new message is added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Initializes the AudioContext to handle audio playback
    const initializeAudioContext = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
    };

    // Helper function to call the Gemini API with exponential backoff for retries
    const callGeminiAPI = async (payload, model) => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Ensure this is set in your environment variables
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        let retries = 0;
        const maxRetries = 3;
        const initialBackoff = 1000;

        while (retries < maxRetries) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setApiError('Authentication Error (401): The API key is likely missing or invalid.');
                        throw new Error('Authentication Error (401)');
                    } else if (response.status === 429) { 
                        const backoffTime = initialBackoff * Math.pow(2, retries);
                        await new Promise(res => setTimeout(res, backoffTime));
                        retries++;
                        continue;
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setApiError(null);
                return result;

            } catch (error) {
                console.error('Error fetching from Gemini API:', error);
                if (error.message.includes('401')) {
                    setApiError(error.message);
                    throw error;
                }
                setApiError(`Failed to get a response: ${error.message}`);
                return null;
            }
        }
        setApiError('Failed to get a response after multiple retries. Please check your network.');
        return null;
    };
    
    // Helper function to convert base64 PCM audio to a playable WAV Blob
    const pcmToWav = (pcmData, sampleRate) => {
        const pcm16 = new Int16Array(pcmData);
        const dataLength = pcm16.length * 2;
        const buffer = new ArrayBuffer(44 + dataLength);
        const view = new DataView(buffer);

        // Write WAV header
        const writeString = (v, offset, str) => {
            for (let i = 0; i < str.length; i++) v.setUint8(offset + i, str.charCodeAt(i));
        };

        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + dataLength, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(view, 36, 'data');
        view.setUint32(40, dataLength, true);

        let offset = 44;
        for (let i = 0; i < pcm16.length; i++, offset += 2) {
            view.setInt16(offset, pcm16[i], true);
        }
        
        return new Blob([buffer], { type: 'audio/wav' });
    };
    
    // Function to call the TTS API and play audio from the AI's message
    const handleSpeakMessage = async (text) => {
        setIsTtsLoading(true);
        initializeAudioContext();

        const payload = {
            contents: [{
                parts: [{ text: `Say in an informative tone: ${text}` }]
            }],
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: "Charon" }
                    }
                }
            }
        };

        try {
            const result = await callGeminiAPI(payload, "gemini-2.5-flash-preview-tts");
            const part = result?.candidates?.[0]?.content?.parts?.[0];
            const audioData = part?.inlineData?.data;
            const mimeType = part?.inlineData?.mimeType;

            if (audioData && mimeType && mimeType.startsWith("audio/")) {
                const sampleRateMatch = mimeType.match(/rate=(\d+)/);
                const sampleRate = sampleRateMatch ? parseInt(sampleRateMatch[1], 10) : 16000;
                
                const pcmData = Uint8Array.from(atob(audioData), c => c.charCodeAt(0)).buffer;
                const wavBlob = pcmToWav(pcmData, sampleRate);
                const audioUrl = URL.createObjectURL(wavBlob);
                
                const audio = new Audio(audioUrl);
                audio.play();
                audio.onended = () => {
                    URL.revokeObjectURL(audioUrl);
                    setIsTtsLoading(false);
                };
            } else {
                console.error("Invalid audio response from API");
                setIsTtsLoading(false);
            }
        } catch (error) {
            console.error("Error with TTS API:", error);
            setIsTtsLoading(false);
        }
    };
    
    // Handles the start of the interview with the selected job role
    const handleStartInterview = async (role) => {
        setSelectedJobRole(role);
        setView('interview');
        setIsLoading(true);
        const prompt = `You are an interviewer for a ${role} position. Your role is to ask one question at a time to the job candidate. Do not provide answers, additional text, or context. Your only output should be the question itself. Start the interview by asking the first question.`;
        
        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "text/plain" }
        };
        
        const responseText = await callGeminiAPI(payload, "gemini-2.5-flash-preview-05-20");
        const text = responseText?.candidates?.[0]?.content?.parts?.[0]?.text || 'Failed to get a response.';
        setMessages([{ sender: 'ai', text }]);
        setIsLoading(false);
    };

    // Handles sending a user message and getting an AI response
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const newUserMessage = { sender: 'user', text: input };
        setMessages(prevMessages => [...prevMessages, newUserMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        const chatHistory = messages.map(msg => ({
            role: msg.sender === 'ai' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        }));
        chatHistory.push({ role: 'user', parts: [{ text: currentInput }] });

        const evaluationPrompt = `The candidate just said: "${currentInput}". Please provide a brief, professional evaluation of their answer (e.g., "Good answer, you provided a clear example."). Then, ask the next question for a ${selectedJobRole} interview. The entire response must be concise and conversational. Do not provide your own answers or any other text, just the evaluation and the next question.`;
        
        const payload = {
            contents: [...chatHistory, { role: "user", parts: [{ text: evaluationPrompt }] }],
            generationConfig: { responseMimeType: "text/plain" }
        };
        
        const responseText = await callGeminiAPI(payload, "gemini-2.5-flash-preview-05-20");
        const text = responseText?.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, I could not generate a response. Please try again.';
        setMessages(prevMessages => [...prevMessages, { sender: 'ai', text }]);
        setIsLoading(false);
    };
    
    // Handles the analysis of the job description
    const handleAnalyzeJobDesc = async () => {
        if (!jobDesc.trim()) {
            setGeneratedContent({ error: 'Please enter a job description to analyze.' });
            setApiError(null);
            return;
        }

        setGeneratedContent(null);
        setIsLoading(true);

        const prompt = `Analyze the following job description. Extract the most important key skills required for the role, and then generate 5 sample interview questions that a candidate would likely be asked based on this description. Your response must be a JSON object with two keys: "skills" (an array of strings) and "questions" (an array of strings).
        
        Job Description:
        ${jobDesc}
        
        Please provide the JSON object only.`;

        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        skills: {
                            type: "ARRAY",
                            items: { type: "STRING" }
                        },
                        questions: {
                            type: "ARRAY",
                            items: { type: "STRING" }
                        }
                    },
                    propertyOrdering: ["skills", "questions"]
                }
            }
        };

        const response = await callGeminiAPI(payload, "gemini-2.5-flash-preview-05-20");

        if (response) {
            try {
                const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text;
                const parsedData = JSON.parse(responseText);
                setGeneratedContent(parsedData);
                setApiError(null);
            } catch (e) {
                console.error("Failed to parse analysis JSON:", e);
                setGeneratedContent({ error: "Failed to generate analysis. The API response was not valid JSON." });
                setApiError("The API response for analysis was malformed. Please try again.");
            }
        } else {
            setGeneratedContent({ error: "No analysis could be generated. Please check your internet connection and try again." });
        }
        setIsLoading(false);
    };

    // Triggers the interview review
    const handleEndInterview = async () => {
        setIsLoading(true);
        setApiError(null);

        // Filter out user messages that are too short for meaningful review
        const chatTranscript = messages
            .filter(msg => msg.sender === 'user' || msg.sender === 'ai')
            .map(msg => `${msg.sender === 'ai' ? 'Question' : 'Answer'}: ${msg.text}`)
            .join('\n');

        // Create a new, structured prompt for a JSON response
        const prompt = `You are a professional career coach. Your task is to review the following interview transcript for a ${selectedJobRole} position. For each question and answer pair, provide an evaluation, a brief explanation for your feedback, and a suggested, more effective answer. Your response MUST be a JSON array of objects. Each object MUST have the keys "question", "yourAnswer", "evaluation", "explanation", and "suggestedAnswer". DO NOT include any other text, context, or conversational remarks.
        
        If an answer is too brief to be reviewed, your "evaluation" should be "Needs more detail", your "explanation" should state "Your answer was too brief. Please provide more context and specific examples.", and your "suggestedAnswer" should be "Try again by providing a more comprehensive response to the question."
        
        Interview Transcript:
        ${chatTranscript}
        
        JSON array only:`;

        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            question: { type: "STRING" },
                            yourAnswer: { type: "STRING" },
                            evaluation: { type: "STRING" },
                            explanation: { type: "STRING" },
                            suggestedAnswer: { type: "STRING" }
                        }
                    }
                }
            }
        };

        const response = await callGeminiAPI(payload, "gemini-2.5-flash-preview-05-20");
        
        // Check if response is valid before parsing
        if (response) {
            try {
                const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text;
                const parsedData = JSON.parse(responseText);
                // Ensure parsedData is an array
                if (Array.isArray(parsedData) && parsedData.length > 0) {
                    // Check if the first item has an evaluation, if not, set a default
                    if (!parsedData[0].evaluation) {
                        setReviewData([{
                            question: parsedData[0].question,
                            yourAnswer: parsedData[0].yourAnswer,
                            evaluation: 'Needs more detail',
                            explanation: 'Your answer was too brief. Please provide more context and specific examples.',
                            suggestedAnswer: 'Try again by providing a more comprehensive response to the question.'
                        }]);
                    } else {
                        setReviewData(parsedData);
                    }
                    setApiError(null);
                } else {
                    // Handle case where API returns an empty array
                    setReviewData([{
                        question: 'No questions were answered with enough detail.',
                        yourAnswer: 'Your answers were too brief for a meaningful review.',
                        evaluation: 'Cannot review',
                        explanation: 'The AI needs substantial answers to generate a proper evaluation. Try again by providing more detailed responses.',
                        suggestedAnswer: 'Please try again and provide more specific examples and explanations.'
                    }]);
                }
            } catch (e) {
                console.error("Failed to parse review JSON:", e);
                setReviewData([{
                    question: 'Review Generation Failed',
                    yourAnswer: 'An error occurred while processing the review.',
                    evaluation: 'Error',
                    explanation: 'The API returned an invalid response. Please try the interview again.',
                    suggestedAnswer: 'Try refreshing the page and starting a new interview to resolve the issue.'
                }]);
                setApiError("The API response for review was malformed. Please try again.");
            }
        } else {
            // Handle case where API response is null or empty
            setReviewData([{
                question: 'Review Generation Failed',
                yourAnswer: 'An error occurred while generating the review.',
                evaluation: 'Error',
                explanation: 'The API returned no response. This may be a network issue. Please try again.',
                suggestedAnswer: 'Check your internet connection and try the interview again.'
            }]);
        }
        
        setView('review');
        setIsLoading(false);
    };

    // Renders the job description analysis screen
    const renderJobAnalysis = () => (
        <div className="flex flex-col items-center p-6 sm:p-8 md:p-10 space-y-6 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#414349] dark:text-[#fbf1ef] text-center">✨ Job Description Analyzer</h2>
            <p className="text-center text-sm text-[#7d7c7d] dark:text-[#beaca7]">
                Paste a job description below, and I'll generate a list of key skills and sample interview questions.
            </p>
            <textarea
                className="w-full h-40 p-4 text-[#414349] dark:text-[#fbf1ef] bg-[#eeeae8] dark:bg-[#414349] rounded-xl border border-[#c9c5c3] dark:border-[#7d7c7d] focus:outline-none focus:ring-2 focus:ring-[#f25728] resize-none transition-all"
                placeholder="Paste job description here..."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                disabled={isLoading}
            ></textarea>
            <button
                onClick={handleAnalyzeJobDesc}
                className={`w-full bg-[#f25728] hover:bg-[#f43a02] text-[#fbf1ef] font-bold py-4 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-[1.01] ${isLoading ? 'bg-[#9c9a99] cursor-not-allowed' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? 'Analyzing...' : 'Analyze & Generate Questions ✨'}
            </button>

            {generatedContent && (
                <div className="w-full mt-6 p-6 bg-[#f5f1ef] dark:bg-[#414349] rounded-xl shadow-inner border border-[#c9c5c3] dark:border-[#7d7c7d] space-y-6">
                    {generatedContent.error ? (
                        <p className="text-[#f43a02] text-center">{generatedContent.error}</p>
                    ) : (
                        <>
                            <div>
                                <h3 className="text-lg font-bold text-[#414349] dark:text-[#fbf1ef] mb-2">Key Skills</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#7d7c7d] dark:text-[#beaca7]">
                                    {generatedContent.skills.map((skill, index) => (
                                        <li key={index} className="flex items-center space-x-2">
                                            <span className="text-[#f25728]">•</span>
                                            <span>{skill}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#414349] dark:text-[#fbf1ef] mb-2">Sample Questions</h3>
                                <ul className="list-decimal list-inside text-[#7d7c7d] dark:text-[#beaca7] space-y-2">
                                    {generatedContent.questions.map((q, index) => (
                                        <li key={index}>{q}</li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );

    // Renders the role selection screen
    const renderRoleSelection = () => (
        <div className="flex flex-col items-center p-6 sm:p-8 space-y-8 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#414349] dark:text-[#fbf1ef] text-center">Select an Interview Role</h2>
            <p className="text-center text-sm text-[#7d7c7d] dark:text-[#beaca7]">
                Choose a role to begin a mock interview tailored to that position.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl overflow-y-auto">
                {jobRoles.map((role) => (
                    <button
                        key={role.name}
                        onClick={() => handleStartInterview(role.name)}
                        className="flex flex-col items-center justify-center p-5 bg-[#f5f1ef] dark:bg-[#414349] rounded-xl shadow-md transition-all hover:bg-[#eeeae8] dark:hover:bg-[#7d7c7d] transform hover:scale-[1.02]"
                    >
                        <span className="text-lg font-semibold text-[#414349] dark:text-[#fbf1ef]">{role.name}</span>
                        <span className="text-xs text-[#7d7c7d] dark:text-[#beaca7] text-center mt-2">{role.description}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    // Renders the main chat interface for the interview
    const renderInterviewChat = () => (
        <>
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                        <div className={`flex items-end max-w-[85%] sm:max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                            {msg.sender === 'ai' && (
                                <button
                                    onClick={() => handleSpeakMessage(msg.text)}
                                    className="mx-2 text-[#7d7c7d] dark:text-[#beaca7] hover:text-[#f25728] transition-colors disabled:opacity-50"
                                    disabled={isTtsLoading}
                                    aria-label="Speak message"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${isTtsLoading ? 'animate-pulse' : ''}`}>
                                        <path d="M13.5 4.5a1.5 1.5 0 0 0-3 0V5.5c-4.478.486-7.942 2.502-9.467 5.753a1.47 1.47 0 0 0-.251 1.05c.18 1.157.653 2.193 1.348 3.05a.755.755 0 0 0 .546.222H6a.75.75 0 0 1 .75.75v3.253a.75.75 0 0 1-1.5 0v-2.695H3.14a.763.763 0 0 0-.546.221c-.7.857-1.173 1.893-1.348 3.05a1.47 1.47 0 0 0 .252 1.051C3.109 21.054 6.573 23.07 11 23.586V22.5a1.5 1.5 0 0 0 3 0v1.086c4.427-.516 7.891-2.532 9.468-5.783a1.47 1.47 0 0 0-.252-1.05c-.695-.857-1.168-1.893-1.348-3.05a.763.763 0 0 0-.546-.221H18a.75.75 0 0 1-.75-.75V8.25a.75.75 0 0 1 1.5 0V9.695h1.36a.755.755 0 0 0 .546-.221c.695-.857 1.168-1.893 1.348-3.05a1.47 1.47 0 0 0-.252-1.051C20.891 3.946 17.427 1.93 13.5 1.414V4.5z" />
                                    </svg>
                                </button>
                            )}
                            <div 
                                className={`p-4 rounded-3xl shadow-md text-base leading-relaxed whitespace-pre-wrap ${
                                    msg.sender === 'user' 
                                        ? 'bg-[#f25728] text-[#fbf1ef] rounded-br-none' 
                                        : 'bg-[#f5f1ef] dark:bg-[#414349] text-[#414349] dark:text-[#fbf1ef] rounded-bl-none'
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="p-4 rounded-3xl shadow-md bg-[#f5f1ef] dark:bg-[#414349] text-[#414349] dark:text-[#fbf1ef] animate-pulse">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-[#7d7c7d] rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-[#7d7c7d] rounded-full animate-bounce delay-150"></div>
                                <div className="w-2 h-2 bg-[#7d7c7d] rounded-full animate-bounce delay-300"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area and controls */}
            <div className="p-4 border-t border-[#c9c5c3] dark:border-[#7d7c7d] bg-[#fbf1ef] dark:bg-[#414349] rounded-b-2xl">
                {apiError && (
                    <div className="bg-red-500 text-white p-3 mb-4 rounded-xl text-sm font-medium text-center shadow-md">
                        {apiError}
                    </div>
                )}
                <form onSubmit={handleSendMessage} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your answer here..."
                        className="flex-1 p-4 border border-[#c9c5c3] dark:border-[#7d7c7d] rounded-full focus:outline-none focus:ring-2 focus:ring-[#f25728] dark:bg-[#7d7c7d] dark:text-[#fbf1ef]"
                        disabled={isLoading}
                    />
                    <div className="flex space-x-3 mt-2 sm:mt-0">
                        <button
                            type="submit"
                            className={`px-8 py-4 rounded-full font-bold text-[#fbf1ef] transition-colors duration-200 shadow-md
                                ${isLoading ? 'bg-[#9c9a99] cursor-not-allowed' : 'bg-[#f25728] hover:bg-[#f43a02]'}`}
                            disabled={isLoading}
                        >
                            Send
                        </button>
                    </div>
                </form>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm space-y-3 sm:space-y-0">
                    <button onClick={() => setView('roleSelection')} className="text-[#7d7c7d] hover:text-[#f25728] transition-colors font-medium">
                        Start a New Interview
                    </button>
                    <button onClick={handleEndInterview} className="px-6 py-3 bg-[#f43a02] text-[#fbf1ef] rounded-full font-bold shadow-lg hover:bg-[#f25728] transition-transform duration-300 transform hover:scale-[1.02]">
                        End Interview & Get Review
                    </button>
                </div>
            </div>
        </>
    );

    // Renders the review screen with feedback and suggestions
    const renderReview = () => (
        <div className="flex flex-col p-6 sm:p-8 space-y-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#414349] dark:text-[#fbf1ef] text-center">Interview Review</h2>
            <p className="text-center text-sm text-[#7d7c7d] dark:text-[#beaca7]">
                Here is a detailed breakdown of your interview performance for the <strong className="font-semibold text-[#f25728]">{selectedJobRole}</strong> role.
            </p>

            {reviewData && reviewData.length > 0 ? (
                reviewData.map((item, index) => (
                    <div key={index} className="bg-[#f5f1ef] dark:bg-[#414349] p-6 rounded-2xl shadow-md border border-[#c9c5c3] dark:border-[#7d7c7d] space-y-5">
                        {item.error ? (
                            <p className="text-[#f43a02] font-semibold text-center">{item.error}</p>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-[#414349] dark:text-[#fbf1ef]">Question</h3>
                                    <p className="text-base text-[#7d7c7d] dark:text-[#beaca7] italic leading-snug">"{item.question || 'N/A'}"</p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-[#414349] dark:text-[#fbf1ef]">Your Answer</h3>
                                    <p className="text-base text-[#7d7c7d] dark:text-[#beaca7] leading-snug">"{item.yourAnswer || 'No answer provided'}"</p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-[#414349] dark:text-[#fbf1ef]">Evaluation</h3>
                                    <p className="text-base text-[#7d7c7d] dark:text-[#beaca7] font-semibold leading-snug">{item.evaluation || 'No evaluation available'}</p>
                                    <p className="text-sm text-[#7d7c7d] dark:text-[#beaca7] leading-relaxed">{item.explanation || 'No explanation available.'}</p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-[#414349] dark:text-[#fbf1ef]">Suggested Answer</h3>
                                    <p className="text-base text-[#7d7c7d] dark:text-[#beaca7] italic leading-relaxed">"{item.suggestedAnswer || 'N/A'}"</p>
                                </div>
                            </>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-[#f43a02] text-center">Failed to load review data. Please try the interview again.</p>
            )}

            <button onClick={() => setView('roleSelection')} className="mt-6 w-full bg-[#f25728] hover:bg-[#f43a02] text-[#fbf1ef] font-bold py-4 px-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-[1.02]">
                Start a New Interview
            </button>
        </div>
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#fbf1ef] dark:bg-[#414349] font-inter p-2 sm:p-4">
            <div className="w-full bg-[#eeeae8] dark:bg-[#414349] rounded-2xl shadow-xl flex flex-col h-[90vh] sm:h-[80vh]">
                
                {/* Header with navigation */}
                <div className="p-4 sm:p-6 bg-[#f5f1ef] dark:bg-[#7d7c7d] rounded-t-2xl border-b border-[#c9c5c3] dark:border-[#beaca7] flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-[#414349] dark:text-[#fbf1ef] text-center">AI Interview Prep</h1>
                    <div className="flex justify-center space-x-2 sm:space-x-4 mt-4 bg-[#eeeae8] dark:bg-[#414349] p-1 rounded-full shadow-inner">
                        <button 
                            onClick={() => { setView('jobAnalysis'); setMessages([]); setSelectedJobRole(null); }}
                            className={`py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${view === 'jobAnalysis' ? 'bg-[#f25728] text-[#fbf1ef] shadow-md' : 'text-[#7d7c7d] dark:text-[#beaca7] hover:bg-white/50 dark:hover:bg-[#414349]'}`}
                        >
                            Job Analysis
                        </button>
                        <button 
                            onClick={() => { setView('roleSelection'); setMessages([]); setSelectedJobRole(null); }}
                            className={`py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${view === 'roleSelection' || view === 'interview' || view === 'review' ? 'bg-[#f25728] text-[#fbf1ef] shadow-md' : 'text-[#7d7c7d] dark:text-[#beaca7] hover:bg-white/50 dark:hover:bg-[#414349]'}`}
                        >
                            Interview Chat
                        </button>
                    </div>
                </div>

                {/* Dynamic content based on the current view state */}
                {view === 'jobAnalysis' && renderJobAnalysis()}
                {view === 'roleSelection' && renderRoleSelection()}
                {view === 'interview' && renderInterviewChat()}
                {view === 'review' && renderReview()}
            </div>
        </div>
    );
}

export default InterviewPage;