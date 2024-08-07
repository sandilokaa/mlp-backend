const superAdminService = require("../services/superAdminService");


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

    const { status, status_code, message, data} = await superAdminService.handleUpdateProfileSuperAdmin({
        id,
        superAdminId,
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

/* ------------------- End Handle Update Profile Super Admin ------------------- */


/* ------------------- Handle Create Lecturer By  Super Admin ------------------- */

const handleCreateLecturer = async(req, res) => {

    const superAdminId = req.superadmin.id;

    const { name, email, password } = req.body;

    const { status, status_code, message, data} = await superAdminService.handleCreateLecturer({
        superAdminId,
        name, 
        email, 
        password,
        role:'lecturer'
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Create Lecturer By  Super Admin ------------------- */


/* ------------------- Handle Get Lecturer By Super Admin Id ------------------- */

const handleGetLecturerBySuperAdminId = async(req, res) => {

    const { superAdminId } = req.params;

    const { status, status_code, message, data} = await superAdminService.handleGetLecturerBySuperAdminId({ superAdminId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Lecturer By Super Admin Id ------------------- */


/* ------------------- Handle Get Research By Super Admin Id ------------------- */

const handleGetResearchBySuperAdminId = async(req, res) => {

    const superAdminId = req.superadmin.id;

    const { name, category, title } = req.query;

    const { status, status_code, message, data} = await superAdminService.handleGetResearchBySuperAdminId({ superAdminId, name, category, title });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Research By Super Admin Id ------------------- */


/* ------------------- Handle Get All Research By Faculty Dean ------------------- */

const handleGetAllResearchByFacultyDean = async(req, res) => {

    const { status, status_code, message, data} = await superAdminService.handleGetAllResearchByFacultyDean();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get All Research By Faculty Dean ------------------- */


/* ------------------- Handle Get All Lecturer By Faculty Dean ------------------- */

const handleGetAllLecturerByFacultyDean = async(req, res) => {

    const { name } = req.query;

    const { status, status_code, message, data} = await superAdminService.handleGetAllLecturerByFacultyDean({ name });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get All Lecturer By Faculty Dean ------------------- */


/* ------------------- Handle Get SuperAdmin Data ------------------- */

const handleGetDetailSuperAdmin = async(req, res) => {

    const superAdminId = req.superadmin.id;

    const { status, status_code, message, data} = await superAdminService.handleGetDetailSuperAdmin({ superAdminId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get SuperAdmin Data ------------------- */


/* ------------------- Handle Update Research Value ------------------- */

const handleUpdateResearchValue = async(req, res) => {

    const { id } = req.params;

    const superAdminId = req.superadmin.id;

    const { value } = req.body;

    const { status, status_code, message, data} = await superAdminService.handleUpdateResearchValue({ superAdminId, id, value });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Update Research Value ------------------- */


module.exports = { 
    handleUpdateProfileSuperAdmin,
    handleCreateLecturer,
    handleGetLecturerBySuperAdminId,
    handleGetResearchBySuperAdminId,
    handleGetAllResearchByFacultyDean,
    handleGetAllLecturerByFacultyDean,
    handleGetDetailSuperAdmin,
    handleUpdateResearchValue 
};
