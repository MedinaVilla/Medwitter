
const express = require("express");
const { Connection } = require("../mongodb");
const router = express.Router();

router.get("/user", async (req, res) => {
    // let username = req.params.username;
    // console.log(req.params)
    let doc = await Connection.db.collection('users').findOne({
        "username": "MedinaVilla23"
    });

    let responseUser = {
        name: doc.name,
        username: doc.username,
        description: doc.description,
        verified: doc.verified,
        image: doc.image,
        banner: doc.banner,
        date_registered: doc.date_registered,
        followers: doc.followers,
        follows: doc.follows
    }

    return res.status(200).json(responseUser)
})

router.get("/user/interaction", async (req, res) => {
    // let username = req.params.username;
    // console.log(req.params)
    let doc = await Connection.db.collection('users').findOne({
        "username": "MedinaVilla23"
    });

    let responseTweets = {
        retweet: doc.tweets.retweet,
        liked: doc.tweets.liked
    }

    res.status(200).json(responseTweets)
})

router.get("/user/tweetsInteraction", async (req, res) => {
    // let username = req.params.username;
    // console.log(req.params)
    let doc = await Connection.db.collection('users').findOne({
        "username": "MedinaVilla23"
    });

    let responseTweets = {
        tweets: doc.tweets.myTweets,
        retweet: doc.tweets.retweet,
        liked: doc.tweets.liked
    }

    await Promise.all(
        doc.tweets.retweet.map(async (retweet) => {
            return new Promise(async (resolve, reject) => {
                let docs = await Connection.db.collection('users').findOne({
                    "username": retweet.username
                });
                let tweet = docs.tweets.myTweets.find(doc => doc.idTweet === retweet.idTweet);

                tweet.content.retweetted = {
                    name: docs.name,
                    retweetedByMe: true
                };
                responseTweets.tweets.push(tweet);
                resolve();
            })
        }))

    return res.status(200).json(responseTweets)
})

router.get("/user/tweetsInteraction/tweets/liked", async (req, res) => {
    let user = await Connection.db.collection('users').findOne({
        "username": "MedinaVilla23"
    });

    let results = [];

    await Promise.all(
        user.tweets.liked.map(async (userRetweet) => {
            return new Promise(async (resolve, reject) => {
                let docs = await Connection.db.collection('users').findOne({
                    "username": userRetweet.username
                });

                let tweet = docs.tweets.myTweets.find(doc => doc.idTweet === userRetweet.idTweet);

                results.push(tweet);
                resolve();
            })
        })
    )

    return res.status(200).json(results)
})

router.get("/user/tweetsInteraction/tweets/retweeted", async (req, res) => {
    let user = await Connection.db.collection('users').findOne({
        "username": "MedinaVilla23"
    });

    let results = [];

    await Promise.all(
        user.tweets.retweet.map(async (userRetweet) => {
            return new Promise(async (resolve, reject) => {
                let docs = await Connection.db.collection('users').findOne({
                    "username": userRetweet.username
                });

                let tweet = docs.tweets.myTweets.find(doc => doc.idTweet === userRetweet.idTweet);
                results.push(tweet);
                resolve();
            })
        })
    )

    return res.status(200).json(results)
})


router.get("/user/tweetsInteraction/tweets/w/replies", async (req, res) => {
    let doc = await Connection.db.collection('users').findOne({
        "username": "MedinaVilla23"
    });

    let responseTweets = doc.tweets.myTweets;

    await Promise.all(
        responseTweets.map(async (tweet, i) => {
            if (tweet.replies)
                return new Promise(async (resolve, reject) => {
                    await Promise.all(
                        tweet.replies.map(async (replie, j) => {
                            let docs = await Connection.db.collection('users').findOne({
                                "username": replie.username
                            })
                            let replyTweet = docs.tweets.myTweets.find(doc => doc.idTweet === replie.idTweet);
                            responseTweets[i].replies[j] = replyTweet;
                        })
                    );
                    resolve();
                })
        })
    )


    return res.status(200).json(responseTweets)
})
module.exports = router;