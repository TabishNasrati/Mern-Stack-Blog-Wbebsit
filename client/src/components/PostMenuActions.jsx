import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BiBookmarkPlus } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostMenuActions = ({ post }) => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isFeatured = post?.isFeatured ?? false;
  const isAdmin = user?.publicMetadata?.role === "admin";

  /* =======================
     FETCH SAVED POSTS
  ======================== */
  const { data: savedList = [], isLoading, isError } = useQuery({
    queryKey: ["savedPosts"],
    enabled: isLoaded && !!user,
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const raw = res?.data?.savedPosts ?? [];
      return raw.map(item => (typeof item === "string" ? item : item._id || item.id));
    },
    staleTime: 1000 * 60,
  });
  

  const isSaved = savedList.includes(post._id);
  const isLoadingSaved = status === "loading";

  /* =======================
     SAVE / UNSAVE
  ======================== */
  const toggleSaveMutation = useMutation({
    mutationFn: async (shouldSave) => {
      const token = await getToken();
      const url = `${import.meta.env.VITE_API_URL}/users/saved/${post._id}`;

      return shouldSave
        ? axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } })
        : axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
    },
    onSuccess: (_, shouldSave) => {
      queryClient.invalidateQueries(["savedPosts"]);
      toast.success(shouldSave ? "Post saved!" : "Post unsaved!");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ??
          err?.response?.data ??
          err.message ??
          "Something went wrong"
      );
    },
  });

  /* =======================
     FEATURE POST (ADMIN)
  ======================== */
  const toggleFeatureMutation = useMutation({
    mutationFn: async (shouldFeature) => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/feature/${post._id}`,
        { shouldFeature },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: (_, shouldFeature) => {
      queryClient.invalidateQueries(["posts"]);
      toast.success(
        shouldFeature ? "Post featured!" : "Feature removed!"
      );
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ??
          err?.response?.data ??
          err.message ??
          "Something went wrong"
      );
    },
  });

  /* =======================
     DELETE POST
  ======================== */
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/posts/${post._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      toast.success("Post deleted!");
      queryClient.invalidateQueries(["posts"]);
      navigate("/");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ??
          err?.response?.data ??
          err.message ??
          "Failed to delete post"
      );
    },
  });

  /* =======================
     HANDLERS
  ======================== */
  const handleToggleSave = () => {
    if (isLoadingSaved || toggleSaveMutation.isPending) return;
    toggleSaveMutation.mutate(!isSaved);
  };

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    deleteMutation.mutate();
  };

  const handleToggleFeature = () => {
    if (!window.confirm("Are you sure you want to continue?")) return;
    toggleFeatureMutation.mutate(!isFeatured);
  };

  /* =======================
     UI
  ======================== */
  return (
    <div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>

      {/* SAVE */}
      <div
        className="flex items-center gap-2 py-1 text-sm cursor-pointer"
        onClick={handleToggleSave}
      >
        <BiBookmarkPlus className="w-6 h-10" />
        {isLoadingSaved || toggleSaveMutation.isPending ? (
          <span className="text-xs">(saving...)</span>
        ) : (
          <span>{isSaved ? "Unsave Post" : "Save this Post"}</span>
        )}
      </div>

      {/* FEATURE (ADMIN) */}
      {isAdmin && (
        <div
          className="flex items-center gap-2 py-1 text-sm cursor-pointer"
          onClick={handleToggleFeature}
        >
          <FaStar className="w-6 h-10" />
          <span>{isFeatured ? "Remove feature" : "Feature this post"}</span>
          {toggleFeatureMutation.isPending && (
            <span className="text-xs">(processing...)</span>
          )}
        </div>
      )}

      {/* DELETE */}
      {user && (post.user?.username === user.username || isAdmin) && (
        <div
          className="flex items-center gap-2 py-1 text-sm cursor-pointer"
          onClick={handleDelete}
        >
          <MdDeleteSweep className="w-6 h-10" />
          <span>Delete this Post</span>
          {deleteMutation.isPending && (
            <span className="text-xs">(in progress)</span>
          )}
        </div>
      )}

      {/* ERROR */}
      {isError && !isLoading && (
  <div className="text-xs text-red-500 mt-2">
    Failed to load saved posts.
  </div>
)}

    </div>
  );
};

export default PostMenuActions;
