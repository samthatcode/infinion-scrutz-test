import { FaSearch } from "react-icons/fa"

const Search = () => {
  return (
    <div className="flex items-center relative">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#247b7b]"
              style={{ paddingRight: "7.5rem" }}
            />
            <FaSearch className="absolute right-4 text-gray-500" />
          </div>
  )
}

export default Search