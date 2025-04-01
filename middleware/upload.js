const multer = require("multer");

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, "");
    },
});

const upload = multer({ 
    storage: storage, 
    limits: { 
        
    fileSize: 1024 * 1024 * 5
    }, // Giới hạn kích thước file tối đa là 5MB
}).single("image");

module.exports = upload;