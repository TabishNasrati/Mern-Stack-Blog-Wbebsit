
import mongoose from "mongoose"


const connectDB = async () => {
    try {
        
       await mongoose.connect (process.env.MONGO)
           console.log("MongoDB is connected")
    }  catch(err) {
        console.log(err)
    }
}
export default connectDB;


















// import mongoose from "mongoose"


// const connectDB = async () => {
//     try {
        
//         const url = process.env.MONGO
//         await mongoose.connect(url || "mongodb+srv://tabishnasrati123_db_user:0kUZbVDWECrPvW5J@lamacluster.fifivwp.mongodb.net/?appName=LamaCluster&dbName=blog") 
//         console.log("MongoDB is connected ")
     
//     }  catch(err) {
//         console.log(err)
//     }
// }

// export default connectDB