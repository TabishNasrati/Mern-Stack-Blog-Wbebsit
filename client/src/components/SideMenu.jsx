import { Link } from "react-router-dom"
import Search from "./Search"

const SideMenu = () => {
    return (
        <div className="px-4 h-max sticky top-8">
            <h1 className="mb-4 text-sm font-medium" >Search</h1>
             <Search />
            <h1 className="mt-8 mb-4 text-sm font-medium" >Filter</h1>
            <div className="flex flex-col gap-2 text-sm">
                <label  htmlFor=""  className="flex items-center gap-2 cursor-pointer">
                   <input 
                   type="radio"
                    name="sort"
                     value="newest"
                      className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm  bg-white checked:bg-blue-800" 
                   />
                   Newest
                </label>
                <label  htmlFor=""  className="flex items-center gap-2 cursor-pointer">
                   <input
                    type="radio"
                     name="sort"
                      value=" Most Popular"
                       className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800" 
                   />
                   Most Popular
                </label>
                <label  htmlFor=""  className="flex items-center gap-2 cursor-pointer">
                   <input
                    type="radio"
                     name="sort"
                      value="Trending"
                       className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800" 
                   />
                   Trending
                </label>
                <label  htmlFor=""  className="flex items-center gap-2 cursor-pointer">
                   <input
                    type="radio"
                     name="sort"
                      value="Oldest"
                       className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800" 
                   />
                   Oldest
                </label>
            </div>
            <h1 className="mt-8 text-sm font-medium" >Categories</h1>
            <div className="flex flex-col gap-2 text-sm">   
                <Link  className="underline"   to="/Posts">All</Link>
                <Link  className="underline"   to="/Posts?cat=web-design" >WebDesign </Link>
                <Link  className="underline"   to="/Posts?cat=development" >Development</Link>
                <Link  className="underline"   to="/Posts?cat=databases" >Databases</Link>
                <Link  className="underline"   to="/Posts?cat=seo" >Search Engines</Link>
                <Link  className="underline"   to="/Posts?cat=marketing" >Marketing</Link>
            </div>
        </div>
    )
}

export default SideMenu