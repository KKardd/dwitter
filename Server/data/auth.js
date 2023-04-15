//abcd1234: $2a$12$lNMCgsXnkG35KrLoxW49qO3DOR2WTufyLDZ5zNiy.0Xqclv25YA8S
//mac1234:$2a$12$o0fEOgaNkPL/YOXPW7aaS.h9yFGKUsLZDS.dYQ1kToU9lhaX6tUri
import {db, sequelize} from "../db/database.js";
import SQ, {TEXT} from "sequelize";
const DateTypes = SQ.DataTypes;

export const User = sequelize.define(
    "user",
    {
        id: {
            type: DateTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DateTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: DateTypes.STRING(128),
            allowNull: false,
        },
        name: {
            type: DateTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DateTypes.STRING(128),
            allowNull: false,
        },
        url: {
            type: DateTypes.TEXT,
        },
    },
    {timestamps: false}
);

export async function findByUsername(username) {
    return User.findOne({where: {username: username}});
}

export async function findById(id) {
    return User.findByPk(id);
}

export async function createUser(user) {
    return User.create(user).then((result) => result.dataValues.id);
}

// mysql

// export async function findByUsername(username) {
//     return db.execute("SELECT * FROM users WHERE username=?", [username]).then((result) => {
//         return result[0][0];
//     });
// }

// export async function findById(id) {
//     return db.execute("SELECT * FROM users WHERE id=?", [id]).then((result) => {
//         return result[0][0];
//     });
// }

// export async function createUser(user) {
//     const {username, password, name, email, url} = user;
//     return db
//         .execute("INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)", [
//             username,
//             password,
//             name,
//             email,
//             url,
//         ])
//         .then((result) => {
//             return result[0].insertId;
//         });
// }
