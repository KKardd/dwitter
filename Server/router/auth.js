import express from "express";
import "express-async-errors";
import * as authController from "../controller/auth.js";
import {validate} from "../middleware/validate.js";
import {body} from "express-validator";
const router = express.Router();

const validateCredential = [
    body("username")
        .trim()
        .isLength({min: 5})
        .withMessage("username should be at least 5 char"),
    body("password")
        .trim()
        .isLength({min: 5})
        .withMessage("password should be at least 5 char"),
    validate,
];

// username: "admin",
//         password: "admin123",
//         name: "ADMIN",
//         email: "admin@dwiiter.com",
//         url: "",
//         token: secret,

const validatesignup = [
    ...validateCredential,
    body("name").trim().notEmpty().withMessage("name is missing"),
    body("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("invaild email"),
    body("url")
        .trim()
        .isURL()
        .withMessage("invaild url")
        .optional({nullable: true, checkFalsy: true}),
    validate,
];

// GET /auth/me
router.get("/me", authController.getAuth);

// POST /signup
router.post("/signup", authController.signup);

// POST /login
router.post("/login", authController.login);

export default router;
