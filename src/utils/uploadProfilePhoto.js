import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  // Define destination folder
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile_photos/'); // Make sure this folder exists in your project
  },
  // Customize the filename to ensure it is unique
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
  
});


  


const uploadProfilePhoto = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Limit file size to 2MB
  },
  fileFilter: (req, file, cb) => {
    // Only allow specific images
    const allowedTypes = /jpeg|jpg|png/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, and PNG files are allowed!'));
    }
  }
});

export default uploadProfilePhoto;