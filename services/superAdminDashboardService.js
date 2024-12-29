const superAdminDashboardRepository = require("../repositories/superAdminDashboardRepository");

class SuperAdminDashboardService {

    /* ------------------- Handle Get All Publication ------------------- */

    static async handleGetAllPublicationDashboard() {
        try {

            const getPublication = await superAdminDashboardRepository.handleGetAllPublicationDashboard();

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
    }

    /* ------------------- End Handle Get All Publication ------------------- */
    
    
    /* ------------------- Handle Get All Patent ------------------- */

    static async handleGetAllPatentDashboard() {
        try {

            const getPatent = await superAdminDashboardRepository.handleGetAllPatentDashboard();

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
    }

    /* ------------------- End Handle Get All Patent ------------------- */
    
    
    /* ------------------- Handle Get All IPRight ------------------- */

    static async handleGetAllIPRightDashboard() {
        try {

            const getIPRight = await superAdminDashboardRepository.handleGetAllIPRightDashboard();

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
    }

    /* ------------------- End Handle Get All IPRight ------------------- */
    
    
    /* ------------------- Handle Get All Research ------------------- */

    static async handleGetAllResearchDashboard() {
        try {

            const getResearch = await superAdminDashboardRepository.handleGetAllResearchDashboard();

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed research",
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
    }

    /* ------------------- End Handle Get All Research ------------------- */
    
    
    /* ------------------- Handle Get All Devotion ------------------- */

    static async handleGetAllDevotionDashboard() {
        try {

            const getDevotion = await superAdminDashboardRepository.handleGetAllDevotionDashboard();

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed devotion",
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
    }

    /* ------------------- End Handle Get All Devotion ------------------- */

};

module.exports = SuperAdminDashboardService;