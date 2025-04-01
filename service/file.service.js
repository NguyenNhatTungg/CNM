require("dotenv").config();
const { s3 } = require("../utils/aws.helper"); // 
 // Import S3 service đã khởi tạo từ file aws-helper js 1// Hàm randomString sẽ tạo ra một chuỗi ngẫu nhiên với độ dài numberCharacter ký tự dùng để tạo tên file
const randomString = (numberCharacter) => {
    return `${Math.random()
        .toString(36)
        .substring(2, numberCharacter + 2)}`;
};

const FILE_TYPE_MATCH = [
    // Mảng FILE_TYPE _MATCH chứa các 1091 file được phép upload lên AWS S3 (image, video, pdf, word, powerpoint, rar, zip)
    "image/png",
    "image/jpeg",
    "image/jpg",
    "Image/gif",
    "video/mp3",
    "video/mp4",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-offlcedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.rar",
    "application/zip",
];

// Hàm uploadFile sẽ nhận vào một file và trả về một promise
const uploadFile = async (file) => {
    const filePath = `${randomString(4)}-${new Date().getTime()}-${file?.originalname}`;

    // Kiểm tra xem file có phải là file hợp lệ không
    if (FILE_TYPE_MATCH.indexOf(file.mimetype) === -1) {
        throw new Error(`${file?.originalname} is not supported file type`);
    }

    const uploadParams = {
        Bucket: process.env.BUCKET_NAME,
        Body: file?.buffer,
        Key: filePath,
        ContentType: file?.mimetype,
    };

    try {
        const data = await s3.upload(uploadParams).promise();
        console.log(`File uploaded successfully: ${data.Location}`);
        const fileName = `${data.Location}`;
        return fileName;
    } catch (err) {
        throw new Error(`Error uploading file111 to AWS S3: ${err}`);
    }
};

module.exports = { uploadFile };
