import mongoose from "mongoose"
 const connectToMongoDB = async ()=>{
    try {
          const connect =  await mongoose.connect(process.env.MONGO_DB_URI);
            console.log("Connected")

            if(!connect) {
                console.log("Trying to reconeect");
                res.send (await mongoose.connect(process.env.MONGO_DB_URI)) ;
            } 
        
    } catch (error) {
        console.log("Error Connecting To Database", error.message)
    }
 }
 export default connectToMongoDB;