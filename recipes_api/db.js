const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@clusterp-t0dvb.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
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

