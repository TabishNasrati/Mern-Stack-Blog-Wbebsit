import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BiBookmarkPlus } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const PostMenuActions = ({ post }) => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  console.log(user, "this is user detail from clerk")


  const isAdmin = user?.publicMetadata?.role === "admin" || false;
  

  // Fetch saved posts (normalized to array of ids)
  const {
    data: savedList = [],
    isPending,
    isError: savedError,
  } = useQuery({
    queryKey: ["savedPosts"],
    // enabled: isLoaded, // wait for clerk user to be loaded
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Normalize: API might return array of ids or array of post objects
      const raw = res?.data?.savedPosts ?? [];
      return raw.map((item) => (typeof item === "string" ? item : item._id || item.id));
    },
    staleTime: 1000 * 60 * 1, // optional: 1 minute
  });

  const isSaved = savedList.includes(post._id);

  // Toggle save/unsave mutation
  const toggleSaveMutation = useMutation({
    mutationFn: async (shouldSave) => {
      const token = await getToken();
      if (shouldSave) {
        // save
        return axios.post(
          `${import.meta.env.VITE_API_URL}/users/saved/${post._id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // unsave (assumes backend exposes DELETE /users/saved/:postId)
        return axios.delete(`${import.meta.env.VITE_API_URL}/users/saved/${post._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    },
    onSuccess: (_, shouldSave) => {
      // refresh saved list
      queryClient.invalidateQueries(["savedPosts"]);
      toast.success(shouldSave ? "Post saved!" : "Post unsaved!");
    },
    onError: (err) => {
      const msg = err?.response?.data?.message ?? err?.response?.data ?? err.message ?? "Something went wrong";
      toast.error(msg);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      // optionally invalidate other queries (posts list)
      queryClient.invalidateQueries(["posts"]);
      navigate("/");
    },
    onError: (err) => {
      const msg = err?.response?.data?.message ?? err?.response?.data ?? err.message ?? "Failed to delete post";
      toast.error(msg);
    },
  });

  const handleToggleSave = () => {
    toggleSaveMutation.mutate(!isSaved); // pass desired state
  };

  const handleDelete = () => {
    // optional confirm
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    deleteMutation.mutate();
  };

  return (
    <div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>

      <div 
        className="flex items-center gap-2 py-1 text-sm cursor-pointer"
        onClick={handleToggleSave}
        role="button"
      >
        <BiBookmarkPlus className="w-6 h-10" />
        {isPending ? <span className="text-xs">(saving...)</span> : <span>{isSaved ? "Unsave Post" : "Save this Post"}</span>}
       
      </div>
    
        {
          isAdmin && <div className="flex items-center gap-2 py-1 text-sm cursor-pointer">
            <FaStar className="w-6 h-10" />
              <span>Feature this post </span>
          </div>
        }
  

    
  


      {user && (post.user?.username === user.username || isAdmin) && (
  <div
    className="flex items-center gap-2 py-1 text-sm cursor-pointer"
    onClick={handleDelete}
    role="button"
  >
    <MdDeleteSweep className="w-6 h-10" />
    <span>Delete this Post</span>
    {deleteMutation.isLoading && <span className="text-xs">(in progress)</span>}
  </div>
)}


      {savedError && <div className="text-xs text-red-500 mt-2">Failed to load saved posts.</div>}
    </div>
  );
};

export default PostMenuActions;
