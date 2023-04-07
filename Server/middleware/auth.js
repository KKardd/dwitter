import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";

const AUTH_ERROR = {message: "Authentication Error"};

export const isAuth = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    console.log(authHeader);
    if (!(authHeader && authHeader.startsWith("Bearer "))) {
        return res.status(401).json(AUTH_ERROR);
    }
    const token = authHeader.split(" ")[1]; // 띄어쓰기 후 Bearer걸러낸 다음 문장 넣기.
    jwt.verify(
        token,
        "WSm^6UL75e^XWr%C8*2!K9ICxikvRZ9D",
        async (error, decoded) => {
            if (error) {
                return res.status(401).json(AUTH_ERROR);
            }
            const user = await userRepository.findById(decoded.id);
            if (!user) {
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id;
            req.token = token;
            next();
        }
    );
};
