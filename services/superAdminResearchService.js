const superAdminResearchRepository = require("../repositories/superAdminResearchRepository");

class SuperAdminResearchService {

    /* ------------------- Handle Get Research By Lecturer Id ------------------- */

    static async handleGetResearchBySuperAdminId({ superAdminId, researchName, researchPeriod, academicYear }){

        try {

            const getResearch = await superAdminResearchRepository.handleGetResearchBySuperAdminId({ superAdminId, researchName, researchPeriod, academicYear });

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed data",
                data: {
                    getResearch: getResearch
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getResearch: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get Research By Super Admin Id ------------------- */


    /* ------------------- Handle Get Research By Id ------------------- */

    static async handleGetResearchById({ id }){

        try {

            const getResearch = await superAdminResearchRepository.handleGetResearchById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    getResearch: getResearch,
                },
            };

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getResearch: null,
                },
            };

        }

    };
    
    /* ------------------- End Handle Get Research By Id ------------------- */

};

module.exports = SuperAdminResearchService;