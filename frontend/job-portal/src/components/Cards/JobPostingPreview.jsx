import {
  MapPin,
  DollarSign,
  ArrowLeft,
  Building2,
  Clock,
  Users,
} from "lucide-react";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import { useAuth } from "../../context/AuthContext";

const JobPostingPreview = ({ formData, setIsPreview }) => {
  const { user } = useAuth();
  const currencies = [{ value: "usd", label: "$" }];

  return (
    <div className="min-h-screen bg-[#FEF7F4]/95 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 backdrop-blur-sm bg-[#FEFAF9] border border-[#FEFAF9] shadow-xl rounded-2xl px-6 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg md:text-xl font-bold text-[#2A2A2A]">
                Job Preview
              </h2>
            </div>
            <button
              onClick={() => setIsPreview(false)}
              className="group flex items-center space-x-2 px-6 py-3 text-xs md:text-sm font-medium text-[#6B6A6A] hover:text-[#2A2A2A] bg-[#FEFAF9] hover:bg-[#FEFAF9] border border-[#FEFAF9] hover:border-transparent rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Edit</span>
            </button>
          </div>

          <div className="">
            <div className="relative bg-[#FEFAF9] px-0 pb-8 mt-8 border-b border-[#FEFAF9]">
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-0">
                  <div className="flex-1">
                    <h1 className="text-lg lg:text-xl font-semibold mb-2 leading-tight text-[#2A2A2A]">
                      {formData.jobTitle}
                    </h1>

                    <div className="flex items-center space-x-4 text-[#6B6A6A]">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {formData.isRemote ? "Remote" : formData.location}
                        </span>
                        {formData.isRemote && formData.location && (
                          <span className="text-sm text-[#6B6A6A]">
                            {" "}
                            • {formData.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {user?.companyLogo ? (
                    <img
                      src={user.companyLogo}
                      alt="Company Logo"
                      className="h-16 md:h-20 w-16 md:w-20 object-cover rounded-2xl border-4 border-[#FEFAF9] shadow-lg"
                    />
                  ) : (
                    <div className="h-20 w-20 bg-[#FEFAF9] border-2 border-[#FEFAF9] rounded-2xl flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-[#6B6A6A]" />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 mt-6 md:mt-0">
                  <span className="px-4 py-2 bg-[#FEFAF9] text-sm text-[#2A2A2A] font-semibold rounded-full border border-[#FEFAF9]">
                    {
                      CATEGORIES.find((c) => c.value === formData.category)
                        ?.label
                    }
                  </span>
                  <span className="px-4 py-2 text-sm bg-[#FEFAF9] text-[#6B6A6A] font-semibold rounded-full border border-[#FEFAF9]">
                    {JOB_TYPES.find((j) => j.value === formData.jobType)?.label}
                  </span>
                  <div className="flex items-center space-x-1 px-4 py-2 bg-[#FEFAF9] text-sm text-[#6B6A6A] font-semibold rounded-full border border-[#FEFAF9]">
                    <Clock className="h-4 w-4" />
                    <span>Posted today</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-0 pb-8 space-y-8">
              <div className="relative overflow-hidden bg-[#FEFAF9] border border-[#FEFAF9] p-6 rounded-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FEFAF9] rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-[#EB611F] rounded-xl">
                        <DollarSign className="h-4 md:h-6 w-4 md:w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#2A2A2A] mb-1">
                          Compensation
                        </h3>
                        <div className="text-sm md:text-lg font-bold text-[#2A2A2A]">
                          {
                            currencies.find(
                              (c) => c.value === formData.currency
                            )?.label
                          }
                          {formData.salaryMin.toLocaleString()} -{" "}
                          {
                            currencies.find(
                              (c) => c.value === formData.currency
                            )?.label
                          }
                          {formData.salaryMax.toLocaleString()}
                          <span className="text-sm md:text-lg text-[#6B6A6A] font-normal ml-1">
                            per year
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-2 text-sm text-[#6B6A6A] bg-[#FEFAF9] px-3 py-1 rounded-full">
                      <Users className="h-4 w-4" />
                      <span>Competitive</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#2A2A2A] flex items-center space-x-3">
                  <div className="w-1 h-8 bg-[#EB611F] rounded-full"></div>
                  <span className="text-base md:text-lg">About This Role</span>
                </h3>
                <div className="bg-[#FEFAF9] border border-[#FEFAF9] rounded-xl p-6">
                  <div className="text-sm text-[#6B6A6A] leading-relaxed whitespace-pre-wrap">
                    {formData.description}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#2A2A2A] flex items-center space-x-3">
                  <div className="w-1 h-8 bg-[#EB611F] rounded-full"></div>
                  <span className="text-base md:text-lg">What We're Looking For</span>
                </h3>
                <div className="bg-[#FEFAF9] border border-[#FEFAF9] rounded-xl p-6">
                  <div className="text-sm text-[#6B6A6A] leading-relaxed whitespace-pre-wrap">
                    {formData.requirements}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingPreview;
