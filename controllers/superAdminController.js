const superAdminService = require("../services/superAdminService");


/* ------------------- Handle Get Detail SuperAdmin Data ------------------- */

const handleGetDetailSuperAdmin = async(req, res) => {

    const superAdminId = req.superadmin.id;

    const { status, status_code, message, data} = await superAdminService.handleGetDetailSuperAdmin({ superAdminId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Detail SuperAdmin Data ------------------- */


/* ------------------- Handle Update Profile Super Admin ------------------- */

const handleUpdateProfileSuperAdmin = async(req, res) => {

    const { id } = req.params;

    const superAdminId = req.superadmin.id;

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

    const { status, status_code, message, data} = await superAdminService.handleUpdateProfileSuperAdmin({
        id,
        superAdminId,
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

/* ------------------- End Handle Update Profile Super Admin ------------------- */


/* ------------------- Handle Create Lecturer By  Super Admin ------------------- */

const handleCreateLecturer = async(req, res) => {

    const superAdminId = req.superadmin;

    const { name, email, password } = req.body;

    const { status, status_code, message, data} = await superAdminService.handleCreateLecturer({
        superAdminId:superAdminId.id,
        name, 
        email, 
        password,
        groupName:superAdminId.groupName,
        role:'lecturer'
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Create Lecturer By  Super Admin ------------------- */


/* ------------------- Handle Get All Lecturer Group ------------------- */

const handleGetAllLecturerGroup = async(req, res) => {

    const { name, groupName, devotionPeriod, assignmentPeriod, academicYear } = req.query;

    const { status, status_code, message, data} = await superAdminService.handleGetAllLecturerGroup({ name, groupName, devotionPeriod, assignmentPeriod, academicYear });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get All Lecturer Group ------------------- */


/* ------------------- Handle Get Lecture Detail ------------------- */

const handleGetLecturerDetail = async(req, res) => {

    const { id } = req.params;

    const { devotionPeriod, assignmentPeriod, academicYear } = req.query;

    const { status, status_code, message, data} = await superAdminService.handleGetLecturerDetail({ id, devotionPeriod, assignmentPeriod, academicYear });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Lecture Detail ------------------- */


/* ------------------- Handle Get Delete Lecture Detail ------------------- */

const handleDeleteLectureById = async(req, res) => {

    const { id } = req.params;

    const superAdminId = req.superadmin.id;

    const { status, status_code, message, data} = await superAdminService.handleDeleteLectureById({ id, superAdminId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Delete Lecture Detail ------------------- */



module.exports = { 
    handleUpdateProfileSuperAdmin,
    handleCreateLecturer,
    handleGetAllLecturerGroup,
    handleGetDetailSuperAdmin,
    handleGetLecturerDetail,
    handleDeleteLectureById
};
