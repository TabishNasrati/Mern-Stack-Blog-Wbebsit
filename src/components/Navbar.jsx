
import { useState } from "react"
import ImageComp from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';





const Navbar = () => {

    const urlEndpoint= import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT

    const [open, setOpen] = useState(false);
    return (
        <div className="w-full h-16  md:h-20 flex items-center justify-between">
            {/*LOGO*/}
            <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
                
               <ImageComp src="/logo.png"  width={32}  height={32} alt="image alt" className="w-full h-full object-cover"  />
               
                 <span>lamalog</span>
            </Link>
            
            {/*Mobile Menu*/}
            <div className="md:hidden">
                <div className="cursor-pointer text-3xl"
                 onClick={() => setOpen ((prev) => !prev)}> {open ? "✖️" : "🟰"} </div>
                 <div className={` w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out 
                 ${open ? "-right-0" : "-right-[100%]"} `} >

                <Link to="/">Home</Link>
                <Link to="/">Trending</Link>
                <Link to="/">Most Popular</Link>
                <Link to="/">About</Link>
                <Link to="/">
                    <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 👋</button>
                </Link>
              </div>
            </div>
 
            {/*Desktop menue*/}
            <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
                <Link to="/">Home</Link>
                <Link to ="/">Trending</Link>
                <Link to="/">Most Popular</Link>
                <Link to="/">About</Link>
                 <SignedOut>
                     <Link to="login">
                    <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 👋</button>
                    </Link>
                 </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
            </div>
        </div>
    )
}




export default Navbar 

