import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import courseRoutes from "./routes/course.route.js";
import userRoutes from "./routes/user.route.js";
import fileUpload from "express-fileupload";
import adminRoutes from "./routes/admin.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import orderRoutes from "./routes/order.route.js";
const app = express()
dotenv.config();
// console.log("JWT_SECRET loaded:", process.env.JWT_SECRET);


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));
// app.use(cors({
//   origin: process.env.FRONTEND_URL, // frontend URL
//   credentials: true, // allow cookies to be sent
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // allowed headers
//   exposedHeaders:["Authorization "],
//   optionsSuccessStatus: 200,
// }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://courseapp-xi.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked: " + origin));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const port = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;


try {
  await mongoose.connect(DB_URI);
  console.log("Connnected to MoongoDB");
} catch (error) {
  console.log(error);
}
//defining routes
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/order", orderRoutes);


//cloudinary configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
