import { MapPin, Search } from "lucide-react";

const SearchHeader = ({ filters, handleFilterChange }) => {
  return (
    <div className="bg-[#FEF7F4]/95 rounded-2xl shadow-lg border border-[#FEFAF9] p-4 lg:p-8 mb-6 lg:mb-8">
      <div className="flex flex-col gap-4 lg:gap-6">
        
        {/* Title & Subtitle */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold text-[#2A2A2A] mb-1">
            Find Your Dream Job
          </h1>
          <p className="text-[#6B6A6A] text-sm lg:text-base">
            Discover opportunities that match your passion
          </p>
        </div>

        {/* Search Inputs */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
          {/* Job Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B6A6A]" />
            <input
              type="text"
              placeholder="Job title, company, or keywords"
              className="w-full pl-12 pr-4 py-2 lg:py-2.5 border border-[#FEFAF9] rounded-xl bg-[#FEFAF9] shadow-sm focus:ring-2 focus:ring-[#EB611F]/30 outline-none transition text-[#2A2A2A] placeholder-[#6B6A6A]"
              value={filters.keyword}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
            />
          </div>

          {/* Location Search */}
          <div className="relative min-w-0 lg:min-w-[200px]">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B6A6A]" />
            <input
              type="text"
              placeholder="Location"
              className="w-full pl-12 pr-4 py-2 lg:py-2.5 border border-[#FEFAF9] rounded-xl bg-[#FEFAF9] shadow-sm focus:ring-2 focus:ring-[#EB611F]/30 outline-none transition text-[#2A2A2A] placeholder-[#6B6A6A]"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>

          {/* Search Button */}
          <button className="bg-[#EB611F] hover:bg-[#d4551b] text-white px-6 lg:px-10 py-3 lg:py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 font-semibold text-base transform hover:-translate-y-0.5">
            Search Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
