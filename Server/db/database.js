import mysql from "mysql2";
import {config} from "../config.js";
import SQ from "sequelize";
import MongoDb from "mongodb";
import Mongoose from "mongoose";

// Mongoose

// export async function connectDb() {
//     return Mongoose.connect(config.db.host, {});
// }

// export function useVirtualId(schema) {
//     schema.virtual("id").get(function () {
//         return this._id.toString();
//     });
//     schema.set("toJSON", {virtuals: true});
//     schema.set("toObject", {virtuals: true});
// }
// -----------------------------------------------------------

// mongodb
// let db;
// // export async function connectDb() {
// //     return Mongoose.connect(config.db.host, {});
// // }

// // export function getUsers() {
// //     return db.collection("users");
// // }

// export function getTweets() {
//     return db.collection("tweets");
// }
// -----------------------------------------------------------

// sequelize
const {host, user, database, password} = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
    host,
    dialect: "mysql",
});
// -----------------------------------------------------------

mysql;
const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
});

export const db = pool.promise();
