import { FaPlus } from "react-icons/fa"

const NewCampButton = () => {
    return (
        <button className="flex items-center mx-auto mt-4 text-[#e3efef] bg-[#247b7b] px-10 py-2 rounded">
          <FaPlus className="mr-2" />
          New Campaign
        </button>
    )

}

export default NewCampButton