const lecturerService = require("../services/lecturerService");


/* ------------------- Handle Update Profile Lecturer ------------------- */

const handleUpdateProfileLecturer = async(req, res) => {

    const { id } = req.params;

    const lecturerId = req.lecturer.id;

    const { 
        name, 
        email, 
        password,
        role,
        nip,
        major,
        address,
        gender,
        phoneNumber,
        placeOfBirth,
        dateOfBirth,
        bachelor,
        magister,
        doctor 
    } = req.body;

    const { status, status_code, message, data} = await lecturerService.handleUpdateProfileLecturer({
        id,
        lecturerId,
        name, 
        email, 
        password,
        role,
        nip,
        major,
        address,
        gender,
        phoneNumber,
        placeOfBirth,
        dateOfBirth,
        bachelor,
        magister,
        doctor 
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Update Profile Lecturer ------------------- */


/* ------------------- Handle Lecturer Create Research ------------------- */

const handleLecturerCreateResearch = async(req, res) => {

    const lecturerId = req.lecturer.id;

    let researchFile = "";

    if (req.file) {
        researchFile = req.file.path;
    }

    const { superAdminId, roadmapId, title, period, ta, category, value } = req.body;

    const { status, status_code, message, data} = await lecturerService.handleLecturerCreateResearch({
        superAdminId,
        roadmapId,
        lecturerId,
        title,
        period,
        ta,
        category,
        researchFile,
        value
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Create Research ------------------- */


/* ------------------- Handle Get Research By Lecturer Id ------------------- */

const handleGetResearchByLecturerId = async(req, res) => {

    const lecturerId = req.lecturer.id;

    const { status, status_code, message, data} = await lecturerService.handleGetResearchByLecturerId({ lecturerId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Research By Lecturer Id ------------------- */


/* ------------------- Handle Lecturer Update Research ------------------- */

const handleLecturerUpdateResearch = async(req, res) => {

    const { id } = req.params;

    const lecturerId = req.lecturer.id;

    let researchFile = "";

    if (req.file) {
        researchFile = req.file.path;
    }

    const { superAdminId, title, period, ta, category } = req.body;

    const { status, status_code, message, data} = await lecturerService.handleLecturerUpdateResearch({
        id,
        superAdminId,
        lecturerId,
        title,
        period,
        ta,
        category,
        researchFile
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Update Research ------------------- */


/* ------------------- Handle Lecturer Delete Research ------------------- */

const handleLecturerDeleteResearch = async(req, res) => {

    const { id } = req.params;

    const lecturerId = req.lecturer.id;

    const { status, status_code, message, data} = await lecturerService.handleLecturerDeleteResearch({ id, lecturerId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Delete Research ------------------- */


/* ------------------- Handle Get Detail Lecturer ------------------- */

const handleGetDetailLecturer = async(req, res) => {

    const lecturerId = req.lecturer.id;

    const { status, status_code, message, data} = await lecturerService.handleGetDetailLecturer({ lecturerId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Detail Lecturer ------------------- */


/* ------------------- Handle Get Research By Id ------------------- */

const handleGetResearchById = async(req, res) => {

    const { id } = req.params;

    const { status, status_code, message, data} = await lecturerService.handleGetResearchById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Research By Id ------------------- */


module.exports = { 
    handleGetResearchByLecturerId,
    handleUpdateProfileLecturer,
    handleLecturerCreateResearch,
    handleLecturerUpdateResearch,
    handleLecturerDeleteResearch,
    handleGetDetailLecturer,
    handleGetResearchById
};