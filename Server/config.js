import dotenv from "dotenv";
dotenv.config();

function required(key, defalutValue = undefined) {
    const value = process.env[key] || defalutValue;
    if (value == null) {
        throw new Error(`key ${key} is undefined!`);
    }
    return value;
}

export const config = {
    jwt: {
        secretKey: required("JWT_SECRET"),
        expriesInSec: parseInt(required("JWT_EXPRIES_SEC", 86400)),
    },
    bcrypt: {
        saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
    },
    // port: parseInt(required("PORT", 8080)),

    db: {
        // mysql 사용시
        // host: required("MYSQL_HOST"),
        // user: required("MYSQL_USER"),
        // database: required("MYSQL_DATABASE"),
        // password: required("MYSQL_PASSWORD"),
        host: required("DB_HOST"),
        user: required("DB_USER"),
        database: required("DB_DATABASE"),
        password: required("DB_PASSWORD"),
        port: required("DB_PORT"),
        // mongodb 사용시
        // host: required("MONGODB_HOST"),
    },

    cors: {
        allowedOrigin: required("CORS_ALLOW_ORIGIN"),
    },
};
