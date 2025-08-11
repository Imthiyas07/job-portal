import { Briefcase } from "lucide-react";
import moment from "moment";

const JobDashboardCard = ({ job }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-[#FEFAF9] hover:border-[#FEFAF9] transition-colors bg-[#FEF7F4]/95">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 bg-[#FEFAF9] rounded-xl flex items-center justify-center">
          <Briefcase className="h-5 w-5 text-[#EB611F]" />
        </div>
        <div>
          <h4 className="text-[15px] font-medium text-[#2A2A2A]">{job.title}</h4>
          <p className="text-xs text-[#6B6A6A]">
            {job.location} • {moment(job.createdAt)?.format("Do MM YYYY")}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            !job.isClosed
              ? "bg-green-100 text-green-700"
              : "bg-[#FEFAF9] text-[#6B6A6A]"
          }`}
        >
          {job.isClosed ? "Closed" : "Active"}
        </span>
      </div>
    </div>
  );
};

export default JobDashboardCard;
