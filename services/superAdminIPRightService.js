const superAdminIPRightRepository = require("../repositories/superAdminIPRightRepository");

class SuperAdminIPRightService{

    /* ------------------- Handle Get IPRight By SuperAdmin Id ------------------- */

    static async handleGetIPRightBySuperAdminId({ superAdminId, iPRightTitle }){

        try {

            const getIPRight = await superAdminIPRightRepository.handleGetIPRightBySuperAdminId({ superAdminId, iPRightTitle });

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed ipright",
                data: {
                    getIPRight: getIPRight
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getIPRight: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get IPRight By SuperAdmin Id ------------------- */


    /* ------------------- Handle Get IPRight By Id ------------------- */

    static async handleGetIPRightById({ id }){

        try {

            const getIPRight = await superAdminIPRightRepository.handleGetIPRightById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    getIPRight: getIPRight,
                },
            };

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getIPRight: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get IPRight By Id ------------------- */

};

module.exports = SuperAdminIPRightService;