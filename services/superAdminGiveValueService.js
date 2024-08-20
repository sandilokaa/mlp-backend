const superAdminGiveValueRepository = require("../repositories/superAdminGiveValueRepository");

class SuperAdminGiveValueService {

    /* ------------------- Handle Update Devotion Value ------------------- */

    static async handleUpdateDevotionValue({ superAdminId, id, devotionValue }){

        try {

            const getDevotionValueById = await superAdminGiveValueRepository.handleGetDevotionValueById({ id });

            if (getDevotionValueById.id == id) {

                const updatedDevotionValue = await superAdminGiveValueRepository.handleUpdateDevotionValue({ superAdminId, id, devotionValue });
    
                return {
                    status: true,
                    status_code: 200,
                    message: "Data updated successfully!",
                    data: {
                        updatedDevotionValue: updatedDevotionValue,
                    },
                };

            }

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updatedDevotionValue: null,
                },
            };

        }

    };

    /* ------------------- End Handle Update Devotion Value ------------------- */
    
    
    /* ------------------- Handle Update Assignment Value ------------------- */

    static async handleUpdateAssignmentValue({ superAdminId, id, assignmentValue }){

        try {

            const getAssignmentValueById = await superAdminGiveValueRepository.handleGetAssignmentValueById({ id });

            if (getAssignmentValueById.id == id) {

                const updatedAssignmentValue = await superAdminGiveValueRepository.handleUpdateAssignmentValue({ superAdminId, id, assignmentValue });
    
                return {
                    status: true,
                    status_code: 200,
                    message: "Data updated successfully!",
                    data: {
                        updatedAssignmentValue: updatedAssignmentValue,
                    },
                };

            }

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updatedAssignmentValue: null,
                },
            };

        }

    };

    /* ------------------- End Handle Update Assignment Value ------------------- */

};

module.exports = SuperAdminGiveValueService;