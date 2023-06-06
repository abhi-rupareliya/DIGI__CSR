const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        const filename = file.originalname.replace(/ /g, "_");
        cb(null, uniqueSuffix + '-' + filename);
    }
});

const upload = multer({ storage });

const fileUploaderMiddleware = (req, res, next) => {

    console.log(req.file);

    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }


    upload.single('file')(req, res, err => {
        if (err) {
            return res.status(400).json({ success: false, message: 'File upload failed' });
        }

        // File uploaded successfully
        const fileUrl = `http://locahost:4000/uploads/${req.file.originalname}`;
        req.fileUrl = fileUrl;
        next();
    });
};

module.exports = fileUploaderMiddleware;
