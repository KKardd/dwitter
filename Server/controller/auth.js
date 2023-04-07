import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "express-async-errors";
import * as userRepository from "../data/auth.js";

const jwtSecretkey = "WSm^6UL75e^XWr%C8*2!K9ICxikvRZ9D";
const jwtExpriesInDays = "2d";
const bcryptSaltRounds = 12;

export async function signup(req, res) {
    const {username, password, name, email, url} = req.body;
    const found = await userRepository.findByUsername(username);
    if (found) {
        return res
            .status(409)
            .json({message: `${username} is already exists!`});
    }
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url,
    });
    const token = createJwtToken(userId);
    res.status(200).json({token, username, userId});
    // res.status(200).json(token, userId);
}

export async function login(req, res) {
    const {username, password} = req.body;
    const user = await userRepository.findByUsername(username);
    if (!user) {
        return res.status(401).json({message: `Invaild user or password`});
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({message: `Invaild user or password`});
    }
    const token = createJwtToken(user.id);
    res.status(200).json({token, username});
}

function createJwtToken(id) {
    return jwt.sign({id}, jwtSecretkey, {expiresIn: jwtExpriesInDays});
}

export async function me(req, res, next) {
    const user = await userRepository.findById(req.userId);
    if (!user) {
        return res.status(404).json({message: "User not found!"});
    }
    return res.status(200).json({username: user.username});
}
