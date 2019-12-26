const mongoose = require('mongoose');
const config = require('./config/databse');


const url = `mongodb+srv://${config.username}:${config.password}@clusterp-t0dvb.mongodb.net/${config.dbName}?retryWrites=true&w=majority`;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

mongoose.connect(url, options);

mongoose.connection.on('error', (err) => {
    console.log("Mongoose connection error: " + err);
})

mongoose.connection.on('connected', () => {
    console.log("Mongoose connection established");
})

mongoose.connection.on('disconnected', () => {
    console.log("Mongoose disconnected.");
})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log("Mongose connection closed");
        process.exit(0);
    })
})

