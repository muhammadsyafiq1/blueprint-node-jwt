import express  from "express"
import cookieParser from "cookie-parser"
import authRoute from "./routes/authRoutes.js"
import db from "./config/Database.js"
import User from "./models/UserModel.js";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
const app = express();

//mengambil value dari cookie
// cookie parser harus diatas
app.use(cookieParser())
//domain yg diizinkan utk akses api
app.use(cors({
   credentials: true,
   origin: 'http://localhost/3000'
}))
// agar  bisa menerima data dalam bentuk JSON
app.use(express.json())
//middleware route
app.use(authRoute)


 try {
    await db.authenticate();
    console.log("Database Connected");
    await User.sync()
 } catch (error) {
    console.error(error);
 }

 app.listen(5000, () => console.log('server running port 5000'));