import {Schema} from "mongoose"
import mongoose from "mongoose"


const userSchema = new Schema ({
      img: {
        type: String,
    },
      title: {
        type: String,
        required:true,
    },
      slug: {
        type: String,
        required: true,
        unique: true,
    },
    savedPosts: {
        type:[String],
        default: [],
    },

    
   
},
{timestamps: true }
);


export default mongoose.model ("User" , userSchema);