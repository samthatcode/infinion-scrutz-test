import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAsterisk, FaChevronDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import axios from "axios";

const NewCampaign = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [receiveDigest, setReceiveDigest] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("YOUR_BACKEND_API_URL/campaigns", { name, description })
      .then((response) => {
        console.log(Response, response);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error creating the campaign!", error);
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-7 text-[#247b7b]">
        Create New Campaign
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[#666666]">
            Campaign Name{" "}
            <FaAsterisk size={5} className="inline text-red-500 absolute" />
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. The future is now"
            // className="mt-1 p-2 border rounded w-full"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[#666666]">
            Campaign Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // className="mt-1 p-2 border rounded w-full"
            placeholder="Please add a description to your campaign"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Start Date and End Date */}
        <div className="mb-4 flex justify-between">
          <div className="">
            <label className="block text-sm font-medium mb-1 text-[#666666]">
              Start Date{" "}
              <FaAsterisk size={5} className="inline text-red-500 absolute" />
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yy"
              className="w-[24rem] px-4 py-2 border rounded"
            />
          </div>
          <div className="">
            <label className="block text-sm font-medium mb-1 text-[#666666]">
              End Date{" "}
              <FaAsterisk size={5} className="inline text-red-500 absolute" />
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yy"
              className="w-[24rem] px-4 py-2 border rounded"
            />
          </div>
        </div>

        {/* Daily Digest Toggle */}
        <div className="mb-4 flex items-center justify-between text-[#666666]">
          <span>Want to receive daily digest about the campaign?</span>
          <Toggle
            checked={receiveDigest}
            onChange={() => setReceiveDigest(!receiveDigest)}
            className="custom-classname"
            icons={false}
          />
        </div>

        {/* Linked Keywords */}
        <div className="mb-7">
          <label className="block text-sm font-medium mb-1 text-[#666666]">
            Linked Keywords{" "}
            <FaAsterisk size={5} className="inline text-red-500 absolute" />
          </label>
          <textarea
            placeholder="To add keywords, type your keyword and press enter"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Frequency Dropdown */}
        <div className="mb-14">
          <label className="block text-sm font-medium mb-1 text-[#666666]">
            Kindly select how often you want to receive daily digest
          </label>
          <div className="relative">
            <select
              className="px-4 py-2 border rounded appearance-none w-auto cursor-pointer bg-white text-[#666666]"
              style={{ paddingRight: "30px", minWidth: "150px" }}
            >
              <option>Select</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="hourly">Hourly</option>
              <option value="monthly">Monthly</option>
            </select>
            <FaChevronDown className="absolute top-3 left-[7rem] text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="button"
            className="px-20 py-2 bg-white text-[#247b7b] rounded border border-[#247b7b]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-12 py-2 bg-[#247b7b] hover:bg-[#247e7e] font-semibold text-white rounded"
          >
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCampaign;
