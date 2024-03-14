import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const TimeSheetContext = createContext();

export function TimeSheetProvider({ children }) {
  const [filteredRoaster, setFilteredRoaster] = useState([]);
  const [isFilterting, setIsFiltering] = useState(false);
  const [filterFormData, setFilterFormData] = useState({
    updateType: "",
    attendanceStatus: "",
    dateFrom: "",
    dateTo: "",
    checkInTimeTo: "",
    checkInTimeFrom: "",
    checkOutTimeTo: "",
    checkOutTimeFrom: ""
  });

  const handleGetFilteredFormDataCb = (data, roaster) => {
    const fromDate = new Date(data.dateFrom);
    const toDate = new Date(data.dateTo);

    const filteredData = roaster.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate > fromDate && itemDate < toDate;
    });
    setFilteredRoaster(filteredData);
    setIsFiltering(true);
  };

  return (
    <TimeSheetContext.Provider
      value={{
        isFilterting,
        setIsFiltering,
        filterFormData,
        filteredRoaster,
        setFilterFormData,
        handleGetFilteredFormDataCb
      }}
    >
      {children}
    </TimeSheetContext.Provider>
  );
}

TimeSheetProvider.propTypes = {
  children: PropTypes.node
};

export function useTimeSheet() {
  return useContext(TimeSheetContext);
}
