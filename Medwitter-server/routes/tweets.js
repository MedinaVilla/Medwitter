
const e = require("express");
const express = require("express");
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

    let doc = await Connection.db.collection('users').findOne({
        "username": username
    });
    let tweet = doc.tweets.myTweets.filter((tweet) => tweet.idTweet == idTweet)
    if (tweet.length > 0) {
        res.status(200).json(tweet[0]);
    }
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

    let feed = doc.tweets.myTweets;

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
        return new Date(a.content.date) - new Date(b.content.date)
    })

    // console.log(feed);
    return res.status(200).json(feed);
})



router.get("/tweets", async (req, res) => {
    // let username = req.params.username;
 

})

module.exports = router;