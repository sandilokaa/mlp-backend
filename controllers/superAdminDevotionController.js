const superAdminDevotionService = require("../services/superAdminDevotionService");

/* ------------------- Handle Get Devotion By Super Admin Id ------------------- */

const handleGetDevotionBySuperAdminId = async(req, res) => {

    const superAdminId = req.superadmin.id;

    const { devotionName, devotionPeriod, academicYear } = req.query;

    const { status, status_code, message, data} = await superAdminDevotionService.handleGetDevotionBySuperAdminId({ superAdminId, devotionName, devotionPeriod, academicYear });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Devotion By Super Admin Id ------------------- */


/* ------------------- Handle Get Devotion By Id ------------------- */

const handleGetDevotionById = async(req, res) => {

    const { id } = req.params;

    const { status, status_code, message, data} = await superAdminDevotionService.handleGetDevotionById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Devotion By Id ------------------- */


module.exports = {
    handleGetDevotionBySuperAdminId,
    handleGetDevotionById
}
