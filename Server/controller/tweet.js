import {getSocketIO} from "../connection/socket.js";
import * as tweetRepository from "../data/tweet.js";

export async function getTweets(req, res) {
    const username = req.query.username;
    const data = await (username ? tweetRepository.getAllByUsername(username) : tweetRepository.getAll());
    res.status(200).json(data);
}

export async function getTweet(req, res) {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);
    // console.log(tweet, id);
    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message: `Tweet id(${id}) not Found!`});
    }
}

export async function createTweet(req, res) {
    const {text} = req.body;
    const tweet = await tweetRepository.create(text, req.userId);
    res.status(201).json(tweet);
    getSocketIO().emit("tweets", tweet);
}

export async function updateTweet(req, res) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.getById(id);
    if (!tweet) {
        return res.sendStatus(404);
    }
    // mongodb 사용시 objectId 값이 같아도 같다고 안해주기 때문에 toString 해줌
    const reqUserId = req.userId.toString;
    const reqTweetId = tweet.userId.toString;
    if (reqUserId !== reqTweetId) {
        return res.sendStatus(403);
    }
    const updated = await tweetRepository.update(id, text);
    res.status(200).json(updated);
}

export async function deleteTweet(req, res) {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);
    if (!tweet) {
        return res.sendStatus(404);
    }
    const reqUserId = req.userId.toString;
    const reqTweetId = tweet.userId.toString;
    if (reqUserId !== reqTweetId && reqUserId !== 1) {
        return res.sendStatus(403);
    }
    await tweetRepository.remove(id);
    res.status(204).json(id);
}

export async function deleteTweetByUserId(req, res) {
    const username = req.query.username;
    if (!username) {
        return res.sendStatus(404);
    }
    const data = await tweetRepository.getAllByUsername(username);
    let deleteArr = [];
    data.forEach((item) => {
        deleteArr.push(item.dataValues.id);
    });
    deleteArr.forEach(async (item) => {
        await tweetRepository.remove(item);
    });
    res.status(204).json(username);
}
