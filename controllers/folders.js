const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Bookmark = require('../models/booksmarks')

exports.postCreateFolder = async (req, res, next) => {
    
    try{
        
        // let userId = jwt.verify(req.get('X-AUTH-TOKEN'), 'secret_which_I_have_kept_small_but_has_to_be_longer')

        const folder_title = req.body.folder_title;
        
        req.user.addFolder(folder_title)
        .then(result => {
            
            res.status(200).json({
                success: true,
                _id : result.folders.slice(-1)[0]._id,
                folder_title: folder_title,
                message: "Folder has been created!"
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

exports.postDeleteFolder = async (req, res, next) => {
    
    try{
        const folder_id = req.query.folder_id;
        console.log(folder_id)
        const user = await User.findById(req.user._id);
        if(user != null) {
            await Bookmark.deleteMany({folder_id: folder_id}).then(result => {
                console.log(result)
            })

            try {
                req.user.removeFolder(folder_id).then(result => {
                    console.log("Result after removing the folder from the users")
                    console.log(result)
                    res.status(200).json({
                        success: true,
                        message: "Folder has been deleted!"
                    })
                })
                
                

                
            }
            catch(err){
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: "Something went wrong removing folder from users"
                })
            }
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong deleting the folder"
        })
    }
}