import express from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import {sequelize} from "./db/database.js";
import {config} from "./config.js";
import {initSocket} from "./connection/socket.js";

const app = express();

const corsOption = {
    origin: config.cors.allowedOrigin,
    optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOption));
app.use(helmet());
app.use(morgan("tiny"));

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
    console.log("마지막에 걸러짐");
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

// mongodb 사용 시
// connectDb()
//     .then(() => {
//         console.log("init!");
//         const server = app.listen(config.host.port);
//         initSocket(server);
//     })
//     .catch((err) => console.log(err));

// sequelize 사용 시
sequelize.sync().then(() => {
    console.log("init Server!");
    const server = app.listen(config.db.port);
    initSocket(server);
});
//
// mysql 사용 시
// const server = app.listen(config.host.port);
// initSocket(server);
