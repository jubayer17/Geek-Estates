import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import config from 'src/config';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env') });

/* ===========================
   MULTER STORAGE CONFIG
=========================== */

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'uploads');

    // Create uploads folder if not exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

/* ===========================
   MULTER INSTANCE
=========================== */

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

/* ===========================
   CLOUDINARY LAZY INIT
=========================== */

/**
 * Get a configured Cloudinary instance
 * Call this before every upload to ensure env variables are loaded
 */
const getCloudinaryInstance = () => {
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });
  return cloudinary;
};

/* ===========================
   CLOUDINARY UPLOAD FUNCTION
=========================== */

export const uploadToCloudinary = async (file: Express.Multer.File) => {
  try {
    const cloud = getCloudinaryInstance();

    // Debug: check if cloud_name is loaded
    if (!config.cloudinary_cloud_name) {
      throw new Error('Cloudinary cloud_name is missing. Check your .env and config.ts');
    }

    const result = await cloud.uploader.upload(file.path, {
      folder: 'hero-banners',
    });

    // Delete local file after upload
    fs.unlinkSync(file.path);

    return result;
  } catch (error) {
    // Cleanup if upload fails
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    throw error;
  }
};

/* ===========================
   EXPORT HELPER
=========================== */

export const fileUploader = {
  storage,
  upload,
  uploadToCloudinary,
};
