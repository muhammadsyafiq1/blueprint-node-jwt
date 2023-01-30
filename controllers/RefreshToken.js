import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
 
export const refreshToken = async(req, res) => {
    try {
        //ambil token
        const refreshToken = req.cookies.refreshToken;
        // console.log(refreshToken);
        //jika token tidak ada
        if(!refreshToken) return res.sendStatus(401);
        //cek kecocokan token
        const user = await User.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        console.log(user);
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}