import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../helpars/fileUploader";

const router = express.Router();

// create user
router.post("/register", userController.createUser);

//create user for firebase registration
router.post("/register-firebase", userController.createFirebaseUser);

// create user
router.post("/social", userController.socialLogin);
// *!get all  user
router.get("/", userController.getUsers);

//for dashboard
router.get("/all-users", userController.getAllUsers);

//get all riders
router.get("/riders", auth(), userController.getRiders);

//for dashboard
router.get("/all-riders", userController.getAllRiders);

//get single user
router.get("/:userId", userController.getUserById);

//get single rider
router.get("/single-rider/:riderId", auth(), userController.getRiderById);

// *!profile user
router.put(
  "/profile",
  auth(),
  fileUploader.uploadprofileImage,
  userController.updateProfile
);

// *!update  user
router.put("/:id", auth(UserRole.ADMIN), userController.updateUser);

export const userRoutes = router;
