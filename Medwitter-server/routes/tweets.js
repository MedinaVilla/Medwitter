
const express = require("express");
const { CONSOLE_APPENDER } = require("karma/lib/constants");
const { } = require("mongodb");
const { Connection } = require("../mongodb");
const sse = require("../sse");
const path = require("path");
const fs = require("fs");
const router = express.Router();

var multer  = require('multer');
// var upload = multer({ dest: 'files/'});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "files");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  var upload = multer({ storage: storage });

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


    /*
      let incrementUser = await Connection.db.collection('users').findOneAndUpdate(
        {
            "username": retweetTweet.username,
            "tweets.myTweets.idTweet": parseInt(retweetTweet.idTweet)
        },
        { $inc: { "tweets.myTweets.$.content.retweets": 1 } },
        { returnDocument: 'after' }
    )
    */
    let user = await Connection.db.collection('users').findOneAndUpdate(
        {
            "username": "MedinaVilla23",
        },
        {
            $push: { "tweets.myTweets": tweetToMake },
        },
        { returnDocument: 'after' }
    )

    let replieUser = await Connection.db.collection('users').findOneAndUpdate(
        {
            "username": usernameResponse,
            "tweets.myTweets.idTweet": parseInt(idTweetResponse),
        },
        {
            $inc: { "tweets.myTweets.$.content.replies": 1 },
            $push: {
                "tweets.myTweets.$.replies": {
                    "username": tweetToMake.user.username,
                    "idTweet": tweetToMake.idTweet
                },
            }
        },
        { returnDocument: 'after' }
    )

    res.status(200).json({ "message": "OK" });

    let newReplies = replieUser.value.tweets.myTweets.filter((tweet) => tweet.idTweet == idTweetResponse)[0].content.replies;

    sse.send({
        replies: newReplies,
        user_interaction: {
            retweet: user.value.tweets.retweet,
            liked: user.value.tweets.liked
        }
    }, "change_interaction_tweet_" + idTweetResponse);
})

router.post("/tweet", upload.array('fileToUpload[]'),  async (req, res) => {
    let tweetToMake = {};
    tweetToMake.type = 1;
    tweetToMake.idTweet = new Date().valueOf();
    tweetToMake.user = {};
    tweetToMake.user.image = req.body.image;
    tweetToMake.user.username = req.body.username;
    tweetToMake.user.name = req.body.name;
    tweetToMake.content = {};
    tweetToMake.content.text = req.body.text;
    tweetToMake.content.replies = 0;
    tweetToMake.content.retweets = 0;
    tweetToMake.content.likes = 0;
    tweetToMake.content.date = new Date();
    tweetToMake.replies = [];
    tweetToMake.content.media = [];


    req.files.map((f)=>{
        tweetToMake.content.media.push("http://localhost:3000/"+f.path);
    })

    if(req.body.gif){
        tweetToMake.content.media.push(req.body.gif);;
    }


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

    let user = await Connection.db.collection('users').findOneAndUpdate(
        {
            "username": likeUser,
        },
        {
            $push: {
                "tweets.liked": {
                    "username": likeTweet.username,
                    "idTweet": likeTweet.idTweet

                }
            }
        },
        { returnDocument: 'after' }
    )

    let incrementUser = await Connection.db.collection('users').findOneAndUpdate(
        {
            "username": likeTweet.username,
            "tweets.myTweets.idTweet": parseInt(likeTweet.idTweet)
        },
        { $inc: { "tweets.myTweets.$.content.likes": 1 } },
        { returnDocument: 'after' }
    )

    let newLikes = incrementUser.value.tweets.myTweets.filter((tweet) => tweet.idTweet == likeTweet.idTweet)[0].content.likes;

    res.status(200).json({ "message": "OK" });

    sse.send({
        likes: newLikes,
        user_interaction: {
            retweet: user.value.tweets.retweet,
            liked: user.value.tweets.liked
        }
    }, "change_interaction_tweet_" + likeTweet.idTweet);

})

router.post("/tweet/dislike", async (req, res) => {
    let likeUser = "MedinaVilla23";
    let dislikeTweet = req.body.tweet;

    let user = await Connection.db.collection('users').findOneAndUpdate(
        {
            "username": likeUser,
        },
        { $pull: { 'tweets.liked': { idTweet: dislikeTweet.idTweet } } },

        { returnDocument: 'after' })


    let decrementUser = await Connection.db.collection('users').findOneAndUpdate(
        {
            "username": dislikeTweet.username,
            "tweets.myTweets.idTweet": parseInt(dislikeTweet.idTweet)
        },
        { $inc: { "tweets.myTweets.$.content.likes": -1 } },
        { returnDocument: 'after' }
    )
    res.status(200).json({ "message": "OK" });

    let newLikes = decrementUser.value.tweets.myTweets.filter((tweet) => tweet.idTweet == dislikeTweet.idTweet)[0].content.likes;

    sse.send({
        likes: newLikes,
        user_interaction: {
            retweet: user.value.tweets.retweet,
            liked: user.value.tweets.liked
        }
    }, "change_interaction_tweet_" + dislikeTweet.idTweet);
})

router.post("/tweet/retweet", async (req, res) => {
    let retweetUser = "MedinaVilla23";
    let retweetTweet = req.body.tweet;

    let user = await Connection.db.collection('users').findOneAndUpdate(
        {
            "username": retweetUser,
        },
        {
            $push: {
                "tweets.retweet": {
                    "username": retweetTweet.username,
                    "idTweet": retweetTweet.idTweet

                }
            }
        },
        { returnDocument: 'after' }
    )

    let incrementUser = await Connection.db.collection('users').findOneAndUpdate(
        {
            "username": retweetTweet.username,
            "tweets.myTweets.idTweet": parseInt(retweetTweet.idTweet)
        },
        { $inc: { "tweets.myTweets.$.content.retweets": 1 } },
        { returnDocument: 'after' }
    )

    res.status(200).json({ "message": "OK" });

    console.log(incrementUser)
    let newRetweets = incrementUser.value.tweets.myTweets.filter((tweet) => tweet.idTweet == retweetTweet.idTweet)[0].content.retweets;

    sse.send({
        retweets: newRetweets,
        user_interaction: {
            retweet: user.value.tweets.retweet,
            liked: user.value.tweets.liked
        }
    }, "change_interaction_tweet_" + retweetTweet.idTweet);

})

router.post("/tweet/unRetweet", async (req, res) => {
    let retweeteUser = "MedinaVilla23";
    let retweetTweet = req.body.tweet;

    let user = await Connection.db.collection('users').findOneAndUpdate(
        {
            "username": retweeteUser,
        },
        { $pull: { 'tweets.retweet': { idTweet: retweetTweet.idTweet } } },
        { returnDocument: 'after' }
    )


    let decrementUser = await Connection.db.collection('users').findOneAndUpdate(
        {
            "username": retweetTweet.username,
            "tweets.myTweets.idTweet": parseInt(retweetTweet.idTweet)
        },
        { $inc: { "tweets.myTweets.$.content.retweets": -1 } },
        { returnDocument: 'after' }
    )


    res.status(200).json({ "message": "OK" });

    let newRetweets = decrementUser.value.tweets.myTweets.filter((tweet) => tweet.idTweet == retweetTweet.idTweet)[0].content.retweets;

    sse.send({
        retweets: newRetweets,
        user_interaction: {
            retweet: user.value.tweets.retweet,
            liked: user.value.tweets.liked
        }
    }, "change_interaction_tweet_" + retweetTweet.idTweet);
})


router.get("/tweets", async (req, res) => {
    // let username = req.params.username;

})

module.exports = router;