
const { resolve } = require("dns");
const { response } = require("express");
const express = require("express");
const { Connection } = require("../mongodb");
const router = express.Router();

router.get("/user", async (req, res) => {
    let username = req.query.username;

    let doc = await Connection.db.collection('users').findOne({
        "username": username
    });

    if (!doc) {
        return res.status(404).json({})
    }
    let responseUser = {
        name: doc.name,
        username: doc.username,
        description: doc.description,
        verified: doc.verified,
        image: doc.image,
        banner: doc.banner,
        date_registered: doc.date_registered,
        followers: doc.followers,
        follows: doc.follows,
        tweets: doc.tweets.myTweets.length
    }

    return res.status(200).json(responseUser)
})

router.get("/user/interaction", async (req, res) => {
    let username = req.query.username;
    // console.log(req.params)
    let doc = await Connection.db.collection('users').findOne({
        "username": username
    });

    let responseTweets = {
        retweet: doc.tweets.retweet,
        liked: doc.tweets.liked
    }

    res.status(200).json(responseTweets)
})

router.get("/user/tweetsInteraction", async (req, res) => {
    let username = req.query.username;

    let doc = await Connection.db.collection('users').findOne({
        "username": username
    });

    doc.tweets.myTweets.sort(function (a, b) {
        return new Date(b.content.date) - new Date(a.content.date)
    })

    let responseTweets = {
        tweets: doc.tweets.myTweets.filter((tweet) => tweet.type != 2),
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
    let username = req.query.username;

    let user = await Connection.db.collection('users').findOne({
        "username": username
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

    results.sort(function (a, b) {
        return new Date(b.content.date) - new Date(a.content.date)
    })

    return res.status(200).json(results)
})

router.get("/user/tweetsInteraction/tweets/retweeted", async (req, res) => {
    let username = req.query.username;


    let user = await Connection.db.collection('users').findOne({
        "username": username
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
    let username = req.query.username;

    let doc = await Connection.db.collection('users').findOne({
        "username": username
    });

    let responseTweets = doc.tweets.myTweets;

    await Promise.all(
        responseTweets.map(async (tweet, i) => {
            if (tweet.type == 2) {
                let docs2 = await Connection.db.collection('users').findOne({
                    "username": tweet.repliesToTweet.username
                })
                let responseRoot = docs2.tweets.myTweets.find(doc => doc.idTweet == tweet.repliesToTweet.idTweet);
                tweet.repliesToTweet = responseRoot;
            }

            if (tweet.replies) {
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

            }
        })
    )

    responseTweets.sort(function (a, b) {
        return new Date(b.content.date) - new Date(a.content.date)
    })


    return res.status(200).json(responseTweets)
})

router.get("/user/tweetsInteraction/tweets/w/media", async (req, res) => {
    let username = req.query.username;


    let doc = await Connection.db.collection('users').findOne({
        "username": username
    });

    let tweets = doc.tweets.myTweets.find(doc => doc.content.media);
    if (tweets.length == undefined) {
        tweets = [tweets];
    }

    tweets.sort(function (a, b) {
        return new Date(b.content.date) - new Date(a.content.date)
    })

    return res.status(200).json(tweets)
})

router.get("/user/notifications", async (req, res) => {
    let username = req.query.username;

    let doc = await Connection.db.collection('users').findOne({
        "username": username
    });

    let notifications = doc.notifications; //[]


    await Promise.all(
        notifications.map(async (notification, i) => {
            return new Promise(async (resolve, reject) => {

                let user = await Connection.db.collection('users').findOne({
                    "username": notification.userInteraction.username
                })
                notifications[i].userInteraction.profile = user.image;

                if (notification.response) {
                    console.log(notification)
                    let tweet = doc.tweets.myTweets.find(doc => doc.idTweet == notification.response.idTweet);
                    let tweetR = user.tweets.myTweets.find(doc => doc.idTweet == notification.response.tweetResponse);

                    console.log(tweet);


                    notifications[i].response.tweet = tweet;
                    notifications[i].response.tweetR = tweetR;
                    resolve();
                } else {
                    let tweet = doc.tweets.myTweets.find(doc => doc.idTweet == notification.idTweet);
                    notifications[i].content = tweet.content;
                    resolve();
                }
            })
        })
    )
    return res.status(200).json(notifications)
})


router.get("/user/notifications/mentions", async (req, res) => {
    let username = req.query.username;

    let doc = await Connection.db.collection('users').findOne({
        "username": username,
    });

    let notifications = [doc.notifications.find(doc => doc.type == 4)];

    await Promise.all(
        notifications.map(async (notification, i) => {
            return new Promise(async (resolve, reject) => {

                let user = await Connection.db.collection('users').findOne({
                    "username": notification.userInteraction.username
                })
                notifications[i].userInteraction.profile = user.image;

                if (notification.response) {
                    let tweet = doc.tweets.myTweets.find(doc => doc.idTweet === notification.response.idTweet);
                    let tweetR = user.tweets.myTweets.find(doc => doc.idTweet === notification.response.tweetResponse);
                    // notification[i]
                    notifications[i].response.tweet = tweet;
                    notifications[i].response.tweetR = tweetR;
                    resolve();
                } else {
                    let tweet = doc.tweets.myTweets.find(doc => doc.idTweet === notification.idTweet);
                    notifications[i].content = tweet.content;
                    resolve();
                }
            })
        })
    )


    return res.status(200).json(notifications)
})

router.get("/search", async (req, res) => {
    let search = req.query.keyword;
    // let doc = await Connection.db.collection('users').find({ "name":new RegExp(search, "i") }).toArray();
    let doc = await Connection.db.collection('users').find({
        "$or": [{
            "name": new RegExp(search, "i")
        }, {
            "username": new RegExp(search, "i")
        }]
    }).toArray();

    let results = [];
    doc.map((s) => {
        let name = s.name;
        if (s.username.includes(search))
            name = s.username;
        results.push({
            name: name,
            type: "profile",
            user: {
                name: s.name,
                username: s.username,
                image: s.image,
                description: s.description,
                verified: s.verified
            }
        })
    })

    return res.status(200).json(results)
})

router.post("/search", async (req, res) => {
    console.log(req.body)

    // if(req.body.pf){
    //     let docs = await Connection.db.collection('users').findOne({
    //         "username": req.body.user
    //     });
    //     docs.follows?.map((userFollowing)=>{
    //         let docs = await Connection.db.collection('users').findOne({
    //             "$or": [{
    //                 "name": new RegExp(search, "i")
    //             }, {
    //                 "username": new RegExp(req.body.query, "i")
    //             }]
    //         });
    //     })
    // }



    let resultsSearch = {
        people: [],
        tweets: []
    }

    let users = await Connection.db.collection('users').find().toArray();
    // RESULTADOS PERSONAS
    let people = users.filter((user) => user.name.includes(req.body.query))

    users.map((user) => {
        // RESULTADOS TWEETS
        let tweets = user.tweets.myTweets.filter((tweet) => tweet.content.text.includes(req.body.query));
        tweets.map((t) => {
            resultsSearch.tweets.push(t)
        })
    })

    people.map((p) => {
        resultsSearch.people.push({
            name: p.name,
            username: p.username,
            image: p.image,
            description: p.description,
            verified: p.verified,
            following: p.followers.includes(req.body.user)
        });
    })


    // let search = req.query.keyword;
    // // let doc = await Connection.db.collection('users').find({ "name":new RegExp(search, "i") }).toArray();
    // let doc = await Connection.db.collection('users').find({
    //     "$or": [{
    //         "name": new RegExp(search, "i")
    //     }, {
    //         "username": new RegExp(search, "i")
    //     }]
    // }).toArray();

    // let results = [];
    // doc.map((s) => {
    //     let name = s.name;
    //     if (s.username.includes(search))
    //         name = s.username;
    //     results.push({
    //         name: name,
    //         type: "profile",
    //         user:{
    //             name: s.name,
    //             username: s.username,
    //             image: s.image,
    //             description: s.description
    //         }
    //     })
    // })

    return res.status(200).json(resultsSearch)
})

module.exports = router;