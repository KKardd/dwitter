// import SQ, {TEXT} from "sequelize";
// import {User} from "./auth.js";
// import {db, sequelize} from "../db/database.js";
import MongoDb, {ObjectId} from "mongodb";
import {getTweets} from "../db/database.js";
import {findById} from "./auth.js";
const objectId = MongoDb.ObjectId;

export async function getAll() {
    return getTweets().find().sort({createdAt: -1}).toArray().then(mapTweets);
}

export async function getAllByUsername(username) {
    return getTweets().find({username}).sort({createdAt: -1}).toArray().then(mapTweets);
}

export async function getById(id) {
    return getTweets()
        .findOne({_id: new objectId(id)})
        .then(mapOptionalTweet);
}

export async function create(text, userId) {
    const {name, username, url} = await findById(userId);
    const tweet = {
        text,
        createdAt: new Date(),
        userId,
        name,
        username,
        url,
    };
    console.log(tweet);
    return getTweets()
        .insertOne(tweet)
        .then((data) => {
            return mapOptionalTweet({...tweet, _id: data.insertedId});
        });
}

export async function update(id, text) {
    return getTweets()
        .findOneAndUpdate(
            {_id: new objectId(id)}, //
            {$set: {text}},
            {returnDocument: "after"}
        )
        .then((result) => result.value)
        .then(mapOptionalTweet);
}

export async function remove(id) {
    return getTweets().deleteOne({_id: new objectId(id)});
}

function mapOptionalTweet(tweet) {
    return tweet ? {...tweet, id: tweet._id.toString()} : tweet;
}

function mapTweets(tweet) {
    return tweet.map(mapOptionalTweet);
}
// const Sequelize = SQ.Sequelize;
// const DateTypes = SQ.DataTypes;

// const Tweet = sequelize.define("tweet", {
//     id: {
//         type: DateTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     text: {
//         type: DateTypes.TEXT,
//         allowNull: false,
//     },
// });
// Tweet.belongsTo(User);

// const INCLUDED_USER = {
//     attributes: [
//         "id",
//         "text",
//         "createdAt",
//         "userId",
//         [Sequelize.col("user.name"), "name"],
//         [Sequelize.col("user.username"), "username"],
//         [Sequelize.col("user.url"), "url"],
//     ],
//     include: {
//         model: User,
//         attributes: [],
//     },
// };
// const ORDER_DESC = {order: [["createdAt", "DESC"]]};

// export async function getAll() {
//     return Tweet.findAll({...INCLUDED_USER, ...ORDER_DESC});
// }

// export async function getAllByUsername(username) {
//     return Tweet.findAll({
//         ...INCLUDED_USER,
//         ...ORDER_DESC,
//         include: {
//             ...INCLUDED_USER.include,
//             where: {username},
//         },
//     });
// }

// export async function getById(id) {
//     return Tweet.findOne({
//         where: {id},
//         ...INCLUDED_USER,
//     });
// }

// export async function create(text, userId) {
//     return Tweet.create({text, userId}).then((result) => getById(result.dataValues.id));
// }

// export async function update(id, text) {
//     return Tweet.findByPk(id, {
//         ...INCLUDED_USER,
//     }).then((tweet) => {
//         tweet.text = text;
//         return tweet.save();
//     });
// }

// export async function remove(id) {
//     return Tweet.findByPk(id, {
//         ...INCLUDED_USER,
//     }).then((tweet) => {
//         tweet.destroy();
//     });
// }

// // mysql

// // const SELECT_JOIN =
// //     "SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.name, us.username, us.url FROM tweets as tw JOIN users as us ON tw.userId = us.id";
// // const ORDER_DESC = "ORDER BY tw.createdAt DESC";
// // export async function getAll() {
// //     return db
// //         .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
// //         .then((result) => result[0]);
// // }

// // export async function getAllByUsername(username) {
// //     return db
// //         .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
// //         .then((result) => result[0]);
// // }

// // export async function getById(id) {
// //     return db
// //         .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]) //
// //         .then((result) => result[0][0]);
// // }

// // export async function create(text, userId) {
// //     return db
// //         .execute("INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)", [text, new Date(), userId])
// //         .then((result) => getById(result[0].insertId));
// // }

// // export async function update(id, text) {
// //     return db.execute("UPDATE tweets SET text=? WHERE id=?", [text, id]).then(() => getById(id));
// // }

// // export async function remove(id) {
// //     return db.execute("DELETE FROM tweets WHERE id=?", [id]);
// // }
