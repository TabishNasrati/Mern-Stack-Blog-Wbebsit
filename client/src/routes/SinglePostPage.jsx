import { Link } from "react-router-dom"
import ImageComp from "../components/Image"
import PostMenuActions from "../components/PostMenuActions"
import Search from "../components/Search"
import Comments from "../components/Comments"

const SinglePostPage = () => {
    return (
      <div className="flex flex-col gap-8  ">
        {/* detail */}
        <div className="flex gap-8">
            <div className=" lg:w-3/5 flex flex-col gap-8 ">
                <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
                    Lorem ipsum dolor sit amet, consectetur
                     adip volupta deleniti  placeat impedit
                    </h1>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>Written by </span>
                <Link className="text-blue-800">Johan Doe </Link>
                <span>On</span>
                <Link className="text-blue-800">Web Design </Link>
                <span>2 days ago </span>
                </div>
                <p className="text-gray-500 font-medium">
                 Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                 earum distinctio inventore quaerat aperiam provident perspiciatis
                  magnam beatae incidunt porro, ut dolore? Non, tenetur.
                  magnam beatae incidunt porro, ut dolore? Non, tenetur.

                </p>
            </div>
            <div className="hidden lg:block w-2/5">
                 <ImageComp src="postImg.jpeg" width="600" className=" rounded-2xl" />
            </div>
        </div>
          {/* content */}
          <div className="flex flex-col md:flex-row gap-12">
            {/* text */}
            <div className="lg:text-lg flex flex-col gap-6 text-justify">
              
               
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                </p>
               
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                </p>

                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias 
                    suscipit quam vitae officia, quisquam enim. Debitis officiis 
                    recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                     recusandae magnam architecto quasi, itaque voluptatem
                     magni cum nam, maiores natus laudantium odio?
                </p>
            </div>
             {/* Menue */}
             <div className="px-4 sticky top-8 self-start">
                <h1 className=" mb-4 text-sm font-medium">Author</h1>
                <div className="flex flex-col gap-4"> 
                <div className="flex items-center gap-8">
                    <ImageComp  src="userImg.jpeg" className="w-12 h-12 rounded-full object-cover" width="48" height="48" />
                    <Link className="text-blue-800" >John Doe</Link>
                    </div>
                    <p className="text-sm text-gray-500">  magni cum nam, maiores natus laudantium odio .</p>
                    <div className="flex gap-2">
                        <Link>
                        <ImageComp src="facebook.svg"  className="w-5 h-5"  />
                        </Link>
                        <Link>
                        <ImageComp src="instagram.svg" className="w-5 h-5" />
                        </Link>
                        </div>
                    </div>
                
                <PostMenuActions />
                <h1 className="mt-8 mb-4 text-sm font-medium">Catagories</h1>
                <div className="flex flex-col gap-2 text-sm">
                <Link className="underline">All</Link>
                <Link className="underline" to="">Web Desingn</Link>
                <Link className="underline"  to="">Development</Link>
                <Link className="underline"  to="">Databases</Link>
                <Link className="underline"   to="">Search Engines</Link>
                <Link className="underline"   to="">Markiting</Link>
                </div>
                <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
                <Search />
             </div>
          </div>
          <Comments /> 
      </div>
            
    )
}

export default SinglePostPage