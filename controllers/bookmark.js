const Bookmark = require('../models/booksmarks');

exports.postCreateBookmark = (req, res, next) => {
    const bookmark_title = req.body.bookmark_title;
    const href = req.body.href;
    const description = req.body.description;
    const folder_id = req.body.folder_id;

    const bookmark = new Bookmark({
        bookmark_title: bookmark_title,
        href: href,
        description: description,
        folder_id : folder_id
    })

    return bookmark.save().then(result => {
        console.log(result);
        return res.status(200).json({
            success: true,
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