require("dotenv").config();
const AWS = require("aws-sdk");

// Load environment gla tri từ file .env dé config cho AwS SDK
AWS.config.update({
    region: process.env.AWS_REGION, // Region of DynamoDB
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Access key ID of IAM user with access to DynamoDB
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Secret access key of IAM user with access to DynamoDB
});

// Initialize S3 service
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Khởi tạo service S3
const dynamoDB = new AWS.DynamoDB.DocumentClient();


module.exports = { s3, dynamoDB };