const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/nikhil';

const connectToMongo = () => {
    mongoose.connect(mongoURI, console.log('mongo connected'));
}

module.exports = connectToMongo;