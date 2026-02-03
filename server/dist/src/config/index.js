"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    node_env: process.env.NODE_ENV,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
};
//# sourceMappingURL=index.js.map