import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { capitalizeFirstLetter } from "../lib/util";
import { useList } from "@refinedev/core";
import { getAllProjects, getAllEmployees } from "../lib/ApiCalls";
import { useSearchStore } from "../lib/SearchStore.js";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {

  // const { SearchProjects } = useSearchStore((state) => state);
  const projectsWithTechStackNames =  useSearchStore((state) => state.projectsWithTechStackNames);
  const setProjectsWithTechStackNames =  useSearchStore((state) => state.setProjectsWithTechStackNames);
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(1);
  let [isAvailable, setIsAvailable] = useState(false);
  let [searchResults, setSearchResults] = useState(data);
  let [filteredResults, setFilteredResults] = useState(data);
  let [selectedFilter, setSelectedFilter] = useState([]);
  let [query, setQuery] = useState("");
  let [params, setParams] = useState({});
  let [isLoaded, setIsLoaded] = useState(false);
  let [dropDownOptions, setDropDownOptions] = useState([]);

  let allLanguages = [];
  const { data: techStackQuery } = useList({
    resource: "techStack",
    pagination: {
      pageSize: 1000,
    },
  });
  try {
    if (techStackQuery) {
      const techStackQueryData = techStackQuery.data ?? [];
      const techStackQueryDataNames = techStackQueryData.map(
        (techStack) => techStack.name
      );
      allLanguages = techStackQueryDataNames;
    }
  } catch (error) {
    console.error("Error fetching techStackQuery:", error);
  }

  let allIndustries = [];
  const { data: industriesQuery } = useList({
    resource: "industry",
    pagination: {
      pageSize: 1000,
    },
  });
  try {
    if (industriesQuery) {
      const industriesQueryData = industriesQuery.data ?? [];
      const industriesQueryDataNames = industriesQueryData.map(
        (industry) => industry.name
      );
      allIndustries = industriesQueryDataNames;
    }
  } catch (error) {
    console.error("Error fetching industriesQuery:", error);
  }

  let allRoles = [];
  const { data: rolesQuery } = useList({
    resource: "employee",
    pagination: {
      pageSize: 1000,
    },
  });
  try {
    if (rolesQuery) {
      const rolesQueryData = rolesQuery.data ?? [];
      const rolesQueryDataNames = rolesQueryData.map((role) => role.role);
      allRoles = [
        ...new Set(
          rolesQueryDataNames.map((role) =>
            role.toLowerCase().split("_").map(capitalizeFirstLetter).join(" ")
          )
        ),
      ].filter((item) => item !== undefined);
    }
  } catch (error) {
    console.error("Error fetching rolesQuery:", error);
  }
  let allLocations = [];
  const { data: locationsQuery } = useList({
    resource: "employee",
    pagination: {
      pageSize: 1000,
    },
  });
  try {
    if (locationsQuery) {
      const locationsQueryData = locationsQuery.data ?? [];
      const locationsQueryDataNames = locationsQueryData.map(
        (location) => location.location
      );
      allLocations = [...new Set(locationsQueryDataNames)].filter(
        (item) => item !== undefined
      );
    }
  } catch (error) {
    console.error("Error fetching locationsQuery:", error);
  }

  useEffect(() => {
    setIsLoaded(true);
    searchData();
  }, []);

  const searchData = async (page = 1, query = "", params = {}, isAvailable) => {
    setIsAvailable(isAvailable);
    setIsLoading(true);

    try {

      const {employeesWithTechStackNames, TotalPages} = await getAllEmployees(page, query, params, isAvailable);
      const {projectsWithTechStack, TotalProjects} = await getAllProjects(page, query, params, isAvailable);
      // SearchProjects(page, query, params, isAvailable);

      await setProjectsWithTechStackNames(page, query, params, isAvailable);
      setTotalProjects(TotalProjects);
      setTotalPages(TotalPages);
      setdata(employeesWithTechStackNames.concat(projectsWithTechStack));
      setSearchResults(
        employeesWithTechStackNames.concat(projectsWithTechStack)
      );
      if (!isLoaded) {
        setDropDownOptions(
          employeesWithTechStackNames.concat(projectsWithTechStack)
        );
        setIsLoaded(true);
      }

      setFilteredResults(
        employeesWithTechStackNames.concat(projectsWithTechStack)
      );
    } catch (err) {
      console.error("Search error:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (query) => {
    setQuery(query);
    searchData(1, query, params, isAvailable);
  };

  const handleFilterClick = (filter, category) => {
    let newSelectedFilter;

    if (
      selectedFilter.some((f) => f.value === filter && f.category === category)
    ) {
      // Remove filter
      newSelectedFilter = selectedFilter.filter(
        (item) => !(item.value === filter && item.category === category)
      );
    } else {
      // Add filter
      newSelectedFilter = [...selectedFilter, { value: filter, category }];
    }

    setSelectedFilter(newSelectedFilter);

    // Build a query object from all selected filters
    const filterParams = newSelectedFilter.reduce((acc, f) => {
      console.log(f);
      switch (f.category) {
        case "Technologies":
          acc.techStack = [...(acc.techStack || []), f.value];
          break;
        case "Roles":
          acc.role = [...(acc.role || []), f.value];
          break;
        case "Location":
          acc.location = [...(acc.location || []), f.value];
          break;
        case "Industries":
          acc.industry = [...(acc.industry || []), f.value];
          acc.industries = [...(acc.industries || []), f.value];
          break;
        case "Experience":
          acc.experience = [...(acc.experience || []), f.value];
          break;
        default:
          break;
      }
      return acc;
    }, {});

    // Dedupe arrays in params
    Object.keys(filterParams).forEach((key) => {
      if (Array.isArray(filterParams[key])) {
        filterParams[key] = Array.from(new Set(filterParams[key]));
      }
    });

    setParams(filterParams);

    searchData(1, query, filterParams, isAvailable);
  };

  const handleChange = (filter, newSelectedFilter) => {
    const filteredResults = searchResults.filter((employee) => {
      console.log(employee);
      if (newSelectedFilter.length === 0) return true;
      if (employee.years_active) {
        return employee.years_active.split(" ")[0] === filter;
      }
      return false;
    });

    return [...filteredResults];
  };

  return (
    <SearchContext.Provider
      value={{
        selectedFilter,
        handleFilterClick,
        handleInputChange,
        filteredResults,
        setSearchResults,
        handleChange,
        allLanguages,
        allLocations,
        allRoles,
        allIndustries,
        isLoading,
        total,
        projectsWithTechStackNames,
        searchData,
        params,
        query,
        isAvailable,
        totalProjects,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
