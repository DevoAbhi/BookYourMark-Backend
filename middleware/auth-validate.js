const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.get('X-AUTH-TOKEN')

        let user_credentials =jwt.verify(token, 'secret_which_I_have_kept_small_but_has_to_be_longer');

        if(user_credentials){
            req.token = user_credentials;
            next();
        }
        else{
            throw new Error('Invalid Token!')
        }
        
    }
    catch(error) {

        if(error.name == 'TokenExpiredError') {
            error.message = 'Token has expired.... Please login again.'
        }
        else{
            console.log(error);
            error.message = 'Invalid Token.... Please login again.'
        }
        return res.status(401).json({
            success : false,
            message: error.message
        })
    }
}