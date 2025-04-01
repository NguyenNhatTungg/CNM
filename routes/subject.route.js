// Import thư viện express
const express = require("express"); // import express
const router = express.Router();
const upload = require("../middleware/upload"); // import middleware upload
const subjectController = require("../controllers/index"); // import controller

router.get("/", subjectController.get); // API endpoint lấy tất cả các subject
// router.get("/:id", subjectController.getOne); // API endpoint lấy thông tin của subject dựa vào id
router.post("/save", upload, subjectController.post); // API endpoint thêm mới subject
router.post("/delete/:id", subjectController.delete); // API endpoint xóa subject dựa vào id

module.exports = router;
