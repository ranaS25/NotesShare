import { Router } from "express";
import { listUsers, loginUser, registerUser } from "../controllers/users.controller.js";

const router = Router();

router.route("/").get(listUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser)

export default router;
