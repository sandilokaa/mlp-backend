const lecturerIPRightService = require("../services/lecturerIPRightService");


/* ------------------- Handle Get IPRight By Lecturer Id ------------------- */

const handleGetIPRightByLecturerId = async(req, res) => {

    const lecturerId = req.lecturer.id;

    const { status, status_code, message, data} = await lecturerIPRightService.handleGetIPRightByLecturerId({ lecturerId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

    
};

/* ------------------- End Handle Get IPRight By Lecturer Id ------------------- */


/* ------------------- Handle Get IPRight By Id ------------------- */

const handleGetIPRightById = async(req, res) => {

    const { id } = req.params;

    const { status, status_code, message, data} = await lecturerIPRightService.handleGetIPRightById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get IPRight By Id ------------------- */


/* ------------------- Handle Lecturer Create IPRight ------------------- */

const handleLecturerCreateIPRight = async(req, res) => {

    const lecturerId = req.lecturer.id;

    let ipRightFile = "";

    if (req.file) {
        ipRightFile = req.file.path;
    }

    const { 
        superAdminId,  
        iPRightTitle,
        iPRightDate,
        registrationNumber,
        description
    } = req.body;

    const { status, status_code, message, data} = await lecturerIPRightService.handleLecturerCreateIPRight({
        superAdminId,
        lecturerId,
        iPRightTitle,
        iPRightDate,
        registrationNumber,
        description,
        ipRightFile
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Create IPRight ------------------- */


/* ------------------- Handle Lecturer Update IPRight ------------------- */

const handleLecturerUpdateIPRight = async(req, res) => {

    const { id } = req.params;

    const lecturerId = req.lecturer.id;

    let ipRightFile = "";

    if (req.file) {
        ipRightFile = req.file.path;
    }

    const { 
        superAdminId,  
        iPRightTitle,
        iPRightDate,
        registrationNumber,
        description
    } = req.body;

    const { status, status_code, message, data} = await lecturerIPRightService.handleLecturerUpdateIPRight({
        id,
        superAdminId,
        lecturerId, 
        iPRightTitle,
        iPRightDate,
        registrationNumber,
        description,
        ipRightFile
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Update IPRight ------------------- */


/* ------------------- Handle Lecturer Delete IPRight ------------------- */

const handleLecturerDeleteIPRight = async(req, res) => {

    const { id } = req.params;

    const lecturerId = req.lecturer.id;

    const { status, status_code, message, data} = await lecturerIPRightService.handleLecturerDeleteIPRight({ id, lecturerId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Delete IPRight ------------------- */


module.exports = { 
    handleLecturerCreateIPRight,
    handleGetIPRightById,
    handleGetIPRightByLecturerId,
    handleLecturerUpdateIPRight,
    handleLecturerDeleteIPRight
};