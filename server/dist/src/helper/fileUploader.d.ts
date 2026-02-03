import multer from 'multer';
export declare const storage: multer.StorageEngine;
export declare const upload: multer.Multer;
export declare const uploadToCloudinary: (file: Express.Multer.File) => Promise<import("cloudinary").UploadApiResponse>;
export declare const fileUploader: {
    storage: multer.StorageEngine;
    upload: multer.Multer;
    uploadToCloudinary: (file: Express.Multer.File) => Promise<import("cloudinary").UploadApiResponse>;
};
