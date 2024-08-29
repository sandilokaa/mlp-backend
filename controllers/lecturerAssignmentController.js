const lecturerAssignmentService = require("../services/lecturerAssignmentService");


/* ------------------- Handle Get Assignment By Lecturer Id ------------------- */

const handleGetAssignmentByLecturerId = async(req, res) => {

    const lecturerId = req.lecturer.id;

    const { assignmentPeriod, academicYear } = req.query

    const { status, status_code, message, data} = await lecturerAssignmentService.handleGetAssignmentByLecturerId({ lecturerId, assignmentPeriod, academicYear });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Assignment By Lecturer Id ------------------- */


/* ------------------- Handle Get Assignment By Id ------------------- */

const handleGetAssignmentById = async(req, res) => {

    const { id } = req.params;

    const { status, status_code, message, data} = await lecturerAssignmentService.handleGetAssignmentById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Assignment By Id ------------------- */


/* ------------------- Handle Lecturer Create Assignment ------------------- */

const handleLecturerCreateAssignment = async(req, res) => {

    const lecturerId = req.lecturer.id;

    let assignmentFile = "";

    if (req.file) {
        assignmentFile = req.file.path;
    }

    const { 
        superAdminId,  
        assignmentName,
        assignmentType,
        assignmentDescription,
        assignmentValue,
        assignmentPeriod,
        academicYear
    } = req.body;

    const { status, status_code, message, data} = await lecturerAssignmentService.handleLecturerCreateAssignment({
        superAdminId,
        lecturerId, 
        assignmentName,
        assignmentType,
        assignmentDescription,
        assignmentValue,
        assignmentFile,
        assignmentPeriod,
        academicYear
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Create Assignment ------------------- */


/* ------------------- Handle Lecturer Update Assignment ------------------- */

const handleLecturerUpdateAssignment = async(req, res) => {

    const { id } = req.params;

    const lecturerId = req.lecturer.id;

    let assignmentFile = "";

    if (req.file) {
        assignmentFile = req.file.path;
    }

    const { 
        superAdminId,  
        assignmentName,
        assignmentType,
        assignmentDescription,
        assignmentValue,
        assignmentPeriod,
        academicYear
    } = req.body;

    const { status, status_code, message, data} = await lecturerAssignmentService.handleLecturerUpdateAssignment({
        id,
        superAdminId,
        lecturerId, 
        assignmentName,
        assignmentType,
        assignmentDescription,
        assignmentValue,
        assignmentFile,
        assignmentPeriod,
        academicYear
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Update Assignment ------------------- */


/* ------------------- Handle Lecturer Delete Assignment ------------------- */

const handleLecturerDeleteAssignment = async(req, res) => {

    const { id } = req.params;

    const lecturerId = req.lecturer.id;

    const { status, status_code, message, data} = await lecturerAssignmentService.handleLecturerDeleteAssignment({ id, lecturerId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Delete Assignment ------------------- */


module.exports = { 
    handleGetAssignmentByLecturerId,
    handleGetAssignmentById,
    handleLecturerCreateAssignment,
    handleLecturerUpdateAssignment,
    handleLecturerDeleteAssignment
};