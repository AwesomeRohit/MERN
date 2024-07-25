import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'

const protectRoute = async (req, res, next) => {

    try {
        const token = req.cookies.jwt;
        if (!token) { return res.status(401).json({ error: "Not Authorized - Token Missing" }); }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) { return res.status(401).json({ error: "Not Authorized - Invalid Token" }); }
        
        req.user = decoded;
        
        const user = await User.findById(decoded.UserID).select("-password");
        
        if (!user) { return res.status(401).json({ error: "Not Authorized- user not exists" }); }
        

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export default protectRoute