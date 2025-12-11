import { Link, useParams } from "react-router-dom"
import ImageComp from "../components/Image"
import PostMenuActions from "../components/PostMenuActions"
import Search from "../components/Search"
import Comments from "../components/Comments"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { format } from "timeago.js"



const fetchPosts = async (slug) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
    return res.data;
}


const SinglePostPage = () => {

    const { slug } = useParams ();
    
    const { isPending, error, data } = useQuery ({
      queryKey:["post",slug],
      queryFn : () => fetchPosts (slug) ,
    });


   if (isPending) return "Loading ... ";
   if (error) return "ُSomething went wrong ! " + error.message;
   if (!data) return "Post not found!";


    return (
      <div className="flex flex-col gap-8  ">
        {/* detail */}
        <div className="flex gap-8">
            <div className=" lg:w-3/5 flex flex-col gap-8 ">
                <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
                   {data.title}
                    </h1>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>Written by </span>
                <Link className="text-blue-800">{data?.user?.username} </Link>
                <span>On</span>
                <Link className="text-blue-800">{data.category} </Link>
                <span>{format (data.createdAt)} </span>
                </div>
                <p className="text-gray-500 font-medium">
                {data.desc}
                </p>
            </div>
            { data.img &&   <div className="hidden lg:block w-2/5">
                 <ImageComp src={data.img} width="600" className=" rounded-2xl" />
            </div>}
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
            </div>
             {/* Menue */}
             <div className="px-4 sticky top-8 self-start">
                <h1 className=" mb-4 text-sm font-medium">Author</h1>
                <div className="flex flex-col gap-4"> 
                <div className="flex items-center gap-8">
                    { data?.user?.img && <ImageComp  src={data.user.img} className="w-12 h-12 rounded-full object-cover" width="48" height="48" />}
                    <Link className="text-blue-800" >{data?.user?.username}</Link>
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
                
                <PostMenuActions  post={data} />
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
          <Comments postId={data._id}/> 
      </div>
            
    )
}

export default SinglePostPage;