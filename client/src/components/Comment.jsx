
import { useAuth, useUser } from "@clerk/clerk-react";
import ImageComp from "./Image"
import { format } from "timeago.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";


const Comment = ({ comment,postId }) => {
    const {user} = useUser();
    const {getToken} = useAuth()
    const role = user?. publicMetadata?.role;


    const queryClient = useQueryClient ()

    const api = import.meta.env.VITE_API_URL
  
  
    const mutation = useMutation({
      mutationFn: async () => {
          const token = await getToken ();
          console.log(token, "this is for commnet token")
          
          const Id = comment._id;
          console.log(Id,"this is comment._id")
        return axios.delete(`${api}/comments/${Id}`, 
        
         {
          headers:{
              Authorization: `Bearer ${token}`,
          },
        });
      },
       
      onSuccess: () => {
        queryClient .invalidateQueries({queryKey:["comments",postId]});
        toast.success("Cmment deleted successfully");
      },
  
      onError:(error) => {
        toast.error(error.response.data);
      }
    });
  

    return (
        <div className="p-4 bg-slate-50 rounded-xl mb-8">
            <div className="flex items-center gap-4">
                <ImageComp src={comment.user.img} className="w-10 h-10 rounded-full object-cover" width="40" />
                <span className="font-medium">{comment?.user?.fullName}</span>
                <span className="text-sm text-gray-500">{format(comment.createdAt)}</span>

                {user && (comment.user.username === user.username || role==="admin") && (
                <span className="text-xs text-red-300 hover:text-red-500 cursor-pointer"
                 onClick={() => mutation.mutate()}
               >
                delete
                {mutation.isLoading &&  <span> (in progress) </span>  }
                 </span> 
                ) }
            </div>
            <div className="mt-4">
                <p>{comment.desc}</p>
            </div>
        </div>
    )
}

export default Comment

















// import ImageComp from "./Image"

// const Comment = ( ) => {
//     return (
//         <div className="p-4 bg-slate-50 rounded-xl mb-8">
           
//             <div className="flex items-center gap-4">
//                 <ImageComp src="userImg.jpeg"  className="w-10 h-10 rounded-full object-cover" width="40" />
//                 <span className="font-medium">John Doe </span>
//                 <span className="text-sm text-gray-500"> 2 days ago </span>
//             </div>
//             <div className="mt-4">
//                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae 
//                     dignissimos impedit fuga culpa dolor facilis labore eos nam magnam,
//                      eveniet dolorum eaque nulla saepe omnis quis nobis tenetur rerum debitis.</p>
//             </div>
//         </div>
//     )
// }

// export default Comment;