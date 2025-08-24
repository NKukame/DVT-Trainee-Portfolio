import { SelectScrollable } from "../SortComp/Sort";
import Filter from "../../components/FilterComp/Filter";
import { FilterFunnel02, Folder, Users01 } from "@untitled-ui/icons-react";
import { useState } from "react";

export default function SearchNav({
  filter,
  results,
  isPeopleSearch,
  setSearch,
}) {
  const [isfilter, setFilter] = useState(false);
  const handleSearchFilter = () => {
    filterResults(results, isPeopleSearch, filter);
    setSearch(!isPeopleSearch);
  };

  return (
    <>
      <div className="flex-row flex-row-between align-items-center flex-wrap">
        <div className="flex-row align-items-center search-tabs">
          <TabButton
            text={"People"}
            Icon={Users01}
            handleSearchFilter={handleSearchFilter}
            isPeopleSearch={!isPeopleSearch}
          />
          <TabButton
            text={"Projects"}
            Icon={Folder}
            handleSearchFilter={handleSearchFilter}
            isPeopleSearch={isPeopleSearch}
          />
        </div>

        <div className="mobile-filter">
          <div className="filter-text" onClick={() => setFilter(true)}>
            Filter
          </div>
          <FilterFunnel02 />
        </div>
        <div>
          <SelectScrollable
            filter={filter}
            results={results}
            isPeopleSearch={isPeopleSearch}
          />
        </div>
      </div>
      {isfilter && (
        <div className="filter-modal">
          <div className="filter-heading">
            <p>FILTER MY SEARCH</p>
            <span>x</span>
          </div>
          <Filter />
        </div>
      )}
    </>
  );
}

function TabButton({ text, Icon, handleSearchFilter, isPeopleSearch }) {
  return (
    <button
      className={`flex-row align-items-center font-size-20-px btn-tab gap-10-px font-weight-400 text-gray ${!isPeopleSearch ? "btn-tab-active border-radius-10-px text-black" : ""}`}
      onClick={handleSearchFilter}
    >
      <Icon /> <span>{text}</span>
    </button>
  );
}

function filterResults(results, isProject, filter) {
  if (isProject === true) {
    results = results.filter((result) => {
      return result.project_id !== undefined;
    });
  } else if (isProject === false) {
    results = results.filter((result) => {
      return result.role !== undefined;
    });
  }

  filter(results);
}
