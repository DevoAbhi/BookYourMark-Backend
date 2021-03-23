const Bookmark = require('../models/booksmarks');
const User = require('../models/user');

exports.postCreateBookmark = async (req, res, next) => {
    const bookmark_title = req.body.bookmark_title;
    const href = req.body.href;
    const description = req.body.description;
    const folder_id = req.body.folder_id;

    const user = await User.findOne({'folders._id': folder_id})
    const folder = user.folders.find(obj => obj._id == folder_id)

    const bookmark = new Bookmark({
        bookmark_title: bookmark_title,
        href: href,
        description: description,
        folder_id: folder._id,
        folder_title : folder.folder_title,
    })

    return bookmark.save().then(result => {
        console.log(result);
        return res.status(200).json({
            success: true,
            bookmark: result,
            message: "Bookmark has been added!"
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong adding the bookmark"
        })
    })


}

exports.getBookmarks = async (req, res, next) => {
    
    try{
    
        const folderId = req.query.folder_id;

        const bookmarks = await Bookmark.find({folder_id: folderId});

        if(bookmarks.length >= 0){
            return res.status(200).json({
                success : true,
                bookmarks : bookmarks,
                message: "Got all the bookmarks!"
            })
        }

        res.status(500).json({
            success: true,
            message: "Invalid data"
        })

    }   
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong getting bookmarks"
        })
    }
}