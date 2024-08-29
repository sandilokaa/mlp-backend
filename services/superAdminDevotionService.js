const superAdminDevotionRepository = require("../repositories/superAdminDevotionRepository");

class SuperAdminDevotionService {

    /* ------------------- Handle Get Devotion By Lecturer Id ------------------- */

    static async handleGetDevotionBySuperAdminId({ superAdminId, devotionName, devotionPeriod, academicYear }){

        try {

            const getDevotion = await superAdminDevotionRepository.handleGetDevotionBySuperAdminId({ superAdminId, devotionName, devotionPeriod, academicYear });

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed data",
                data: {
                    getDevotion: getDevotion
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getDevotion: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get Devotion By Super Admin Id ------------------- */


    /* ------------------- Handle Get Devotion By Id ------------------- */

    static async handleGetDevotionById({ id }){

        try {

            const getDevotion = await superAdminDevotionRepository.handleGetDevotionById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    getDevotion: getDevotion,
                },
            };

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getDevotion: null,
                },
            };

        }

    };
    
    /* ------------------- End Handle Get Devotion By Id ------------------- */

};

module.exports = SuperAdminDevotionService;