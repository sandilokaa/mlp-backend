const reportNoteService = require("../services/reportNoteService");


/* ------------------- Handle Create Report ------------------- */

const handleCreateReport = async(req, res) => {

    const superAdminId = req.superadmin.id;

    let reportFile = "";

    if (req.file) {
        reportFile = req.file.path;
    }

    const { reportTitle, period, ta, reportStatus } = req.body;

    const { status, status_code, message, data} = await reportNoteService.handleCreateReport({ 
        superAdminId,
        reportTitle,
        period,
        ta,
        reportStatus,
        reportFile
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Create Report ------------------- */


/* ------------------- Handle Get All Report ------------------- */

const handleGetAllReport = async(req, res) => {

    const superAdminId = req.superadmin.id;

    const { status, status_code, message, data} = await reportNoteService.handleGetAllReport({ superAdminId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get All Report ------------------- */


/* ------------------- Handle Get Report By Id ------------------- */

const handleGetReportById = async(req, res) => {

    const superAdminId = req.superadmin.id;

    const { id } = req.params;

    const { status, status_code, message, data} = await reportNoteService.handleGetReportById({ superAdminId, id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Report By Id ------------------- */


/* ------------------- Handle Update Report ------------------- */

const handleUpdateReport = async(req, res) => {

    const superAdminId = req.superadmin.id;

    const { id } = req.params;

    let reportFile = "";

    if (req.file) {
        reportFile = req.file.path;
    }

    const { reportTitle, period, ta, reportStatus } = req.body;

    const { status, status_code, message, data} = await reportNoteService.handleUpdateReport({
        id,
        superAdminId,
        reportTitle,
        period,
        ta,
        reportFile,
        reportStatus
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Update Report ------------------- */


module.exports = {
    handleCreateReport,
    handleGetAllReport,
    handleGetReportById,
    handleUpdateReport
}