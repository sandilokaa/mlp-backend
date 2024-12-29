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
        groupName,
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
        groupName,
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


/* ------------------- Handle Get All Lecturer Expertise Group ------------------- */

const handleGetAllLecturerExpertiseGroup = async(req, res) => {
    
    const { name, groupName, devotionPeriod, assignmentPeriod, academicYear  } = req.query;

    const { status, status_code, message, data} = await lecturerService.handleGetAllLecturerExpertiseGroup({ name, groupName, devotionPeriod, assignmentPeriod, academicYear  });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get All Lecturer Expertise Group ------------------- */


/* ------------------- Handle Get Lecturer Expertise Group By Id ------------------- */

const handleGetLecturerExpertiseGroupById = async(req, res) => {
    
    const { id } = req.params;

    const { devotionPeriod, assignmentPeriod, academicYear } = req.query;

    const { status, status_code, message, data} = await lecturerService.handleGetLecturerExpertiseGroupById({ id, devotionPeriod, assignmentPeriod, academicYear });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Lecturer Expertise Group By Id ------------------- */


module.exports = {
    handleUpdateProfileLecturer,
    handleGetDetailLecturer,
    handleGetAllLecturerExpertiseGroup,
    handleGetLecturerExpertiseGroupById
};