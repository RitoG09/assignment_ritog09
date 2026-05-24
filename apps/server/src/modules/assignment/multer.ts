import multer from "multer";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "../worker/uploads/");
  },
  filename: (_, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter: multer.Options["fileFilter"] = (_, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10mb limit
  },
});
