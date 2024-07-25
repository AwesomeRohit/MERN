import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import userRoutes from "./routes/user.route.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {

    //Root Route for localhost:5000
    res.send("Hello");
})


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server is running on ${PORT}`);
});