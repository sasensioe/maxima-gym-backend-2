
const { Schema, model } = require('mongoose');


const SchemaArticle = Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true,
        default: new Date()
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    update: {
        type: Object,
        required: false
    }

});

SchemaArticle.method('toJSON', function () {

    const { __v, _id, ...object } = this.toObject();

    return object;

});

module.exports = model('Article', SchemaArticle);