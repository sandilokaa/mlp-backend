const superAdminPatentService = require("../services/superAdminPatentService");


/* ------------------- Handle Get Patent By SuperAdmin Id ------------------- */

const handleGetPatentBySuperAdminId = async(req, res) => {

    const superAdminId = req.superadmin.id;

    const { patentTitle } = req.query;

    const { status, status_code, message, data} = await superAdminPatentService.handleGetPatentBySuperAdminId({ superAdminId, patentTitle });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

    
};

/* ------------------- End Handle Get Patent By SuperAdmin Id ------------------- */


/* ------------------- Handle Get Patent By Id ------------------- */

const handleGetPatentById = async(req, res) => {

    const { id } = req.params;

    const { status, status_code, message, data} = await superAdminPatentService.handleGetPatentById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Patent By Id ------------------- */

module.exports = {
    handleGetPatentBySuperAdminId,
    handleGetPatentById
}