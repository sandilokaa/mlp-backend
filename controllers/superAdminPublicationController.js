const superAdminPublicationService = require("../services/superAdminPublicationService");


/* ------------------- Handle Get Publication By SuperAdmin Id ------------------- */

const handleGetPublicationBySuperAdminId = async(req, res) => {

    const superAdminId = req.superadmin.id;

    const { publicationTitle } = req.query;

    const { status, status_code, message, data} = await superAdminPublicationService.handleGetPublicationBySuperAdminId({ superAdminId, publicationTitle });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

    
};

/* ------------------- End Handle Get Publication By SuperAdmin Id ------------------- */


/* ------------------- Handle Get Publication By Id ------------------- */

const handleGetPublicationById = async(req, res) => {

    const { id } = req.params;

    const { status, status_code, message, data} = await superAdminPublicationService.handleGetPublicationById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Publication By Id ------------------- */

module.exports = {
    handleGetPublicationBySuperAdminId,
    handleGetPublicationById
}