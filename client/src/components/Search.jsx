import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value;

      if (location.pathname === "/posts") {
        
        setSearchParams({
          ...Object.fromEntries(searchParams),
          searchQuery: query,
        });
      } else {
        
        navigate(`/posts?searchQuery=${query}`);
      }
    }
  };

  return (
    <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
      <CiSearch className="w-6 h-6 cursor-pointer"   />
      <input
        type="text"
        placeholder="Search a post..."
        className="bg-transparent w-[200px]"
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default Search;
