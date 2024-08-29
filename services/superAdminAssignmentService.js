const superAdminAssignmentRepository = require("../repositories/superAdminAssignmentRepository");

class SuperAdminAssignmentService {

    /* ------------------- Handle Get Assignment By Lecturer Id ------------------- */

    static async handleGetAssignmentBySuperAdminId({ superAdminId, assignmentName, assignmentPeriod, academicYear }){

        try {

            const getAssignment = await superAdminAssignmentRepository.handleGetAssignmentBySuperAdminId({ superAdminId, assignmentName, assignmentPeriod, academicYear });

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed data",
                data: {
                    getAssignment: getAssignment
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getAssignment: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get Assignment By Super Admin Id ------------------- */


    /* ------------------- Handle Get Assignment By Id ------------------- */

    static async handleGetAssignmentById({ id }){

        try {

            const getAssignment = await superAdminAssignmentRepository.handleGetAssignmentById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    getAssignment: getAssignment,
                },
            };

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getAssignment: null,
                },
            };

        }

    };
    
    /* ------------------- End Handle Get Assignment By Id ------------------- */

};

module.exports = SuperAdminAssignmentService;