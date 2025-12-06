import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BiBookmarkPlus } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";
import {toast} from "react-toastify"
import { useNavigate} from "react-router-dom"

const PostMenuActions = ({ post }) => {
  const { user } = useUser();   
  const { getToken } = useAuth();  
  const navigate = useNavigate ()


  const { isPending, error, data:savedPosts } = useQuery ({
    queryKey:["savedPosts"],
    queryFn : async () =>  {
        const token = await getToken ()
        return axios.get (`${import.meta.env.VITE_API_URL}/users/saved`, {
           headers : {
            Authorization : `Bearer ${token}`,
           } ,
        });  
         
    }, 
  });

  const savedList = savedPosts?.data?.savedPosts || [];
  const isSaved = savedList.includes(post._id);
  

     const deleteMutation = useMutation ({
        mutationFn : async () => {
            const token = await getToken () ;
            return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        onSuccess: () => {
            toast.success ("Post deleted successfully!");
            navigate("/");
        },
        onError :(error) => {
            toast.error (error.response.data);

        },
     });

       
     const handleDelete = () => {
        deleteMutation.mutate();
     };



     const saveMutation = useMutation({
        mutationFn: async () => {
          const token = await getToken();
          return axios.post(
            `${import.meta.env.VITE_API_URL}/users/saved/${post._id}`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        },
        onSuccess: () => {
          toast.success("Post saved!");
        },
        onError: () => {
          toast.error("Failed to save post");
        }
      });
      



  return (
    <div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>

      <div 
  className="flex items-center gap-2 py-1 text-sm cursor-pointer" 
  onClick={() => saveMutation.mutate()}
>
  <BiBookmarkPlus className="w-6 h-10" />
  <span>{isSaved ? "Unsave Post" : "Save this Post"}</span>
  {saveMutation.isPending && <span className="text-xs">(saving...)</span>}
</div>


{user && (
  <div
    className="flex items-center gap-2 py-1 text-sm cursor-pointer"
    onClick={handleDelete}
  >
    <MdDeleteSweep className="w-6 h-10" />
    <span>Delete this Post</span>
    {deleteMutation.isPending && <span className="text-xs">(in progress)</span>}
  </div>
)}
    </div>
  );
};

export default PostMenuActions;
