import { Link } from "react-router-dom"
import ImageComp from "./Image"


const FeaturedPost = () => {
    return (
          <div className="mt-8 flex flex-col lg:flex-row gap-8">
           {/* First */}
           <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* image */}
        <div className="w-auto h-auto">
        <ImageComp src="featured1.jpeg" className="rounded-3xl object-cover  w-full h-full top-3 left-3  right-3 bottom-3 "  /></div>
        {/* details */}
        <div className="flex items-center gap-4">
            <h1 className=" font-semibold lg:text-lg ">01.</h1>
            <Link className="text-blue-800 lg:text-lg">Web Design</Link>
            <span className="text-gray-500">2 days ago </span>
        </div>
        {/* title */}
        <Link to="/test" className="text-xl lg:text-3xl font-semibold lg:font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Link>
           </div>
           {/* Other post */}
           <div className=" w-full  lg:w-1/2  flex flex-col gap-4">
            {/* second */}
            <div className=" lg:h-1/3  flex justify-between gap-4">
              <div className="w-1/3 aspect-video">
                <ImageComp 
                src="featured2.jpeg" 
                 className="rounded-3xl  object-cover w-full h-full " width="298"
                 />
                 </div>
                 {/* detaild and title */} 
                 <div className="w-2/3">
                   {/* detals */}
                   <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                    <h1 className="font-semibold">02.</h1>
                    <Link className="text-blue-800">Web Design </Link>
                    <span className="text-gray-500 text-sm">2 days ago  </span>
                   </div>
                   {/* title */}
                   
                   <Link to="/test" className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </Link>
                 </div>

            </div>
            {/* third */}
            <div className="lg:h-1/3 flex justify-between gap-4">
            <div className="w-1/3 aspect-video">
                <ImageComp 
                src="featured3.jpeg" 
                 className="rounded-3xl  object-cover w-full h-full " width="298"
                 />
                 </div>
                 {/* detaild and title */} 
                 <div className="w-2/3">
                   {/* detals */}
                   <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                    <h1 className="font-semibold">02.</h1>
                    <Link className="text-blue-800">Web Design </Link>
                    <span className="text-gray-500 text-sm">2 days ago  </span>
                   </div>
                   {/* title */}
                   
                   <Link to="/test" className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </Link>
                 </div>

            </div>
            {/* fourt */}
            <div className="lg:h-1/3 flex justify-between gap-4">
            <div className="w-1/3 aspect-video">
                <ImageComp 
                src="featured4.jpeg" 
                 className="rounded-3xl  object-cover w-full h-full " width="298"
                 />
                 </div>
                 {/* detaild and title */} 
                 <div className="w-2/3">
                   {/* detals */}
                   <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                    <h1 className="font-semibold">02.</h1>
                    <Link className="text-blue-800">Web Design </Link>
                    <span className="text-gray-500 text-sm">2 days ago  </span>
                   </div>
                   {/* title */}
                   
                   <Link to="/test" className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </Link>
                 </div>

            </div>

           </div>
          </div>
    )
}

export default FeaturedPost