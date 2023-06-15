import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js";
import db from "./config/Database.js";
import User from "./models/UserModel.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cookieParser()); // Middleware untuk mengambil value dari cookie

app.use(cors({
  credentials: true,
  origin: 'http://localhost/3000' // Mengatur domain yang diizinkan untuk akses API
}));

app.use(express.json()); // Middleware agar bisa menerima data dalam bentuk JSON

app.use(authRoute); // Menggunakan middleware route untuk rute otentikasi

try {
  await db.authenticate(); // Menghubungkan ke database
  console.log("Database Connected");
  await User.sync(); // Sinkronisasi model User dengan tabel di database
} catch (error) {
  console.error(error);
}

app.listen(5000, () => console.log('Server running on port 5000')); // Menjalankan server pada port 5000
