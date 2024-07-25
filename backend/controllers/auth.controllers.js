import User from "../models/user.models.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {

    try {
        
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Paswword Doesnt Match" })
        }
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "User already Exists" })
        }

        //Password Hashing

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName: fullName,
            username,
            password: hashedPassword,
            confirmPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        })
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            })
        }
        else {
            res.status(400).json({ error: "invalid User Data" });
        }

    } catch (error) {
        console.log("error in signup controller ", error.message)
        res.status(500).json({ error: error.message })
    }
}
export const login = async (req, res) => {

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPassowrdCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPassowrdCorrect) {
            return res.status(400).json({ error: "Inavlid Username Or Password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,

        })
    } catch (error) {
        console.log("error in Login controller ", error.message)
        res.status(500).json({ error: error.message })
    }

    console.log("Login Controller");
}
export const logout = async (req, res) => {

    try {
        res.cookie("jwt", "", { maxage: 0 })
        res.status(200).json({ message: "Logged Out Succesfully" });

    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });

    }

    console.log("Logout Controller");
}
