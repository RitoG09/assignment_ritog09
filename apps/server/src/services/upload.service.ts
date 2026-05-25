import streamifier from "streamifier";

import { cloudinary } from "@repo/storage";

export const uploadToCloudinary = async (file: Express.Multer.File) => {
  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "veda-ai/uploads",
        resource_type: "raw",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};
