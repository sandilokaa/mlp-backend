const lecturerPublicationService = require("../services/lecturerPublicationService");


/* ------------------- Handle Get Publication By Lecturer Id ------------------- */

const handleGetPublicationByLecturerId = async(req, res) => {

    const lecturerId = req.lecturer.id;

    const { status, status_code, message, data} = await lecturerPublicationService.handleGetPublicationByLecturerId({ lecturerId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

    
};

/* ------------------- End Handle Get Publication By Lecturer Id ------------------- */


/* ------------------- Handle Get Publication By Id ------------------- */

const handleGetPublicationById = async(req, res) => {

    const { id } = req.params;

    const { status, status_code, message, data} = await lecturerPublicationService.handleGetPublicationById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Publication By Id ------------------- */


/* ------------------- Handle Lecturer Create Publication ------------------- */

const handleLecturerCreatePublication = async(req, res) => {

    const lecturerId = req.lecturer.id;

    let publicationFile = "";

    if (req.file) {
        publicationFile = req.file.path;
    }

    const { 
        superAdminId,  
        publicationTitle,
        publicationType,
        journalName,
        urlPublication
    } = req.body;

    const { status, status_code, message, data} = await lecturerPublicationService.handleLecturerCreatePublication({
        superAdminId,
        lecturerId, 
        publicationTitle,
        publicationType,
        journalName,
        urlPublication,
        publicationFile
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Create Publication ------------------- */


/* ------------------- Handle Lecturer Update Publication ------------------- */

const handleLecturerUpdatePublication = async(req, res) => {

    const { id } = req.params;

    const lecturerId = req.lecturer.id;

    let publicationFile = "";

    if (req.file) {
        publicationFile = req.file.path;
    }

    const { 
        superAdminId,  
        publicationTitle,
        publicationType,
        journalName,
        urlPublication,
    } = req.body;

    const { status, status_code, message, data} = await lecturerPublicationService.handleLecturerUpdatePublication({
        id,
        superAdminId,
        lecturerId, 
        publicationTitle,
        publicationType,
        journalName,
        urlPublication,
        publicationFile
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Update Publication ------------------- */


/* ------------------- Handle Lecturer Delete Publication ------------------- */

const handleLecturerDeletePublication = async(req, res) => {

    const { id } = req.params;

    const lecturerId = req.lecturer.id;

    const { status, status_code, message, data} = await lecturerPublicationService.handleLecturerDeletePublication({ id, lecturerId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Delete Publication ------------------- */


module.exports = { 
    handleLecturerCreatePublication,
    handleGetPublicationById,
    handleGetPublicationByLecturerId,
    handleLecturerUpdatePublication,
    handleLecturerDeletePublication
};