const express = require("express");
const sse = require("../sse");

const router = express.Router();
// const EventEmitter = require('events').EventEmitter;

router.get("/stream", async(req, res, next) => {
    res.write("xD")
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
      });
      res.flushHeaders();
      res.write('retry: 10000\n\n');
      let count = 0;
  
      while (true) {
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        console.log('Emit', ++count);
        // Emit an SSE that contains the current 'count' as a string
        res.write(`data: ${count}\n\n`);
      }

    next();
});

module.exports = router;