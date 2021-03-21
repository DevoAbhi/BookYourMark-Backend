const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.postCreateFolder = async (req, res, next) => {
    
    try{
        
        // let userId = jwt.verify(req.get('X-AUTH-TOKEN'), 'secret_which_I_have_kept_small_but_has_to_be_longer')

        const folder_title = req.body.folder_title;
        
        req.user.addFolder(folder_title)
        .then(result => {
            console.log(result);
            
            res.status(200).json({
                success: true,
                folder_title: folder_title,
                message: "Folder has been saved!"
            })
        })
        
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong saving folder"
        })
    }
}

exports.getFolders = async (req, res, next) => {
    try {

        User.findOne({_id : req.user._id})
        .then(user => {
            const folders = user.folders
            const username = user.username

            res.status(200).json({
                success: true,
                username: username,
                folders: folders
            })
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message : "Something went wrong when viewing folders"
        })
    }
}

    exports.postRenameFolder = async (req, res, next) => {
        

        try{
            const folderId = req.body.folderId;
            console.log(folderId)
            const folder_title = req.body.folder_title;
            
            // user.findByIdAndUpdate(folderId, {
            //     $set: {
            //         folder_title: folder_title
            //     }
            // }).then(result => {
            //     console.log(result)
            // })
            await User.updateOne({'folders._id' : folderId},{
                $set : {
                    'folders.$.folder_title': folder_title
                }
            }).then(result => {
                console.log(result)
                res.status(200).json({
                    success: true,
                    message: "The folder title has been updated!"
                })
            })
        }
        catch(err){
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Folder title updation failed due to some error!"
            })
        }

    }
