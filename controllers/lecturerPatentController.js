const lecturerPatentService = require("../services/lecturerPatentService");


/* ------------------- Handle Get Patent By Lecturer Id ------------------- */

const handleGetPatentByLecturerId = async(req, res) => {

    const lecturerId = req.lecturer.id;

    const { status, status_code, message, data} = await lecturerPatentService.handleGetPatentByLecturerId({ lecturerId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

    
};

/* ------------------- End Handle Get Patent By Lecturer Id ------------------- */


/* ------------------- Handle Get Patent By Id ------------------- */

const handleGetPatentById = async(req, res) => {

    const { id } = req.params;

    const { status, status_code, message, data} = await lecturerPatentService.handleGetPatentById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Patent By Id ------------------- */


/* ------------------- Handle Lecturer Create Patent ------------------- */

const handleLecturerCreatePatent = async(req, res) => {

    const lecturerId = req.lecturer.id;

    let patentFile = "";

    if (req.file) {
        patentFile = req.file.path;
    }

    const { 
        superAdminId,  
        patentTitle,
        patentDate,
        registrationNumber,
        description
    } = req.body;

    const { status, status_code, message, data} = await lecturerPatentService.handleLecturerCreatePatent({
        superAdminId,
        lecturerId, 
        patentTitle,
        patentDate,
        registrationNumber,
        description,
        patentFile
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Create Patent ------------------- */


/* ------------------- Handle Lecturer Update Patent ------------------- */

const handleLecturerUpdatePatent = async(req, res) => {

    const { id } = req.params;

    const lecturerId = req.lecturer.id;

    let patentFile = "";

    if (req.file) {
        patentFile = req.file.path;
    }

    const { 
        superAdminId,  
        patentTitle,
        patentDate,
        registrationNumber,
        description
    } = req.body;

    const { status, status_code, message, data} = await lecturerPatentService.handleLecturerUpdatePatent({
        id,
        superAdminId,
        lecturerId, 
        patentTitle,
        patentDate,
        registrationNumber,
        description,
        patentFile
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Update Patent ------------------- */


/* ------------------- Handle Lecturer Delete Patent ------------------- */

const handleLecturerDeletePatent = async(req, res) => {

    const { id } = req.params;

    const lecturerId = req.lecturer.id;

    const { status, status_code, message, data} = await lecturerPatentService.handleLecturerDeletePatent({ id, lecturerId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Delete Patent ------------------- */


module.exports = { 
    handleLecturerCreatePatent,
    handleGetPatentById,
    handleGetPatentByLecturerId,
    handleLecturerUpdatePatent,
    handleLecturerDeletePatent
};