const express = require('express');
const { Connection } = require('./mongodb');
const app = express()
const cors = require('cors')
const port = 3000;
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

Connection.open();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static(__dirname));
app.use(express.json());
require('./routes')(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})