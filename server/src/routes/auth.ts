import express from "express";
import { body } from "express-validator";
import authController from "src/controllers/auth";

const router = express.Router();

const signupValidation = [
	body("email")
		.isEmail()
		.withMessage("Please enter a valid email.")
		.normalizeEmail(),
	body("password").trim().isLength({ min: 5 }),
	body("name").trim().not().isEmpty(),
];


router.post("/signup", signupValidation, authController.signup);

router.post("/login", authController.login);

export default router;
