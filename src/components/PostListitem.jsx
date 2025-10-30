import { Link } from "react-router-dom"
import ImageComp from "./Image"

const PostListitem = () => {
    return (

        <div className="flex flex-col xl:flex-row gap-8">
            {/* image */}
            <div className="md:hidden xl:block xl:w-1/3">
                <ImageComp src="postImg.jpeg" className="rounded-2xl object-cover " width="735" />
            </div>
            {/* detals */}
            <div className="flex flex-col gap-4 xl:w-2/3">
            <Link to="/test"  className="text-4xl font-semibold">
                Lorem ipsum dolor sit amet consectetur elit.consectetur adipisicing elit .
                </Link>

                <div className=" flex items-center gap-2 text-gray-400 test-sm" >
                    <span>Written By </span>
                    <Link className="text-blue-800">John doe </Link>
                    <span>On</span>
                    <Link className="text-blue-800">Web Design </Link>
                    <span>2 days ago </span>
                </div>

                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta, fuga sit? Autem 
                    aliquid inventore corrupti odit eveniet consectetur quaerat necessitatibus odio 
                    cupiditate debitis sint illum ab quos sit,
                     sed perspiciatis.
                     </p>
                     <Link to="/test" className="underline text-blue-800 text-sm " >Read More</Link>

          </div>
        </div>

    )
}


export default PostListitem 
