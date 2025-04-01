const nameRegex = /^[a-zA-Z0-9\s]+$/;
const typeRegex = /^[a-zA-Z0-9\s]+$/;
const semesterRegex = /^[0-9]+$/;
const facultyRegex = /^[a-zA-Z\s]+$/;
const checkEmpty = payload => {
  // Kiểm tra xem payload có thuốc tính nào bị rỗng không
  const { tenMonHoc, loai, hocKy, khoa } = payload;
  if (!tenMonHoc || !loai || !hocKy || !khoa) {
    return true;
  }
  return false;
};

module.exports = {
  validatePayload: payload => {
    const { tenMonHoc, loai, hocKy, khoa } = payload;
    const errors = [];

    if (checkEmpty(payload)) {
      errors.push("All fields are required");
    }

    if (!semesterRegex.test(hocKy)) {
        errors.push("Semester must be a number");
        }

    if (!nameRegex.test(tenMonHoc)) {
      errors.push("Name must be a string");
    }

    if (!typeRegex.test(loai)) {
      errors.push("Type must be a string");
    }

    if (!facultyRegex.test(khoa)) {
      errors.push("Faculty must be a string");
    }

    if (errors?.length > 0) {
      return errors;
    }

    return null;
  },
};
