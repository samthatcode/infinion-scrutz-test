/* eslint-disable react/prop-types */
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Pending = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();

  const handleCloseButton = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <>
      {showModal ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-w-md">
                <div className="sm:flex sm:items-start ">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="flex items-center flex-col">
                      <AiOutlineExclamationCircle className="text-[#FF9900] text-2xl" />
                      <h2 className="text-[#FF9900] text-xl font-medium mt-2">Pending</h2>
                    </div>
                    <p className="mt-4 [#1a1619] text-center text-[12px] font-medium">
                      Your registration is awaiting approval from our partnership team.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleCloseButton}
                  type="button"
                  className="w-full bg-[#039BF0] hover:bg-[#039Be5] text-white py-2 px-4 rounded"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Pending;

