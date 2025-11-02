import { BiBookmarkPlus } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";
const PostMenuActions = () => {
    return (
        <div className="">
            <h1 className=" mt-8 mb-4 text-sm font-medium" >Actions</h1>
            <div className="flex items-center gap-2 py-1 text-sm cursor-pointer">
            <BiBookmarkPlus className="w-6 h-10 "  />
            <span>Save this Post </span>
            </div>
            <div className="flex items-center gap-2 py-1 text-sm cursor-pointer">
            <MdDeleteSweep  className="w-6 h-10 "  />
            <span>Delete this Post </span>
            </div>
        </div>
    )
}

export default PostMenuActions