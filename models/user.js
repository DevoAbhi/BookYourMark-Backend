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
            }
        //     bookmark_ids: [
        //         {
        //             bookmark_id : {
        //                 type: String
        //             }
        //     }
                
        // ]
        }
    ]
})

userSchema.methods.addFolder = function (folder_title) {
    this.folders.push({folder_title: folder_title})
    return this.save()
}

returnIndex = (folders, folder_id) => {
    for (let i = 0; i < folders.length; i++){
        if(String(folders[i]._id) === String(folder_id))
            return i
    }
}

userSchema.methods.removeFolder = function (folder_id) {

    let folders = this.folders;
    let index = returnIndex(folders, folder_id);

    if(index != undefined) {
        folders.splice(index, 1);
        this.folders = folders;
        return this.save()
    }

    return "yaha hu bsdk"

}



module.exports = mongoose.model('User', userSchema);