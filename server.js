const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

app.use(cors());
const upload = multer({ storage: storage });

app.use(express.static(__dirname));
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('assignment'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No files were uploaded.' });
    }
    res.status(200).json({ success: true, message: 'File uploaded successfully.' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
