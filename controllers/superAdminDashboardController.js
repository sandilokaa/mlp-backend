const superAdminDashboardService = require("../services/superAdminDashboardService");

/* ------------------- Handle Get All Publication ------------------- */

const handleGetAllPublicationDashboard = async(req, res) => {

    const { status, status_code, message, data} = await superAdminDashboardService.handleGetAllPublicationDashboard();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get All Publication ------------------- */


/* ------------------- Handle Get All Patent ------------------- */

const handleGetAllPatentDashboard = async(req, res) => {

    const { status, status_code, message, data} = await superAdminDashboardService.handleGetAllPatentDashboard();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get All Patent ------------------- */


/* ------------------- Handle Get All IPRight ------------------- */

const handleGetAllIPRightDashboard = async(req, res) => {

    const { status, status_code, message, data} = await superAdminDashboardService.handleGetAllIPRightDashboard();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get All IPRight ------------------- */


/* ------------------- Handle Get All Research ------------------- */

const handleGetAllResearchDashboard = async(req, res) => {

    const { status, status_code, message, data} = await superAdminDashboardService.handleGetAllResearchDashboard();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get All Research ------------------- */


/* ------------------- Handle Get All Devotion ------------------- */

const handleGetAllDevotionDashboard = async(req, res) => {

    const { status, status_code, message, data} = await superAdminDashboardService.handleGetAllDevotionDashboard();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get All Devotion ------------------- */


module.exports = {
    handleGetAllPublicationDashboard,
    handleGetAllPatentDashboard,
    handleGetAllIPRightDashboard,
    handleGetAllResearchDashboard,
    handleGetAllDevotionDashboard
}