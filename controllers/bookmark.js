const Bookmark = require('../models/booksmarks');

exports.postCreateBookmark = (req, res, next) => {
    const bookmark_title = req.body.bookmark_title;
    const href = req.body.href;
    const description = req.body.description;

    const bookmark = new Bookmark({
        
    })


}