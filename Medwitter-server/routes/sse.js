const express = require("express");
const sse = require("../sse");

const router = express.Router();

router.get("/stream", (req, res, next) => {
    res.flush = () => { };
    next();
}, sse.init);

module.exports = router;