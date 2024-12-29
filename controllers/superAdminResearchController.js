const superAdminResearchService = require("../services/superAdminResearchService");

/* ------------------- Handle Get Research By Super Admin Id ------------------- */

const handleGetResearchBySuperAdminId = async(req, res) => {

    const superAdminId = req.superadmin.id;

    const { researchName, researchPeriod, academicYear } = req.query;

    const { status, status_code, message, data} = await superAdminResearchService.handleGetResearchBySuperAdminId({ superAdminId, researchName, researchPeriod, academicYear });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Research By Super Admin Id ------------------- */


/* ------------------- Handle Get Research By Id ------------------- */

const handleGetResearchById = async(req, res) => {

    const { id } = req.params;

    const { status, status_code, message, data} = await superAdminResearchService.handleGetResearchById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Research By Id ------------------- */


module.exports = {
    handleGetResearchBySuperAdminId,
    handleGetResearchById
}
