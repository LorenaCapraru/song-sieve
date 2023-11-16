import "./FilterOptions.css";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { filterOptionsState } from "@/app/recoil/atoms";

export interface FilterOptions {
  selectedDuration: string | null;
  explicit: string | null;
}

const FilterOptions = () => {
  const [filterOptions, setFilterOptions] = useRecoilState(filterOptionsState);
  const durations = [
    "less than 2 minutes",
    "2-5 minutes",
    "5-10 minutes",
    "more than 10 minutes",
  ];
  const explicitOptions = ["Yes", "No"];

  const handleCheckboxChange = (type: keyof FilterOptions, value: string) => {
    if (filterOptions[type] === value) {
      setFilterOptions({ ...filterOptions, [type]: null });
    } else {
      setFilterOptions({ ...filterOptions, [type]: value });
    }
  };

  return (
    <div className="filter-options">
      <div className="filter-icon-title">
        <Image
          src="/icons/filter-icon.svg"
          width={25}
          height={25}
          alt="Filter icon"
        />
        <p>Filter</p>
      </div>
      <div>
        <label>
          Duration
          {durations.map((duration) => (
            <div key={duration}>
              <input
                type="checkbox"
                id={duration}
                name="duration"
                checked={filterOptions.selectedDuration === duration}
                onChange={() =>
                  handleCheckboxChange("selectedDuration", duration)
                }
              />
              <label htmlFor={duration}>{duration}</label>
            </div>
          ))}
        </label>
      </div>
      <div>
        <label>
          Explicit
          {explicitOptions.map((option) => (
            <div key={option}>
              <input
                type="checkbox"
                id={option}
                name="explicit"
                checked={filterOptions.explicit === option}
                onChange={() => handleCheckboxChange("explicit", option)}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </label>
      </div>
    </div>
  );
};

export default FilterOptions;
