import { Clock } from "lucide-react";

const ApplicantDashboardCard = ({ applicant, position, time }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-[#FEFAF9] hover:border-[#FEFAF9] transition-colors bg-[#FEF7F4]/95">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 bg-gradient-to-br from-[#EB611F] to-[#EB611F] rounded-xl flex items-center justify-center">
          <span className="text-white font-medium text-sm">
            {applicant.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div>
          <h4 className="text-[15px] font-medium text-[#2A2A2A]">
            {applicant.name}
          </h4>
          <p className="text-sm text-[#6B6A6A]">{position}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center text-xs text-[#6B6A6A]">
          <Clock className="h-3 w-3 mr-1" />
          {time}
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboardCard;
