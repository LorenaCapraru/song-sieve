import "./FilterOptions.css";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { filterOptionsState } from "@/app/recoil/atoms";
import { useEffect, useState } from "react";

export interface FilterOptions {
  selectedDuration: string | null;
  explicit: string | null;
}

const FilterOptions = () => {
  const [filterOptions, setFilterOptions] = useRecoilState(filterOptionsState);
  const [isAnyOptionSelected, setIsAnyOptionSelected] =
    useState<boolean>(false);

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

  const clearAllFilters = () => {
    setFilterOptions({ selectedDuration: null, explicit: null });
  };

  //check if any of checkboxes is checked for displaying clear button
  useEffect(() => {
    const isSelected =
      filterOptions.selectedDuration !== null ||
      filterOptions.explicit !== null;

    setIsAnyOptionSelected(isSelected);
  }, [filterOptions]);

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
      <fieldset className="checkbox-container">
        <legend>Duration</legend>
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
              aria-labelledby={duration}
            />
            <label htmlFor={duration} id={duration}>
              {duration}
            </label>
          </div>
        ))}
      </fieldset>

      <fieldset className="checkbox-container">
        <legend>Explicit</legend>
        {explicitOptions.map((option) => (
          <div key={option}>
            <input
              type="checkbox"
              id={option}
              name="explicit"
              checked={filterOptions.explicit === option}
              onChange={() => handleCheckboxChange("explicit", option)}
              aria-labelledby={option}
            />
            <label htmlFor={option} id={option}>
              {option}
            </label>
          </div>
        ))}
      </fieldset>

      {isAnyOptionSelected && (
        <button className="clear-filter-button" onClick={clearAllFilters}>
          Clear all filters
        </button>
      )}
      {/* will be visible only for mobile */}
      {/* <button className="submit-filter-button">SUBMIT</button> */}
    </div>
  );
};

export default FilterOptions;
