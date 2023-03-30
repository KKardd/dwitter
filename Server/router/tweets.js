import express from "express";
import "express-async-errors";

let tweets = [
    {
        id: "1",
        text: "Bob은 밥을 좋아해",
        createdAt: Date.now().toString(),
        name: "Bob",
        username: "bob",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Rapper_B.o.B_2013.jpg/440px-Rapper_B.o.B_2013.jpg",
    },
    {
        id: "2",
        text: "Mac은 맥북을 좋아해",
        createdAt: Date.now().toString(),
        name: "Mac",
        username: "mac",
    },
];
const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", (req, res, next) => {
    const username = req.query.username;
    const data = username
        ? tweets.filter((item) => item.username === username)
        : tweets;
    res.status(200).json(data);
});

// GET /tweets/:id
router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    const tweet = tweets.find((item) => item.id === id);
    console.log(tweet, id);
    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message: `Tweet id(${id}) not Found!`});
    }
});

// POST /tweets
router.post("/", (req, res, next) => {
    const {text, name, username} = req.body;
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username,
    };
    tweets = [tweet, ...tweets];
    res.status(201).json(tweet);
});
// PUT /tweets/:id
// router.put("/:id", (req, res, next) => {
//     const id = req.params.id;
//     const text = req.body.text;
//     tweets = tweets.map((item) => {
//         if (item.id === id) {
//             item.text = text;
//             return item;
//         } else {
//             return item;
//         }
//     });
//     res.status(200).json(text);
// });

router.put("/:id", (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find((user) => user.id === id);
    if (tweet) {
        tweet.text = text;
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message: `Tweet id(${id}) not Found!`});
    }
});

// DELETE /tweets/:id
router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    tweets = tweets.filter((item) => item.id !== id);
    res.status(204).json(id);
});

export default router;
