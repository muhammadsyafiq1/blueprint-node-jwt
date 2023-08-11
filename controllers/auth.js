import bcrypt from "bcrypt";
import User from "../models/UserModel.js"
import jwt from "jsonwebtoken"

export const Login = async(req, res) => {
    try {
        const user = await User.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const role_id = user[0].role_id;
        const accessToken = jwt.sign({userId, name, email, role_id}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, name, email, role_id}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await User.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email not found"});
    }
}

export const Register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log(req.body);
    if (password !== confirmPassword) {
        return res.status(400).json({ msg: "Password tidak sama" });
    }

    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(password, salt);

        await User.create({
            name: name,
            email: email,
            password: hashPassword
        });

        res.json({ msg: "Pendaftaran berhasil" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Kesalahan server internal" });
    }
}

export const Logout = async(req, res) =>{
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(204)
    const user = await User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204)
    const userId = user[0].id
    await User.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}

export const getUser = async (req, res)=>{
    try {
        const response = await User.findAll({
            attributes: ['id','name','email']
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
