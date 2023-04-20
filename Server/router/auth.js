import express from "express";
import "express-async-errors";
import * as authController from "../controller/auth.js";
import {validate} from "../middleware/validate.js";
import {isAuth} from "../middleware/auth.js";
import {body} from "express-validator";
const router = express.Router();

const validateCredential = [
    body("username").trim().isLength({min: 5}).withMessage("username should be at least 5 char"),
    body("password").trim().isLength({min: 5}).withMessage("password should be at least 5 char"),
    validate,
];

const validatesignup = [
    ...validateCredential,
    body("name").trim().notEmpty().withMessage("name is missing"),
    body("email").trim().isEmail().normalizeEmail().withMessage("invaild email"),
    body("url").trim().isURL().withMessage("invaild url").optional({nullable: true, checkFalsy: true}),
    validate,
];
// GET /auth/me
router.get("/me", isAuth, authController.me);

// POST /signup
router.post("/signup", validatesignup, authController.signup);

// POST /login
router.post("/login", validateCredential, authController.login);

export default router;
