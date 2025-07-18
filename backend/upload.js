// Require the cloudinary library
import {v2 as cloudinary} from 'cloudinary';
import { config } from "dotenv";
// Return "https" URLs by setting secure: true
config({ path: ".env" });
cloudinary.config({
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});



const uploadImage = async (imagePath) => {


    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      const result = await cloudinary.uploader.upload(imagePath, options);
      return result.url;
    } catch (error) {
      console.error(error);
    }
};

export default uploadImage;