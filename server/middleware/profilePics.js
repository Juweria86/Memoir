import multer from 'multer';
import path from 'path';

const  store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads/profilePics')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: store,
  limits: { fileSize: 5 *1024 * 1024 },
});

export default upload;
