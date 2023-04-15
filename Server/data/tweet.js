import SQ, {TEXT} from "sequelize";
import {User} from "./auth.js";
import {db, sequelize} from "../db/database.js";

const Sequelize = SQ.Sequelize;
const DateTypes = SQ.DataTypes;

const Tweet = sequelize.define("tweet", {
    id: {
        type: DateTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    text: {
        type: DateTypes.TEXT,
        allowNull: false,
    },
});
Tweet.belongsTo(User);

const INCLUDED_USER = {
    attributes: [
        "id",
        "text",
        "createdAt",
        "userId",
        [Sequelize.col("user.name"), "name"],
        [Sequelize.col("user.username"), "username"],
        [Sequelize.col("user.url"), "url"],
    ],
    include: {
        model: User,
        attributes: [],
    },
};
const ORDER_DESC = {order: [["createdAt", "DESC"]]};

export async function getAll() {
    return Tweet.findAll({...INCLUDED_USER, ...ORDER_DESC});
}

export async function getAllByUsername(username) {
    return Tweet.findAll({
        ...INCLUDED_USER,
        ...ORDER_DESC,
        include: {
            ...INCLUDED_USER.include,
            where: {username},
        },
    });
}

export async function getById(id) {
    return Tweet.findOne({
        where: {id},
        ...INCLUDED_USER,
    });
}

export async function create(text, userId) {
    return Tweet.create({text, userId}).then((result) => getById(result.dataValues.id));
}

export async function update(id, text) {
    return Tweet.findByPk(id, {
        ...INCLUDED_USER,
    }).then((tweet) => {
        tweet.text = text;
        return tweet.save();
    });
}

export async function remove(id) {
    return Tweet.findByPk(id, {
        ...INCLUDED_USER,
    }).then((tweet) => {
        tweet.destroy();
    });
}

// mysql

// const SELECT_JOIN =
//     "SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.name, us.username, us.url FROM tweets as tw JOIN users as us ON tw.userId = us.id";
// const ORDER_DESC = "ORDER BY tw.createdAt DESC";
// export async function getAll() {
//     return db
//         .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
//         .then((result) => result[0]);
// }

// export async function getAllByUsername(username) {
//     return db
//         .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
//         .then((result) => result[0]);
// }

// export async function getById(id) {
//     return db
//         .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]) //
//         .then((result) => result[0][0]);
// }

// export async function create(text, userId) {
//     return db
//         .execute("INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)", [text, new Date(), userId])
//         .then((result) => getById(result[0].insertId));
// }

// export async function update(id, text) {
//     return db.execute("UPDATE tweets SET text=? WHERE id=?", [text, id]).then(() => getById(id));
// }

// export async function remove(id) {
//     return db.execute("DELETE FROM tweets WHERE id=?", [id]);
// }
