import { Router } from "express";
import { deleteUser, updateUser, updateProfilePhoto } from "../controllers/utils.controller.js";
import { utilsMiddleware, uploadProfilePhotoMiddleware } from "../middleware/utils.middleware.js";

const router = Router();

router.delete('/user/delete-user', utilsMiddleware, deleteUser);
router.put('/user/update-user', utilsMiddleware,  updateUser);
router.put("/user/update-profile-photo", uploadProfilePhotoMiddleware , updateProfilePhoto);


export default router;