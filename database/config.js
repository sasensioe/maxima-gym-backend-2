
const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Success')
    } catch (error) {
        console.log(error)
        throw new Error('Unable to connect database');
    }

};

module.exports = { dbConnection };