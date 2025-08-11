import { useState } from "react";

const SalaryRangeSlider = ({ filters, handleFilterChange }) => {
  const [minSalary, setMinSalary] = useState(filters?.minSalary || 0);
  const [maxSalary, setMaxSalary] = useState(filters?.maxSalary || 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#2A2A2A] mb-2">
            Min Salary
          </label>
          <input
            type="number"
            placeholder="0"
            min="0"
            step="1000"
            className="w-full px-3 py-2 border border-[#FEFAF9] rounded-md shadow-sm focus:border-[#EB611F] focus:ring focus:ring-[#EB611F] focus:ring-opacity-50 text-[#2A2A2A] bg-[#FEFAF9]"
            value={minSalary || ""}
            onChange={({ target }) => setMinSalary(target.value)}
            onBlur={() =>
              handleFilterChange(
                "minSalary",
                minSalary ? parseInt(minSalary) : ""
              )
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2A2A2A] mb-2">
            Max Salary
          </label>
          <input
            type="number"
            placeholder="No limit"
            min="0"
            step="1000"
            className="w-full px-3 py-2 border border-[#FEFAF9] rounded-md shadow-sm focus:border-[#EB611F] focus:ring focus:ring-[#EB611F] focus:ring-opacity-50 text-[#2A2A2A] bg-[#FEFAF9]"
            value={maxSalary || ""}
            onChange={({ target }) => setMaxSalary(target.value)}
            onBlur={() =>
              handleFilterChange(
                "maxSalary",
                maxSalary ? parseInt(maxSalary) : ""
              )
            }
          />
        </div>
      </div>

      {(minSalary || maxSalary) && (
        <div className="text-sm text-[#6B6A6A] bg-[#FEFAF9] px-3 py-2 rounded">
          Range: {minSalary ? `$${minSalary.toLocaleString()}` : "$0"} –{" "}
          {maxSalary ? `$${maxSalary.toLocaleString()}` : "No limit"}
        </div>
      )}
    </div>
  );
};

export default SalaryRangeSlider;
