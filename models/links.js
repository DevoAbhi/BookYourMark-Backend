const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const linksSchema = new Schema({
    title:{
        required: true
    },
    href: {
        required: true
    },
    description: {
        required: true
    }
})

module.exports = mongoose.model('Links', linksSchema);