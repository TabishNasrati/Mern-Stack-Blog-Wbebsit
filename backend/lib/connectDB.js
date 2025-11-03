import mongoose from "mongoose"

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO) 
    }  catch(err) {
        console.log(err)
    }
}