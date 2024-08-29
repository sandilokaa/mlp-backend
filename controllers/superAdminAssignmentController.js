const superAdminAssignmentService = require("../services/superAdminAssignmentService");

/* ------------------- Handle Get Assignment By Super Admin Id ------------------- */

const handleGetAssignmentBySuperAdminId = async(req, res) => {

    const superAdminId = req.superadmin.id;

    const { assignmentName, assignmentPeriod, academicYear } = req.query;

    const { status, status_code, message, data} = await superAdminAssignmentService.handleGetAssignmentBySuperAdminId({ superAdminId, assignmentName, assignmentPeriod, academicYear });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Assignment By Super Admin Id ------------------- */


/* ------------------- Handle Get Assignment By Id ------------------- */

const handleGetAssignmentById = async(req, res) => {

    const { id } = req.params;

    const { status, status_code, message, data} = await superAdminAssignmentService.handleGetAssignmentById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Assignment By Id ------------------- */


module.exports = {
    handleGetAssignmentBySuperAdminId,
    handleGetAssignmentById
}
