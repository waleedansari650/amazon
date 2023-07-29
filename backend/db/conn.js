const mongoose = require('mongoose');
require('dotenv').config();

module.exports = connect = async () => {
    try {
        const response = mongoose.connect(process.env.URL);
        if (response) {
            console.log("DB is connected at Mongo Server");
        }
    } catch (error) {
        console.log(error);
    }
}

