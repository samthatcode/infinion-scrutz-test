/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  FaCalendarAlt,
  FaChevronDown,
  // FaFileExport,
  // FaFileUpload,
  FaUpload,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NewCampButton } from "../components";
import Group from "../assets/Group.png";
import { format } from "date-fns";

const Overview = ({ onNewCampaignClick }) => {
  const [selectedDateRange, setSelectedDateRange] = useState([
    new Date(),
    new Date(),
  ]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setSelectedDateRange([start, end]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold capitalize text-xl text-[#247b7b]">
          overview
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border p-1 rounded-md">
            <FaCalendarAlt className="mr-2 text-[#247b7b]" />
            <small className="text-[#4c4c4c] mr-1 ">Date Range</small>
            <span className="mx-1 text-gray-400">|</span>
            <DatePicker
              selected={selectedDateRange[0]}
              onChange={handleDateChange}
              startDate={selectedDateRange[0]}
              endDate={selectedDateRange[1]}
              selectsRange
              inline={false}
              customInput={
                <div className="flex items-center p-1 rounded-md text-gray-500">
                  <span>
                    {selectedDateRange[0] &&
                      format(selectedDateRange[0], "MMM d, yyyy")}
                  </span>
                  <span className="mx-1">-</span>
                  <span>
                    {selectedDateRange[1] &&
                      format(selectedDateRange[1], "MMM d, yyyy")}
                  </span>
                  <FaChevronDown className="ml-2 text-[#247b7b] font-thin" />
                </div>
              }
            />
          </div>
          <button className="flex items-center bg-[#f0f4f4] text-[#247b7b] px-7 py-2 rounded">
            <FaUpload className="mr-2" />
            Export
          </button>
        </div>
      </div>
      <div className="text-center mt-14">
        <img src={Group} alt="Overview Image" className="mx-auto mb-6" />
        <p>No activity yet. Create a new campaign to get started</p>
        <div onClick={onNewCampaignClick}>
          <NewCampButton />
        </div>
      </div>
    </div>
  );
};

export default Overview;
