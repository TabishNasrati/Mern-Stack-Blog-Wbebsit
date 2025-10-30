import { CiSearch } from "react-icons/ci";
const Search = () => {
    return (
        <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
        <CiSearch className="w-6 h-6 " />
        <input type="text" placeholder="  search a post ..." className="bg-transparent w-[200px] h-4"></input>
        </div>
    )
}

export default Search