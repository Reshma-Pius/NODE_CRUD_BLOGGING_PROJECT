const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    try{
        const token = req.headers.authorization.split(' ')[1];          //we use req.header to pass token;       
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);           // decode token using verify
        req.userData = decodedToken;
        next();                                                       //hands over                      
    }catch(e){
        return res.status(401).json({
            'message': 'Invalid or expired token',
            'error': e
        });
    }
}

module.exports = {
    checkAuth: checkAuth
}
