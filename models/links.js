const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const linksSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Links', linksSchema);