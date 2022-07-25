
const express = require("express");
const { ObjectId } = require("mongodb");
const { Connection } = require("../mongodb");
const router = express.Router();


router.get("/lists", async (req, res) => {
    let username = req.query.username;

    let user = await Connection.db.collection('users').findOne({
        "username": username
    });
    let lists = await Connection.db.collection('lists').find().toArray();

    let lists_recommend = lists.filter((list) => {
        return !user.lists.following.includes(list._id.toString())
    })

    await Promise.all(
        lists_recommend.map(async (list, i) => {
            return new Promise(async (resolve, reject) => {
                let user = await Connection.db.collection('users').findOne({
                    "username": list.creator
                })

                if (user) {
                    let userInfo = {
                        name: user.name,
                        username: user.username,
                        image: user.image
                    }
                    lists_recommend[i].creator = userInfo;
                } else {
                    let userInfo = {
                        name: list.creator,
                        username: list.creator,
                        image: "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                    }
                    lists_recommend[i].creator = userInfo;
                }
                resolve();
            })
        }))


    return res.status(200).json(lists_recommend);
})

router.get("/list", async (req, res) => {
    let id = req.query.idList;

    let list = await Connection.db.collection('lists').findOne({
        "_id": ObjectId(id)
    });

    await new Promise(async (resolve, reject) => {
        let user = await Connection.db.collection('users').findOne({
            "username": list.creator
        })
        if (user) {
            let userInfo = {
                name: user.name,
                username: user.username,
                image: user.image
            }
            list.creator = userInfo;
        } else {
            let userInfo = {
                name: list.creator,
                username: list.creator,
                image: "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
            }
            list.creator = userInfo;
        }
        resolve();
    })


    let feed = [];
    await Promise.all(
        list.members.map(async (member, i) => {
            return new Promise(async (resolve, reject) => {
                let user = await Connection.db.collection('users').findOne({
                    "username": member
                })

                feed = feed.concat(user.tweets.myTweets);

                await Promise.all(
                    user.tweets.retweet.map(async (userRetweet, i) => {
                        return new Promise(async (resolve, reject) => {
                            let docs = await Connection.db.collection('users').findOne({
                                "username": userRetweet.username
                            })
                            let retweetTweets = docs.tweets.myTweets;
                            let tweet = retweetTweets.filter((tweet) => tweet.idTweet == userRetweet.idTweet)
                            tweet[0].content.retweetted = {
                                name: user.name,
                            };
                            feed.push(tweet[0]);
                            resolve();
                        }
                        )
                    }))

                await Promise.all(
                    user.tweets.liked.map(async (userLiked, i) => {
                        return new Promise(async (resolve, reject) => {
                            let docs = await Connection.db.collection('users').findOne({
                                "username": userLiked.username
                            })
                            let retweetTweets = docs.tweets.myTweets;
                            let tweet = retweetTweets.filter((tweet) => tweet.idTweet == userLiked.idTweet)
                            tweet[0].content.liked = {
                                name: user.name,
                            };
                            feed.push(tweet[0]);
                            resolve();
                        }
                        )
                    }))

                feed.sort(function (a, b) {
                    return new Date(a.content.date) - new Date(b.content.date)
                })
                resolve();
            })
        }))

    list.feed = feed;

    return res.status(200).json(list);
})

router.get("/my_lists", async (req, res) => {
    let username = req.query.username;
    let user = await Connection.db.collection('users').findOne({
        "username": username
    });

    let results = [];

    await Promise.all(
        user.lists.following.map(async (l, i) => {
            return new Promise(async (resolve, reject) => {
                let list = await Connection.db.collection('lists').findOne({
                    "_id": ObjectId(l)
                })

                if (user.lists.fixed.includes(l))
                    list.fixed = true;

                // Haremos FETCH con los datos del usuario
                let userInfo = {
                    name: user.name,
                    username: user.username,
                    image: user.image
                }
                list.creator = userInfo;

                results.push(list);
                resolve();
            }
            )
        }))
    return res.status(200).json(results);
})


module.exports = router;