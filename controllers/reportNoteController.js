const reportNoteService = require("../services/reportNoteService");


/* ------------------- Handle Create Report ------------------- */

const handleCreateReport = async(req, res) => {

    const superAdminId = req.superadmin.id;

    let reportFile = "";

    if (req.file) {
        reportFile = req.file.path;
    }

    const { reportName, reportPeriod, academicYear, reportStatus, reportType } = req.body;

    const { status, status_code, message, data} = await reportNoteService.handleCreateReport({ 
        superAdminId,
        reportName,
        reportPeriod,
        academicYear,
        reportStatus,
        reportType,
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

    const { reportPeriod, academicYear } = req.query;

    const { status, status_code, message, data} = await reportNoteService.handleGetAllReport({ superAdminId, reportPeriod, academicYear });

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

    const { reportName, reportPeriod, academicYear, reportStatus, reportType } = req.body;

    const { status, status_code, message, data} = await reportNoteService.handleUpdateReport({
        id,
        superAdminId,
        reportName,
        reportPeriod,
        academicYear,
        reportFile,
        reportType,
        reportStatus
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Update Report ------------------- */


/* ------------------- Handle Get All Report By Dean ------------------- */

const handleGetAllReportByDean = async(req, res) => {

    const { reportPeriod, academicYear } = req.query;

    const { status, status_code, message, data} = await reportNoteService.handleGetAllReportByDean({ reportPeriod, academicYear });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get All Report By Dean ------------------- */


/* ------------------- Handle Create Note ------------------- */

const handleCreateNote = async(req, res) => {

    const superAdminId = req.superadmin.id;

    const { note, reportId, reportStatus } = req.body;

    const { status, status_code, message, data} = await reportNoteService.handleCreateNote({
        reportId,
        superAdminId,
        note,
        reportStatus
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Create Note ------------------- */


/* ------------------- Handle Get Note By Report Id ------------------- */

const handleGetNoteByReportId = async(req, res) => {

    const { reportId } = req.params;

    const { status, status_code, message, data} = await reportNoteService.handleGetNoteByReportId({ reportId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Note By Report Id ------------------- */


/* ------------------- Handle Update Note Status By Id ------------------- */

const handleUpdateNoteStatus = async(req, res) => {

    const superAdminId = req.superadmin.id;
    
    const { reportStatus, note, reportId } = req.body;

    const { status, status_code, message, data} = await reportNoteService.handleUpdateNoteStatus({ superAdminId, reportStatus, note, reportId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Update Note Status By Id ------------------- */


module.exports = {
    handleCreateReport,
    handleGetAllReport,
    handleGetReportById,
    handleUpdateReport,
    handleGetAllReportByDean,
    handleCreateNote,
    handleGetNoteByReportId,
    handleUpdateNoteStatus
}