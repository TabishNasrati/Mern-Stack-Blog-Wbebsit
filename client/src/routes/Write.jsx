import { useAuth, useUser } from "@clerk/clerk-react"
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from "react-quill-new"
import { useMutation } from "@tanstack/react-query";
import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {IKContext, IKUpload} from "imagekitio-react";


const authenticator = async () => {
  try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);
      if (!response.ok) {
          // If the server response is not successful, extract the error text for debugging.
          const errorText = await response.text();
          throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
  } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
  }
};


const Write = () => {

    const {isLoaded, isSignedIn} = useUser () 
    const [value, setValue] = useState('');
    const [cover, setCover ] = useState ("")
    const [progress ,  setProgress ] = useState ("")


    const navigate = useNavigate();

     const { getToken } = useAuth();

     const api = import.meta.env.VITE_API_URL

        //  console.log("FRONT PUBLIC:", import.meta.env.VITE_IK_PUBLIC_KEY);
        //  console.log("FRONT URL:", import.meta.env.VITE_IK_URL_ENDPOINT);


 const mutation = useMutation({
        mutationFn: async (newPost) => {
          console.log(newPost,"this new post")
            const token = await getToken ();
          return axios.post(`${api}/posts`, newPost, {
            headers:{
                Authorization: `Bearer ${token}`
            },
          });
        },
         
        onSuccess: (res) => {
          toast.success("Post has been created")
          // navigate(`${res.data.slug}`)
          navigate("/my-story")   
        }

      });


    if (!isLoaded) {
        return <div className="">Loading ...</div>
    }

    if (!isSignedIn) {
        return <div className="">You should login!</div>
    }

      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        console.log(formData,"this post payload")
       const data = {
         title:formData.get("title"),
         category:formData.get("category"),
         desc:formData.get("desc"),
         content:value,

       };
 
       console.log(data)

       mutation.mutate(data)


      }; 

      const onError = (err) => {
        console.log (err) ;
        toast.error("Image upload faild!")
      };

      const onSuccess = (res) => {
        console.log (res) ;
        toast.error("Image upload faild!")
      };


      const onUploadProgress = (progress) => {
        console.log (progress) ;
        setCover (res);
      };
     
      const ouUploadProgress = ( progress ) => {
        console.log(progress);
        setProgress (Math.round(progress.loaded/progress.total) * 100);
      }
     
   
    return (
        <div className="h-[calc(100vh-64px)]  md:h-[calc(100vh-80px)] flex flex-col gap-6">
            <h1 className="text-clip font-light" >Create a New Post</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6  flex-1 mb-6">

                {/* <button className=" w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">Add a cover image</button> */}

                <IKContext
                 publicKey={import.meta.env.VITE_IK_PUBLIC_KEY} 
                 urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                 
                  authenticator={authenticator}
                  
                   
                   >
                      
                    <IKUpload 
                    // fileName="test-upload.png"
                    useUniqueFileName
                    onError={onError}
                    onSuccess={onSuccess}
                    onUploadProgress={onUploadProgress}
                    />

                   </IKContext>

                   

                <input className="text-4xl font-semibold bg-transparent outline-none" type="text" placeholder="My Awesome Story " name="title" />
                <div className="flex items-center gap-4">
                    <label htmlFor="" className="text-sm">Choose a category </label>
                    <select name="category" id="" className="p-2 rounded-xl bg-white shadow-md">
                        <option value="general">General</option>
                        <option value="web-design ">Web Design </option>
                        <option value="development">Development</option>
                        <option value="databases">Databases</option>
                        <option value="seo">Search Engines</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>
                <textarea className="p-4 rounded-xl bg-white shadow-md" name="desc" placeholder="A Short Description " />
 
                  <div className="flex">
                    <div className="flex flex-col gap-2 mr-2">
                      <div className="cursor-pointer">🌅</div>
                      <div className="cursor-pointer">▶️</div>
                    </div>

                <ReactQuill theme="snow" className="flex-1  rounded-xl bg-white shadow-md" value={value} onChange={setValue} />
                 </div>
                <button disabled={mutation.isPending || (0 < progress && progress < 100 ) }
                 className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36   disabled:bg-blue-400 disabled:cursor-not-allowed">
                   {mutation.isPending ? "Loading..." : "Send" }
                  </button>
                  {"Progress: + progress "}
                  {mutation.isError && <span> {mutation.error.message} </span>}
            </form>
        </div>
    );
};

export default Write;

