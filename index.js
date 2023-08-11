import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import db from "./config/Database.js";
import User from "./models/UserModel.js";
import Product from "./models/ProductModel.js";
import cors from "cors";
import dotenv from "dotenv";
import FileUpload from "express-fileupload"
dotenv.config();

const app = express();

app.use(cookieParser()); // Middleware untuk mengambil value dari cookie

app.use(cors({
  credentials: true,
  origin: 'http://localhost/3000' // Mengatur domain yang diizinkan untuk akses API
}));

app.use(express.json()); // Middleware agar bisa menerima data dalam bentuk JSON
app.use(FileUpload())

app.use(authRoute);
app.use(productRoutes);

try {
  await db.authenticate(); // Menghubungkan ke database
  console.log("Database Connected");
  // await User.sync(); 
  // await Product.sync(); 
} catch (error) {
  console.error(error);
}

app.listen(5000, () => console.log('Server running on port 5000')); // Menjalankan server pada port 5000
