const superAdminPublicationRepository = require("../repositories/superAdminPublicationRepository");

class SuperAdminPublicationService{

    /* ------------------- Handle Get Publication By SuperAdmin Id ------------------- */

    static async handleGetPublicationBySuperAdminId({ superAdminId, publicationTitle }){

        try {

            const getPublication = await superAdminPublicationRepository.handleGetPublicationBySuperAdminId({ superAdminId, publicationTitle });

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed publication",
                data: {
                    getPublication: getPublication
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getPublication: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get Publication By SuperAdmin Id ------------------- */


    /* ------------------- Handle Get Publication By Id ------------------- */

    static async handleGetPublicationById({ id }){

        try {

            const getPublication = await superAdminPublicationRepository.handleGetPublicationById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    getPublication: getPublication,
                },
            };

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getPublication: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get Publication By Id ------------------- */

};

module.exports = SuperAdminPublicationService;