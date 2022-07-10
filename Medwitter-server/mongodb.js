const { MongoClient } = require('mongodb')
const { ServerApiVersion } = require('mongodb');
require('dotenv').config();
class Connection {

    static async open() {
        if (this.db) return this.db;
        console.log("Nueva conexion")
        const client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        client.connect(err=>{
            this.db = client.db("Medwitter") ;   
        });
        return this.db
    }

}

Connection.db = null
Connection.url = 'mongodb+srv://MedinaVilla:'+process.env.MONGO_DB_PASSWORD+'@cluster0.pkokvbc.mongodb.net/?retryWrites=true&w=majority'

module.exports = { Connection }