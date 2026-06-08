import jwt from "jsonwebtoken";
import multer from "multer";
import uploadProfilePhoto from "../utils/uploadProfilePhoto.js";
import config from "../config/env.js";

const utilsMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, config.jwtSecret);

    req.user = decoded;
    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};
const uploadProfilePhotoMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, config.jwtSecret);

    req.user = decoded;

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }

  const upload = uploadProfilePhoto.single('profile_photo');
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    req.filename = req.file ? req.file.filename : "";
    next();
  });
};


export { utilsMiddleware, uploadProfilePhotoMiddleware };