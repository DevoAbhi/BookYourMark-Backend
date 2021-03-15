const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    folders:[
        {
            folder_title: { 
                type: String,
                required: true 
            },
            bookmark_id:{
                type: Schema.Types.ObjectId,
                ref: 'Bookmark',
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('User', userSchema);