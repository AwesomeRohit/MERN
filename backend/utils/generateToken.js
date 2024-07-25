import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (UserID, res) =>{

    const token = jwt.sign({UserID}, process.env.JWT_SECRET,{
        expiresIn: '15d'
    })
    res.cookie("jwt", token, {
        maxAge : 15*24*60*1000,
        httpOnly: true, // it prevents XSS attacks (cross site scripting Attacks)
        samesite : "strict"
    })
}
export default generateTokenAndSetCookie;