
const { Schema, model } = require('mongoose');


const SchemaInfoRequest = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true,
        default: new Date()
    },
    phone: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false
    },
    calls: {
        type: Object,
        required: false
    }
});

SchemaInfoRequest.method('toJSON', function () {

    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;

});

module.exports = model('InfoRequest', SchemaInfoRequest);