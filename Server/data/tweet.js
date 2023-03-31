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

export function getAll() {
    return tweets;
}

export function getAllByUsername(username) {
    return tweets.filter((item) => item.username === username);
}

export function getById(id) {
    return tweets.find((item) => item.id === id);
}

export function create(text, name, username) {
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

export function update(id, text) {
    const tweet = tweets.find((user) => user.id === id);
    if (tweet) {
        tweet.text = text;
    }
    return tweet;
}

export function remove(id) {
    return tweets.filter((item) => item.id !== id);
}
