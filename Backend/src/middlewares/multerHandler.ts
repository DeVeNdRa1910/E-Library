import multer from "multer";
import path from 'node:path';

//3e7 30mb -> 3 to the power 7
const upload = multer({
  dest: path.resolve(__dirname, '../../public/data/uploads'),
  limits: {fileSize: 3e7} ,
})

export default upload;