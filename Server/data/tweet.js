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
        url: "https://www.digitaltrends.com/wp-content/uploads/2018/11/macbook-air-2018-review-5877.jpg?p=1",
    },
    {
        id: "3",
        text: "성우도 밥을 좋아해",
        createdAt: Date.now().toString(),
        name: "Seongwoo",
        username: "seongwoo",
        url: "data:image/jpeg;base64,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",
    },
    {
        id: "4",
        text: "관우는 서로소를 증명해",
        createdAt: Date.now().toString(),
        name: "Gwanwoo",
        username: "Gwanwoo",
        url: "https://cdn.discordapp.com/attachments/682966370425634948/1092000637782343751/image.png",
    },
    {
        id: "5",
        text: "박주형 미친새끼",
        createdAt: Date.now().toString(),
        name: "Juhyung",
        username: "juhyung",
        url: "https://media.discordapp.net/attachments/682966370425634948/1091998693009403955/20230330_110355.jpg?width=896&height=1194",
    },
];

export async function getAll() {
    return tweets;
}

export async function getAllByUsername(username) {
    return tweets.filter((item) => item.username === username);
}

export async function getById(id) {
    return tweets.find((item) => item.id === id);
}

export async function create(text, name, username) {
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username,
    };
    tweets = [tweet, ...tweets];
    return tweet;
}

export async function update(id, text) {
    const tweet = tweets.find((user) => user.id === id);
    if (tweet) {
        tweet.text = text;
    }
    return tweet;
}

export async function remove(id) {
    const tweet = tweets.find((item) => item.id === id);
    if (tweet) {
        tweets = tweets.filter((item) => item.id !== id);
        return tweets;
    } else {
        return false;
    }
}
