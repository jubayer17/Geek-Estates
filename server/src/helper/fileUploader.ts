import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import config from 'src/config';

/* ===========================
   MULTER STORAGE CONFIG
=========================== */

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'uploads');

    // create uploads folder if not exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + '-' + Math.round(Math.random() * 1e9);
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
   CLOUDINARY UPLOAD
=========================== */

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const uploadToCloudinary = async (
  file: Express.Multer.File,
) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'hero-banners',
    });

    // delete local file after upload
    fs.unlinkSync(file.path);

    return result;
  } catch (error) {
    // cleanup if upload fails
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
