import express from "express";
import "express-async-errors";
import * as tweetController from "../controller/tweet.js";
import {validate} from "../middleware/validate.js";
import {isAuth} from "../middleware/auth.js";
import {body} from "express-validator";
const router = express.Router();

const validateTweet = [body("text").trim().isLength({min: 3}).withMessage("text should be at least 3 char"), validate];

// GET /tweets
// GET /tweets?username=:username
router.get("/", isAuth, tweetController.getTweets);

// GET /tweets/:id
router.get("/:id", isAuth, tweetController.getTweet);

// POST /tweets
router.post("/", isAuth, validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put("/:id", isAuth, validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", isAuth, tweetController.deleteTweet);

// DELETE /tweets?username=:username
router.delete("/", isAuth, tweetController.deleteTweetByUserId);

export default router;
