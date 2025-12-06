import axios from "axios";
import Comment from "./Comment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";



// const fetchComments = async (postId, getToken) => {
//   const token = await getToken();

//   const res = await axios.get(
//     `${import.meta.env.VITE_API_URL}/comments/${postId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );

//   return res.data;
// };




const fetchComments = async (postId) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`);
  console.log(res, "this is data")
  return res.data;
};



const Comments = ({postId}) => {

    const {user} = useUser();
 
    const {getToken} = useAuth()


    const { isPending, error, data } = useQuery({
      queryKey:["comments", postId],
      queryFn : () => fetchComments(postId, getToken),
    });
    console.log(data, "this is data1")

  const queryClient = useQueryClient ()

  const api = import.meta.env.VITE_API_URL


  const mutation = useMutation({
    mutationFn: async (newComment) => {
      console.log(newComment,"this new post")
        const token = await getToken ();
        console.log(token, "this is for commnet token")
      return axios.post(`${api}/comments/${postId}`, newComment, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
      });
    },
     
    onSuccess: () => {
      queryClient .invalidateQueries({queryKey:["comments",postId]})
    },

    onError:(error) => {
      toast.error(error.response.data)
    }
  });


 const handleSubmit = (e) => {
  e.preventDefault ();
  const formData = new FormData (e.target);


  const data = {
    desc : formData.get("desc"),
  };

  mutation.mutate(data)

 };


    return (
        <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
          <h1 className="text-xl text-gray-500 underline ">Comments</h1>
          <form onSubmit={handleSubmit} 
          className="flex items-center justify-between gap-8 w-full">
            <textarea
            name="desc"
             placeholder="Write a comment ... " 
             className="w-full p-4 rounded-xl"
              /> 
            <button className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">Send</button>
          </form>
          {isPending 
           ? "Loading..."
           : error
           ? "Error loading comments!"  
           :
           <>
             
             {mutation.isPending && mutation.variables && (
                <Comment
                 comment={{
                   desc: `${mutation.variables.desc} (Sending...)`,
                   createdAt: new Date(),
                   user: {
                   img: user.imageUrl,
                   username: user.fullName || user.firstName || user.username,

                      },
                    }}
                   />
                 )}

              { data.map((comment) => (
             <Comment key={comment._id} comment={comment} />
        
        ))}
           
           </>
           
              };
        </div>
        );
      };

export default Comments ;

