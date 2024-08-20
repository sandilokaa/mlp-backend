const superAdminGiveValueService = require("../services/superAdminGiveValueService");


/* ------------------- Handle Update Devotion Value ------------------- */

const handleUpdateDevotionValue = async(req, res) => {

    const { id } = req.params;

    const superAdminId = req.superadmin.id;

    const { devotionValue } = req.body;

    const { status, status_code, message, data} = await superAdminGiveValueService.handleUpdateDevotionValue({ superAdminId, id, devotionValue });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Update Devotion Value ------------------- */


/* ------------------- Handle Update Assignment Value ------------------- */

const handleUpdateAssignmentValue = async(req, res) => {

    const { id } = req.params;

    const superAdminId = req.superadmin.id;

    const { assignmentValue } = req.body;

    const { status, status_code, message, data} = await superAdminGiveValueService.handleUpdateAssignmentValue({ superAdminId, id, assignmentValue });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Update Assignment Value ------------------- */


module.exports = { handleUpdateDevotionValue, handleUpdateAssignmentValue };