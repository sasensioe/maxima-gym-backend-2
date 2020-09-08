
const { Schema, model } = require('mongoose');


const SchemaClient = Schema({

    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'client'
    },
    surname: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true
    },
    created: {
        type: Number,
        required: true,
        default: new Date()
    },
    createdBy: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    routine: {
        type: Array,
        required: false
    },
    address: {
        type: Object,
        required: true,
        address: {
            type: String
        },
        number: {
            type: Number
        },
        city: {
            type: String
        },
        province: {
            type: String
        },
        postalCode: {
            type: Number
        }
    },
    contact: {
        type: Object,
        required: true,
        email: {
            type: String
        },
        phone: {
            type: Number
        }
    },
    access: {
        type: Object,
        required: true,
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }

});

SchemaClient.method('toJSON', function () {

    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;

    return object;

});

module.exports = model('Client', SchemaClient);