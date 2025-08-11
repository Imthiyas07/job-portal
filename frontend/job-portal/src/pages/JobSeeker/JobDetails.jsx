import {
  MapPin,
  DollarSign,
  Building2,
  Clock,
  Users,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import moment from "moment";
import StatusBadge from "../../components/StatusBadge";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { user } = useAuth();
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [jobDetails, setJobDetails] = useState(null);

  const getJobDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.JOBS.GET_JOB_BY_ID(jobId),
        {
          params: { userId: user?._id || null },
        }
      );
      setJobDetails(response.data);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const applyToJob = async () => {
    try {
      if (jobId) {
        await axiosInstance.post(API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId));
        toast.success("Applied to job successfully!");
      }
      getJobDetailsById();
    } catch (err) {
      const errorMsg = err?.response?.data?.message;
      toast.error(errorMsg || "Something went wrong! Try again later");
    }
  };

  useEffect(() => {
    if (jobId && user) {
      getJobDetailsById();
    } else if (!user) {
      navigate("/login");
    }
  }, [jobId, user]);

  return (
    <div className="bg-[#FEF7F4]/95">
      <Navbar />
      <div className="container mx-auto pt-24">
        {jobDetails && (
          <div className="bg-[#FEFAF9] p-6 rounded-2xl border border-[#FEFAF9] shadow-md">
            {/* Header */}
            <div className="relative px-0 pb-8 border-b border-[#FEFAF9]">
              <div className="flex items-center gap-3 mb-6">
                {jobDetails?.company?.companyLogo ? (
                  <img
                    src={jobDetails?.company?.companyLogo}
                    alt="Company Logo"
                    className="h-20 w-20 object-cover rounded-2xl border-4 border-[#FEFAF9] shadow-lg"
                  />
                ) : (
                  <div className="h-20 w-20 bg-[#FEFAF9] border border-[#FEFAF9] rounded-2xl flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-[#6B6A6A]" />
                  </div>
                )}

                <div className="flex-1">
                  <h1 className="text-lg lg:text-xl font-semibold mb-2 leading-tight text-[#2A2A2A]">
                    {jobDetails.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-[#6B6A6A]">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {jobDetails.location}
                      </span>
                    </div>
                  </div>
                </div>

                {jobDetails?.applicationStatus ? (
                  <StatusBadge status={jobDetails.applicationStatus} />
                ) : (
                  <button
                    className="bg-[#EB611F] hover:bg-[#d4551b] text-white px-6 py-2.5 rounded-xl transition-all duration-200 font-semibold transform hover:-translate-y-0.5"
                    onClick={applyToJob}
                  >
                    Apply Now
                  </button>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-[#FEFAF9] text-sm text-[#EB611F] font-semibold rounded-full border border-[#EB611F]/30">
                  {jobDetails.category}
                </span>
                <span className="px-4 py-2 text-sm bg-[#FEFAF9] text-[#6B6A6A] font-semibold rounded-full border border-[#FEFAF9]">
                  {jobDetails.type}
                </span>
                <div className="flex items-center space-x-1 px-4 py-2 bg-[#FEFAF9] text-sm text-[#6B6A6A] font-semibold rounded-full border border-[#FEFAF9]">
                  <Clock className="h-4 w-4" />
                  <span>
                    {jobDetails.createdAt
                      ? moment(jobDetails.createdAt).format("Do MMM YYYY")
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Salary Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#FEFAF9] to-[#FEF7F4] border border-[#FEFAF9] p-6 rounded-2xl mt-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#EB611F]/10 to-[#EB611F]/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-[#EB611F] rounded-xl">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#2A2A2A] mb-1">
                        Compensation
                      </h3>
                      <div className="text-lg font-bold text-[#2A2A2A]">
                        {jobDetails.salaryMin} - {jobDetails.salaryMax}
                        <span className="text-lg text-[#6B6A6A] font-normal ml-1">
                          per year
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-[#EB611F] bg-[#FEFAF9] px-3 py-1 rounded-full border border-[#EB611F]/30">
                    <Users className="h-4 w-4" />
                    <span>Competitive</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 mt-8">
              <h3 className="text-2xl font-bold text-[#2A2A2A] flex items-center space-x-3">
                <div className="w-1 h-8 bg-[#EB611F] rounded-full"></div>
                <span className="text-lg">About This Role</span>
              </h3>
              <div className="bg-[#FEFAF9] border border-[#FEFAF9] rounded-xl p-6">
                <div className="text-sm text-[#6B6A6A] leading-relaxed whitespace-pre-wrap">
                  {jobDetails.description}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-4 mt-8">
              <h3 className="text-2xl font-bold text-[#2A2A2A] flex items-center space-x-3">
                <div className="w-1 h-8 bg-[#EB611F] rounded-full"></div>
                <span className="text-lg">What We're Looking For</span>
              </h3>
              <div className="bg-[#FEFAF9] border border-[#FEFAF9] rounded-xl p-6">
                <div className="text-sm text-[#6B6A6A] leading-relaxed whitespace-pre-wrap">
                  {jobDetails.requirements}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
