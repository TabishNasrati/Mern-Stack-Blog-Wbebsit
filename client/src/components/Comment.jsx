
import ImageComp from "./Image"
import { format } from "timeago.js";


const Comment = ({ comment }) => {
    return (
        <div className="p-4 bg-slate-50 rounded-xl mb-8">
            <div className="flex items-center gap-4">
                <ImageComp src={comment.user.img} className="w-10 h-10 rounded-full object-cover" width="40" />
                <span className="font-medium">{comment?.user?.fullName}</span>
                <span className="text-sm text-gray-500">{format(comment.createdAt)}</span>
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