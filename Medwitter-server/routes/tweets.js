
const express = require("express");
const { CONSOLE_APPENDER } = require("karma/lib/constants");
const { } = require("mongodb");
const { Connection } = require("../mongodb");
const router = express.Router();


router.get("/tweet", async (req, res) => {
    let username = req.query.username;
    let idTweet = req.query.idTweet;
    if (!username) {
        res.status(400).json({
            message: "Brinde el nombre de usuario"
        })
    }
    if (!idTweet) {
        res.status(400).json({
            message: "Brinde el idTweet"
        })
    }

    Connection.db.dog
    let doc = await Connection.db.collection('users').findOne({
        "username": username
    });
    let tweet = doc.tweets.myTweets.filter((tweet) => tweet.idTweet == idTweet)
    if (tweet.length > 0) {
        res.status(200).json(tweet[0]);
    }
    return res.status(200).json({});
})

router.get("/tweet/w/replies", async (req, res) => {
    let username = req.query.username;
    let idTweet = req.query.idTweet;
    if (!username) {
        res.status(400).json({
            message: "Brinde el nombre de usuario"
        })
    }
    if (!idTweet) {
        res.status(400).json({
            message: "Brinde el idTweet"
        })
    }

    let doc = await Connection.db.collection('users').findOne({
        "username": username
    });
    let tweetA = doc.tweets.myTweets.filter((tweet) => tweet.idTweet == idTweet)
    let tweet = tweetA[0];
    // let auxTweet = tweet;
    // do {
    if (tweet) {
        await Promise.all(
            tweet.replies.map(async (replie, j) => {
                return new Promise(async (resolve, reject) => {
                    let docs = await Connection.db.collection('users').findOne({
                        "username": replie.username
                    })

                    let replyTweet = docs.tweets.myTweets.find(doc => doc.idTweet === replie.idTweet);
                    // if(auxTweet.replies){
                    // auxTweet.replies[j] = replyTweet;
                    // auxTweet = replyTweet;
                    // } else{
                    // auxTweet.replies = [replyTweet]   
                    // }

                    tweet.replies[j] = replyTweet;
                    resolve();
                })
            })
        )
    }
    // } while (auxTweet.replies);
    return res.status(200).json(tweet);

})

router.post("/tweet/replie", async (req, res) => {
    let idTweetResponse = req.query.idTweet;
    let usernameResponse = req.query.username;
    let tweetToMake = req.body.tweet;

    tweetToMake.idTweet = new Date().valueOf();
    tweetToMake.content.replies = 0;
    tweetToMake.content.retweets = 0;
    tweetToMake.content.likes = 0;
    tweetToMake.content.date = new Date();

    if (tweetToMake.type == 2) {
        tweetToMake.repliesToTweet = {
            username: usernameResponse,
            idTweet: idTweetResponse
        };
    }

    let doc = await Connection.db.collection('users').updateOne(
        {
            "username": "MedinaVilla23",

        },
        { $push: { "tweets.myTweets": tweetToMake } },
        { upsert: true }
    )

    let doc2 = await Connection.db.collection('users').updateOne(
        {
            "username": usernameResponse,
            "tweets.myTweets.idTweet": parseInt(idTweetResponse)
        },
        {
            $push: {
                "tweets.myTweets.$.replies": {
                    "username": tweetToMake.user.username,
                    "idTweet": tweetToMake.idTweet
                }
            }
        },
        { upsert: true }
    )

    return res.status(200).json({ "message": "OK" });
})



router.post("/tweet", async (req, res) => {
    let tweetToMake = req.body.tweet;

    tweetToMake.idTweet = new Date().valueOf();
    tweetToMake.content.replies = 0;
    tweetToMake.content.retweets = 0;
    tweetToMake.content.likes = 0;
    tweetToMake.content.date = new Date();

    let doc = await Connection.db.collection('users').updateOne(
        {
            "username": "MedinaVilla23"
        },
        { $push: { "tweets.myTweets": tweetToMake } },
        { upsert: true }
    )
    return res.status(200).json({});
})


router.get("/feed", async (req, res) => {
    let username = req.query.username;
    if (!username) {
        res.status(400).json({
            message: "Brinde el nombre de usuario"
        })
    }

    let doc = await Connection.db.collection('users').findOne({
        "username": username
    });

    let feed = doc.tweets.myTweets.filter((tweet) => tweet.type !== 2)

    await Promise.all(
        doc.follows.map(async (userFollow, i) => {
            return new Promise(async (resolve, reject) => {
                let docs = await Connection.db.collection('users').findOne({
                    "username": userFollow
                })
                let replyTweet = docs.tweets.myTweets;
                feed.push(...replyTweet);

                // HARE PUSH DE LOS LIKED DE LA PERSONA A QUIEN SIGUE
                let likedTweets = docs.tweets.liked;
                if (likedTweets.length > 0) {
                    await Promise.all(
                        likedTweets.map(async (referenceTweet, i) => {
                            let docss = await Connection.db.collection('users').findOne({
                                "username": referenceTweet.username
                            })


                            let tweet = docss.tweets.myTweets.filter((tweet) => tweet.idTweet == referenceTweet.idTweet)
                            tweet[0].content.liked = {
                                name: docs.name
                            };
                            feed.push(tweet[0]);
                        }))
                    resolve();
                }

                // HARE PUSH DE LOS RETWITTED DE LA PERSONA A QUIEN SIGUE

                let retweetedTweets = docs.tweets.retweet;
                if (retweetedTweets.length > 0) {
                    await Promise.all(
                        retweetedTweets.map(async (referenceTweet, i) => {
                            let docss = await Connection.db.collection('users').findOne({
                                "username": referenceTweet.username
                            })
                            let tweet = docss.tweets.myTweets.filter((tweet) => tweet.idTweet == referenceTweet.idTweet)
                            tweet[0].content.retweetted = {
                                name: docs.name
                            };
                            feed.push(tweet[0]);
                        }))
                    resolve();
                }
                resolve();
            });
        })
    )

    await Promise.all(
        doc.tweets.retweet.map(async (userRetweet, i) => {
            return new Promise(async (resolve, reject) => {
                let docs = await Connection.db.collection('users').findOne({
                    "username": userRetweet.username
                })
                let retweetTweets = docs.tweets.myTweets;
                let tweet = retweetTweets.filter((tweet) => tweet.idTweet == userRetweet.idTweet)
                tweet[0].content.retweetted = {
                    name: docs.name,
                    retweetedByMe: true
                };
                feed.push(tweet[0]);
                resolve();
            }
            )
        }))

    feed.sort(function (a, b) {
        return new Date(b.content.date) - new Date(a.content.date)
    })

    return res.status(200).json(feed);
})



router.post("/tweet/like", async (req, res) => {
    let likeUser = "MedinaVilla23";
    let likeTweet = req.body.tweet;

    let doc = await Connection.db.collection('users').updateOne(
        {
            "username": likeUser,
        },
        { $push: { "tweets.liked": {
            "username": likeTweet.username,
            "idTweet": likeTweet.idTweet

        } } },
        { upsert: true }
    )

    return res.status(200).json({ "message": "OK" });
})

router.post("/tweet/dislike", async (req, res) => {
    let likeUser = "MedinaVilla23";
    let dislikeTweet = req.body.tweet;

    let doc = await Connection.db.collection('users').updateOne(
        {
            "username": likeUser,
        },
        { $pull: { 'tweets.liked': { idTweet: dislikeTweet.idTweet } } }    )

    return res.status(200).json({ "message": "OK" });
})

router.post("/tweet/retweet", async (req, res) => {
    let likeUser = "MedinaVilla23";
    let likeTweet = req.body.tweet;

    let doc = await Connection.db.collection('users').updateOne(
        {
            "username": likeUser,
        },
        { $push: { "tweets.retweet": {
            "username": likeTweet.username,
            "idTweet": likeTweet.idTweet

        } } },
        { upsert: true }
    )

    return res.status(200).json({ "message": "OK" });
})

router.post("/tweet/unRetweet", async (req, res) => {
    let likeUser = "MedinaVilla23";
    let retweetTweet = req.body.tweet;

    let doc = await Connection.db.collection('users').updateOne(
        {
            "username": likeUser,
        },
        { $pull: { 'tweets.retweet': { idTweet: retweetTweet.idTweet } } }    )

    return res.status(200).json({ "message": "OK" });
})


router.get("/tweets", async (req, res) => {
    // let username = req.params.username;

})

module.exports = router;