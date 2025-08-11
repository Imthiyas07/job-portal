import { Save, X } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const EditProfileDetails = ({
  formData,
  handleImageChange,
  handleInputChange,
  handleSave,
  handleCancel,
  saving,
  uploading,
}) => {
  return (
    <DashboardLayout activeMenu="company-profile">
      {formData && (
        <div className="min-h-screen bg-[#FEF7F4]/95 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#FEF7F4]/95 rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-[#EB611F] px-8 py-6">
                <h1 className="text-lg md:text-xl font-medium text-[#FEFAF9]">
                  Edit Profile
                </h1>
              </div>

              {/* Edit Form */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-[#2A2A2A] border-b pb-2">
                      Personal Information
                    </h2>

                    {/* Avatar Upload */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={formData?.avatar}
                          alt="Avatar"
                          className="w-20 h-20 rounded-full object-cover border-4 border-[#FEFAF9]"
                        />
                        {uploading?.avatar && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-[#FEFAF9] border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block">
                          <span className="sr-only">Choose avatar</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "avatar")}
                            className="block w-full text-sm text-[#6B6A6A] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FEFAF9] file:text-[#2A2A2A] hover:file:bg-[#FEFAF9] transition-colors"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-medium text-[#2A2A2A] mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-[#FEFAF9] rounded-lg focus:ring-2 focus:ring-[#EB611F] focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                      <label className="block text-sm font-medium text-[#2A2A2A] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-3 border border-[#FEFAF9] rounded-lg bg-[#FEFAF9] text-[#6B6A6A]"
                      />
                    </div>
                  </div>

                  {/* Company Information */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-[#2A2A2A] border-b pb-2">
                      Company Information
                    </h2>

                    {/* Company Logo Upload */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={formData.companyLogo}
                          alt="Company Logo"
                          className="w-20 h-20 rounded-lg object-cover border-4 border-[#FEFAF9]"
                        />
                        {uploading.logo && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-[#FEFAF9] border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block">
                          <span className="sr-only">Choose company logo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "logo")}
                            className="block w-full text-sm text-[#6B6A6A] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FEFAF9] file:text-[#2A2A2A] hover:file:bg-[#FEFAF9] transition-colors"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#2A2A2A] mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-[#FEFAF9] rounded-lg focus:ring-2 focus:ring-[#EB611F] focus:border-transparent transition-all"
                        placeholder="Enter company name"
                      />
                    </div>

                    {/* Company Description */}
                    <div>
                      <label className="block text-sm font-medium text-[#2A2A2A] mb-2">
                        Company Description
                      </label>
                      <textarea
                        value={formData.companyDescription}
                        onChange={(e) =>
                          handleInputChange(
                            "companyDescription",
                            e.target.value
                          )
                        }
                        rows={4}
                        className="w-full px-4 py-3 border border-[#FEFAF9] rounded-lg focus:ring-2 focus:ring-[#EB611F] focus:border-transparent transition-all resize-none"
                        placeholder="Describe your company..."
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-[#FEFAF9]">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 border border-[#FEFAF9] text-[#2A2A2A] rounded-lg hover:bg-[#FEFAF9] transition-colors flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || uploading.avatar || uploading.logo}
                    className="px-6 py-3 bg-[#EB611F] text-[#FEFAF9] rounded-lg hover:bg-[#EB611F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {saving ? (
                      <div className="w-4 h-4 border-2 border-[#FEFAF9] border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{saving ? "Saving..." : "Save Changes"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EditProfileDetails;
