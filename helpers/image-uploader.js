const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({                       //diskStorage -> method of multer
    destination: function(req, file, cb){                  // cb -> callback fun
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(new Error('Unsupported files'), false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5             //5 mb
    },
    fileFilter: fileFilter
});


module.exports = {
    upload: upload
}