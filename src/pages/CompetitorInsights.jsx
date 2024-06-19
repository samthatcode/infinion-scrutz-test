import { FaClock } from "react-icons/fa";

const CompetitorInsights = () => {
  return (
    <div className="flex items-center justify-center h-[88vh]">
      <div className="text-center">
        <FaClock className="w-20 h-20 mx-auto text-purple-500" />
        <h1 className="mt-6 text-4xl font-bold text-gray-800">Coming Soon</h1>
        <p className="mt-4 text-gray-600">
          We are working hard to bring you something amazing. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default CompetitorInsights;
