const lecturerDevotionService = require("../services/lecturerDevotionService");


/* ------------------- Handle Get Devotion By Lecturer Id ------------------- */

const handleGetDevotionByLecturerId = async(req, res) => {

    const lecturerId = req.lecturer.id;

    const { devotionPeriod, academicYear } = req.query;

    const { status, status_code, message, data} = await lecturerDevotionService.handleGetDevotionByLecturerId({ lecturerId, devotionPeriod, academicYear });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Devotion By Lecturer Id ------------------- */


/* ------------------- Handle Get Devotion By Id ------------------- */

const handleGetDevotionById = async(req, res) => {

    const { id } = req.params;

    const { status, status_code, message, data} = await lecturerDevotionService.handleGetDevotionById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Devotion By Id ------------------- */


/* ------------------- Handle Lecturer Create Devotion ------------------- */

const handleLecturerCreateDevotion = async(req, res) => {

    const lecturerId = req.lecturer.id;

    let devotionFile = "";

    if (req.file) {
        devotionFile = req.file.path;
    }

    const { 
        superAdminId,  
        devotionName,
        devotionRole,
        devotionPeriod,
        academicYear,
        devotionDescription
    } = req.body;

    const { status, status_code, message, data} = await lecturerDevotionService.handleLecturerCreateDevotion({
        superAdminId,
        lecturerId,
        devotionName,
        devotionRole,
        devotionPeriod,
        academicYear,
        devotionDescription,
        devotionFile
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Create Devotion ------------------- */


/* ------------------- Handle Lecturer Update Devotion ------------------- */

const handleLecturerUpdateDevotion = async(req, res) => {

    const { id } = req.params;

    const lecturerId = req.lecturer.id;

    let devotionFile = "";

    if (req.file) {
        devotionFile = req.file.path;
    }

    const { 
        superAdminId,
        devotionName,
        devotionRole,
        devotionPeriod,
        academicYear,
        devotionDescription
    } = req.body;

    const { status, status_code, message, data} = await lecturerDevotionService.handleLecturerUpdateDevotion({
        id,
        superAdminId,
        lecturerId,
        devotionName,
        devotionRole,
        devotionPeriod,
        academicYear,
        devotionDescription,
        devotionFile
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Update Devotion ------------------- */


/* ------------------- Handle Lecturer Delete Devotion ------------------- */

const handleLecturerDeleteDevotion = async(req, res) => {

    const { id } = req.params;

    const lecturerId = req.lecturer.id;

    const { status, status_code, message, data} = await lecturerDevotionService.handleLecturerDeleteDevotion({ id, lecturerId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Delete Devotion ------------------- */


module.exports = { 
    handleGetDevotionByLecturerId,
    handleGetDevotionById,
    handleLecturerCreateDevotion,
    handleLecturerUpdateDevotion,
    handleLecturerDeleteDevotion
};