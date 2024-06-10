import React, { useEffect, useState } from "react";
import Select from "react-select";
function TasksFilter({
  fieldsDropDownData = {},
  Qparams,
  setQParams,
  customForm,
}) {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filterableInputsInBox, setFilterableInputsInBox] = useState();

  function handlefilters() {
    setQParams({
      ...Qparams,
      ...selectedFilters,
    });
    setFilterDrawerOpen(!filterDrawerOpen);
  }
  const handleFilterChange = (filterName, selectedValue) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filterName]: selectedValue,
    }));
  };

  const handleDateFilterChange = (filterName, selectedValue, dateRange) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filterName]: {
        ...prevState[filterName],
        [dateRange]: selectedValue,
      },
    }));
  };

  console.log(selectedFilters, "selectedFilters");

  const handleFilterReset = () => {
    setSelectedFilters({});
    setQParams({
      search: Qparams?.search,
      page: Qparams?.page,
      pageSize: Qparams?.pageSize,
    });
    setFilterDrawerOpen(!filterDrawerOpen);
  };
  const filterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };
  return (
    <div className="mt-1">
      <button
        onClick={filterDrawer}
        className="focus:outline-none gap-x-1 px-4  text-sm font-[500] text-gray-500 hover:text-orange-600 "
        title="Filter"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      {/* for filter open */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 ${
          filterDrawerOpen ? "" : "opacity-0 pointer-events-none"
        }`}
        style={{ transition: "opacity 0.3s ease-in-out" }}
      >
        <div
          className="fixed inset-y-0 right-0 w-full md:w-4/12 lg:w-1/5 xl:w-1/5 bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out  "
          style={{
            transform: `translateX(${filterDrawerOpen ? "0%" : "100%"})`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <div className=" bg-gray-100 px-5 py-4 flex justify-between z-[3]">
            <h5 className="font-[500] "> Filters</h5>
            <button onClick={filterDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div
            className="overflow-y-auto px-0.5 py-2.5 content relative"
            style={{ maxHeight: "calc(100vh - 7rem)" }}
          >
            <div className="text-start px-3 ">
              <label className="block text-sm font-medium leading-6 mt-2 text-[#878a99]">
              Entity
              </label>
              <div className="relative w-full">
              <Select
                //   options={selectedModuleList}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,

                      backgroundColor: "#f9fafb", // Change the background color of the select input
                      borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                      borderColor: state.isFocused ? "#orange-400" : "#d1d5db", // Change border color when focused
                      boxShadow: state.isFocused ? "none" : provided.boxShadow, // Optionally remove box shadow when focused
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      fontSize: "12px", // Adjust the font size of the placeholder text
                      color: "#a9a9a9",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      color: state.isFocused ? "#fff" : "#000000",
                      backgroundColor: state.isFocused
                        ? "#ea580c"
                        : "transparent",

                      "&:hover": {
                        color: "#fff",
                        backgroundColor: "#ea580c",
                      },
                    }),
                    fontSize: "14px",
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                      ...theme.colors,

                      primary: "#fb923c",
                    },
                  })}
                  menuPortalTarget={document.body}
                  closeMenuOnScroll={() => true}
                  menuPlacement="auto"
                  maxMenuHeight={150}
                //   value={report.selectedIdFromList}
                //   onChange={(selectedOption) => {
                //     setReport((prev) => ({
                //       ...prev,
                //       selectedIdFromList: selectedOption,
                //     }));
                //     setQParams((prev) => ({
                //       ...prev,
                //       listID: selectedOption.value,
                //     }));
                //   }}
                />
              </div>
              <label className="block text-sm font-medium leading-6 mt-2 text-[#878a99]">
                Board Meeting
              </label>
              <div className="relative w-full">
                <Select
                  className="text-sm"
                  // name={item.inputname}
                  // options={data?.fieldsDropDownData?.entityname}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      fontSize: "10px",
                      backgroundColor: "#f9fafb", // Change the background color of the select input
                      borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                      borderColor: state.isFocused ? "#orange-400" : "#d1d5db", // Change border color when focused
                      boxShadow: state.isFocused ? "none" : provided.boxShadow, // Optionally remove box shadow when focused
                    }),

                    placeholder: (provided) => ({
                      ...provided,
                      fontSize: "12px", // Adjust the font size of the placeholder text
                      color: "#a9a9a9",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      color: state.isFocused ? "#fff" : "#000000",
                      backgroundColor: state.isFocused
                        ? "#ea580c"
                        : "transparent",

                      "&:hover": {
                        color: "#fff",
                        backgroundColor: "#ea580c",
                      },
                      fontSize: "14px",
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                      ...theme.colors,

                      primary: "#fb923c",
                    },
                  })}
                  // value={selectedEntityOption}
                  // onChange={(selectedOption) => {
                  //   handleEntityName(selectedOption, index);
                  // }}
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 bg-gray-100 flex justify-between p-3 w-full ">
            <button
              onClick={handleFilterReset}
              className="mr-3 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white "
            >
              Clear
            </button>
            <button
              onClick={handlefilters}
              className="mr-3 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TasksFilter;
