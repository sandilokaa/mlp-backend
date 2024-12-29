const superAdminIPRightService = require("../services/superAdminIPRightService");


/* ------------------- Handle Get IPRight By SuperAdmin Id ------------------- */

const handleGetIPRightBySuperAdminId = async(req, res) => {

    const superAdminId = req.superadmin.id;

    const { iPRightTitle } = req.query;

    const { status, status_code, message, data} = await superAdminIPRightService.handleGetIPRightBySuperAdminId({ superAdminId, iPRightTitle });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

    
};

/* ------------------- End Handle Get IPRight By SuperAdmin Id ------------------- */


/* ------------------- Handle Get IPRight By Id ------------------- */

const handleGetIPRightById = async(req, res) => {

    const { id } = req.params;

    const { status, status_code, message, data} = await superAdminIPRightService.handleGetIPRightById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get IPRight By Id ------------------- */

module.exports = {
    handleGetIPRightBySuperAdminId,
    handleGetIPRightById
}