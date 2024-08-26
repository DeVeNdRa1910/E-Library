import multer from "multer";
import path from 'node:path';

//3e7 30mb -> 3 to the power 7

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 1024*1024*30 }, // 30mb 30 * 1024 * 1024
});

export default upload;