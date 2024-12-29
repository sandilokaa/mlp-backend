const superAdminPatentRepository = require("../repositories/superAdminPatentRepository");

class SuperAdminPatentService{

    /* ------------------- Handle Get Patent By SuperAdmin Id ------------------- */

    static async handleGetPatentBySuperAdminId({ superAdminId, patentTitle }){

        try {

            const getPatent = await superAdminPatentRepository.handleGetPatentBySuperAdminId({ superAdminId, patentTitle });

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed patent",
                data: {
                    getPatent: getPatent
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getPatent: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get Patent By SuperAdmin Id ------------------- */


    /* ------------------- Handle Get Patent By Id ------------------- */

    static async handleGetPatentById({ id }){

        try {

            const getPatent = await superAdminPatentRepository.handleGetPatentById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    getPatent: getPatent,
                },
            };

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getPatent: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get Patent By Id ------------------- */

};

module.exports = SuperAdminPatentService;