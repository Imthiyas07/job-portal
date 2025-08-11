import { useState, useEffect, useMemo } from "react";
import {
  Users,
  Calendar,
  MapPin,
  Briefcase,
  Download,
  Eye,
  ArrowLeft,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { getInitials } from "../../utils/helper";

import DashboardLayout from '../../components/layout/DashboardLayout'
import StatusBadge from "../../components/StatusBadge";
import ApplicantProfilePreview from "../../components/Cards/ApplicantProfilePreview";

const ApplicationViewer = () => {
  const location = useLocation();
  const jobId = location.state?.jobId || null;
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.APPLICATIONS.GET_ALL_APPLICATIONS(jobId)
      );
      setApplications(response.data);
    } catch (err) {
      console.log("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchApplications();
    else navigate("/manage-jobs");
  }, []);

  const groupedApplications = useMemo(() => {
    const filtered = applications.filter((app) => app.job.title.toLowerCase());
    return filtered.reduce((acc, app) => {
      const jobId = app.job._id;
      if (!acc[jobId]) {
        acc[jobId] = {
          job: app.job,
          applications: [],
        };
      }
      acc[jobId].applications.push(app);
      return acc;
    }, {});
  }, [applications]);

  const handleDownloadResume = (resumeUrl) => {
    window.open(resumeUrl, "_blank");
  };

  return (
    <DashboardLayout activeMenu='manage-jobs'>
      {loading && (
        <div className="min-h-screen bg-[#FEF7F4]/95 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EB611F] mx-auto"></div>
            <p className="mt-4 text-[#6B6A6A]">Loading applications...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#FEF7F4]/95">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <button
                onClick={() => navigate("/manage-jobs")}
                className="group flex items-center space-x-2 px-3 py-2 text-sm font-medium text-[#6B6A6A] hover:text-[#2A2A2A] bg-[#FEF7F4]/95 hover:bg-[#FEFAF9] border border-[#FEFAF9] hover:border-transparent rounded-xl transition-all duration-300 shadow-lg shadow-[#FEFAF9] hover:shadow-xl"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Back</span>
              </button>

              <h1 className="text-xl md:text-2xl font-semibold text-[#2A2A2A]">
                Applications Overview
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pb-8">
          {Object.keys(groupedApplications).length === 0 ? (
            <div className="text-center py-16">
              <Users className="mx-auto h-24 w-24 text-[#FEFAF9]" />
              <h3 className="mt-4 text-lg font-medium text-[#2A2A2A]">
                No applications available
              </h3>
              <p className="mt-2 text-[#6B6A6A]">
                No applications found at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.values(groupedApplications).map(
                ({ job, applications }) => (
                  <div
                    key={job._id}
                    className="bg-[#FEF7F4]/95 rounded-xl shadow-md overflow-hidden"
                  >
                    <div className="bg-[#EB611F] px-6 py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h2 className="text-lg font-semibold text-[#FEFAF9]">
                            {job.title}
                          </h2>
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-[#FEFAF9]">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              <span className="text-sm">{job.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-sm">{job.category}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-[#FEF7F4]/95 backdrop-blur-sm rounded-lg px-3 py-2">
                          <span className="text-sm text-[#2A2A2A] font-medium">
                            {applications.length} Application
                            {applications.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="space-y-4">
                        {applications.map((application) => (
                          <div
                            key={application._id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-[#FEFAF9] rounded-lg hover:bg-[#FEFAF9] transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex-shrink-0">
                                {application.applicant.avatar ? (
                                  <img
                                    src={application.applicant.avatar}
                                    alt={application.applicant.name}
                                    className="h-12 w-12 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="h-12 w-12 rounded-full bg-[#FEFAF9] flex items-center justify-center">
                                    <span className="text-[#EB611F] font-semibold">
                                      {getInitials(application.applicant.name)}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-[#2A2A2A]">
                                  {application.applicant.name}
                                </h3>
                                <p className="text-[#6B6A6A] text-sm">
                                  {application.applicant.email}
                                </p>
                                <div className="flex items-center gap-1 mt-1 text-[#6B6A6A] text-xs">
                                  <Calendar className="h-3 w-3" />
                                  <span>
                                    Applied{" "}
                                    {moment(application.createdAt)?.format(
                                      "Do MM YYYY"
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 mt-4 md:m-0">
                              <StatusBadge status={application.status} />
                              <button
                                onClick={() =>
                                  handleDownloadResume(
                                    application.applicant.resume
                                  )
                                }
                                className="inline-flex items-center gap-2 px-3 py-2 bg-[#EB611F] text-[#FEFAF9] text-sm font-medium rounded-lg hover:bg-[#EB611F] transition-colors"
                              >
                                <Download className="h-4 w-4" />
                                Resume
                              </button>

                              <button
                                onClick={() =>
                                  setSelectedApplicant(application)
                                }
                                className="inline-flex items-center gap-2 px-3 py-2 bg-[#FEFAF9] text-[#2A2A2A] text-sm font-medium rounded-lg hover:bg-[#FEFAF9] transition-colors"
                              >
                                <Eye className="h-4 w-4" />
                                View Profile
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {selectedApplicant && (
          <ApplicantProfilePreview
            selectedApplicant={selectedApplicant}
            setSelectedApplicant={setSelectedApplicant}
            handleDownloadResume={handleDownloadResume}
            handleClose={() => {
              setSelectedApplicant(null);
              fetchApplications();
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApplicationViewer;
