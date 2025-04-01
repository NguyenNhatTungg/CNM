const SubjectModel = require("../models/index");
const Controller = {};
const { uploadFile } = require("../service/file.service");
const { validatePayload } = require("../utils/validate");

Controller.get = async (req, res) => {
  try {
    const data = await SubjectModel.getSubject();
    res.render("index", { data });
  } catch (error) {
    console.error("Error getting subject: ", error);
    res.status(500).send("Error getting subject");
  }
};

Controller.post = async (req, res) => {
  try {
    // const payload = {
      // tenMonHoc: req.body.name,
      // loai: req.body.course_type,
      // hocKy: req.body.semester,
      // khoa: req.body.department,
    // };

    // const validationErrors = validatePayload(payload);
    // if (validationErrors) {
    //   const data = await SubjectModel.getSubject(); // Fetch existing data to re-render the page
    //   return res.render("index", { data, errors: validationErrors });
    // }

    const image = req.file;
    const imageUrl = await uploadFile(image);

    const newCourse = {
      stt: Number(req.body.id),
      tenMonHoc: req.body.name,
      loai: req.body.course_type,
      hocKy: req.body.semester,
      khoa: req.body.department,
      image: imageUrl,
    };

    console.log("newCourse: ", newCourse);

    await SubjectModel.createSubject(newCourse);
    res.redirect("/");
  } catch (error) {
    console.error("Error adding subject: ", error);
    res.status(500).send("Error adding subject");
  }
};

Controller.delete = async (req, res) => {
  try {
    const stt = Number(req.params.id);
    const subject = await SubjectModel.getOneSubject(stt);
    if (subject) {
      await SubjectModel.deleteSubject(
        subject.stt ?? subject.id,
        subject.tenMonHoc
      );
    }
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting subject: ", error);
    res.status(500).send("Error deleting subject");
  }
};

module.exports = Controller;