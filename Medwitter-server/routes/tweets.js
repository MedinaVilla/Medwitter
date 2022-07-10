
const express = require("express");
const { Connection } = require("../mongodb");
const router = express.Router();

router.get("/tweets", async (req, res) => {
    // let username = req.params.username;
    // console.log(req.params)
    let doc = await Connection.db.collection('users').findOne({
        "username": "MedinaVilla23"
    });

    let responseUser={
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

    res.status(200).json(responseUser)

})

module.exports = router;