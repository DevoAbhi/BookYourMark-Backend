const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bookmarksSchema = new Schema({
    bookmark_title:{
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
    },
    
    folder_id : {
        type: Schema.Types.ObjectId,
        required: true
    }
    
})

module.exports = mongoose.model('Bookmark', bookmarksSchema);