
const express = require("express");
const { ObjectId } = require("mongodb");
const { Connection } = require("../mongodb");
const router = express.Router();


router.get("/event", async (req, res) => {
    let id = req.query.id;
    let event = await Connection.db.collection('events').findOne({
        "_id": ObjectId(id)
    });
    
    return res.status(200).json(event);
})

router.get("/latest_events", async (req, res) => {
    let events = await Connection.db.collection('events').find().toArray();
    
    let hastags = await Connection.db.collection('hashtag').find().limit(3).toArray();
    hastags.map((hastag)=>{
        events.push({
            _id:  hastag._id,
            title: "#" + hastag.name,
            tweets: hastag.tweets.length
        })
    })

    return res.status(200).json(events);
})


module.exports = router;