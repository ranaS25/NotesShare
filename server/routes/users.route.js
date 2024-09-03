import { Router } from "express";
import { listUsers, loginUser, logoutUser, registerUser } from "../controllers/users.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(listUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").post(verifyUser, logoutUser)

export default router;
