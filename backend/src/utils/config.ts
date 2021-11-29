import dotenv from "dotenv";
dotenv.config();

export default {
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_DATEBASE: process.env.MONGO_DATEBASE,
  CLOUDINARY_NAME:process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
 
};
