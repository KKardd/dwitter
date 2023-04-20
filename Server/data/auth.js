import {db, sequelize} from "../db/database.js";
// import MongoDb from "mongodb";
// import Mongoose from "mongoose";
// import {useVirtualId} from "../db/database.js";

// mongoose 사용 시

// const userSchema = new Mongoose.Schema({
//     username: {type: String, required: true},
//     name: {type: String, required: true},
//     email: {type: String, required: true},
//     password: {type: String, required: true},
//     url: {type: String},
// });

// useVirtualId(userSchema);
// const User = Mongoose.model("User", userSchema);

// export async function findByUsername(username) {
//     return User.findOne({username});
// }

// export async function findById(id) {
//     return User.findById(id);
// }

// export async function createUser(user) {
//     return new User(user).save().then((data) => data.id);
// }
// -----------------------------------------------------------

// Mongodb 사용시

// const objectId = MongoDb.ObjectId;

// export async function findByUsername(username) {
//     return getUsers().findOne({username: username}).then(mapOptionalUser);
// }

// export async function findById(id) {
//     return getUsers()
//         .findOne({_id: new objectId(id)})
//         .then(mapOptionalUser);
// }

// export async function createUser(user) {
//     return getUsers()
//         .insertOne(user)
//         .then((data) => data.insertedId.toString());
// }

// function mapOptionalUser(user) {
//     return user ? {...user, id: user._id} : user;
// }
// -----------------------------------------------------------

// Sequelize 사용시

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
// -----------------------------------------------------------

// mysql 사용 시

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
