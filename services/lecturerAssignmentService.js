const lecturerAssignmentRepository = require("../repositories/lecturerAssignmentRepository");
const lecturerRepository = require("../repositories/lecturerRepository");
const fileRemove = require("../utils/fileRemove");

class LecturerAssignmentService{

    /* ------------------- Handle Get Assignment By Lecturer Id ------------------- */

    static async handleGetAssignmentByLecturerId({ lecturerId, assignmentPeriod, academicYear }){

        try {

            const getAssignment = await lecturerAssignmentRepository.handleGetAssignmentByLecturerId({ lecturerId, assignmentPeriod, academicYear });

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed assignment",
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

    /* ------------------- End Handle Get Assignment By Lecturer Id ------------------- */


    /* ------------------- Handle Get Assignment By Id ------------------- */

    static async handleGetAssignmentById({ id }){

        try {

            const getAssignment = await lecturerAssignmentRepository.handleGetAssignmentById({ id });

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


    /* ------------------- Handle Lecturer Create Assignment ------------------- */

    static async handleLecturerCreateAssignment({
        superAdminId,
        lecturerId, 
        assignmentName,
        assignmentType,
        assignmentDescription,
        assignmentValue,
        assignmentFile,
        assignmentPeriod,
        academicYear
    }) {

        try {
            
            // ------------------------- Payload Validation ------------------------- //

            if (!assignmentName) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Name is required!",
                    data: {
                        assignmentCreated: null,
                    },
                };
            }

            if (!assignmentType) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Type is required!",
                    data: {
                        assignmentCreated: null,
                    },
                };
            }

            if (!assignmentDescription) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Description is required!",
                    data: {
                        assignmentCreated: null,
                    },
                };
            }
            
            if (!assignmentPeriod) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Period is required!",
                    data: {
                        assignmentCreated: null,
                    },
                };
            }
            
            if (!academicYear) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Academic year is required!",
                    data: {
                        assignmentCreated: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //

            const getLecturer = await lecturerRepository.handleGetLecturerById({id: lecturerId});

            const assignmentCreated = await lecturerAssignmentRepository.handleLecturerCreateAssignment({
                superAdminId: getLecturer.superAdminId,
                lecturerId, 
                assignmentName,
                assignmentType,
                assignmentDescription,
                assignmentValue,
                assignmentFile,
                assignmentPeriod,
                academicYear
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created assignment",
                data: {
                    assignmentCreated: assignmentCreated
                },
            }

        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    assignmentCreated: null
                },
            }

        }

    };

    /* ------------------- End Handle Lecturer Create Assignment ------------------- */


    /* ------------------- Handle Lecturer Update Assignment ------------------- */

    static async handleLecturerUpdateAssignment({
        id,
        superAdminId,
        lecturerId, 
        assignmentName,
        assignmentType,
        assignmentDescription,
        assignmentValue,
        assignmentFile,
        assignmentPeriod,
        academicYear
    }) {

        try {

            const getAssignment = await lecturerAssignmentRepository.handleGetAssignmentById({ id });

            if (getAssignment.id == id) {

                if (!superAdminId){
                    superAdminId = getAssignment.superAdminId;
                }

                if (!lecturerId){
                    lecturerId = getAssignment.lecturerId;
                }

                if (!assignmentName){
                    assignmentName = getAssignment.assignmentName;
                }

                if (!assignmentType){
                    assignmentType = getAssignment.assignmentType;
                }

                if (!assignmentDescription){
                    assignmentDescription = getAssignment.assignmentDescription;
                }

                if (!assignmentValue){
                    assignmentValue = getAssignment.assignmentValue;
                }
                
                if (!assignmentPeriod){
                    assignmentPeriod = getAssignment.assignmentPeriod;
                }
                
                if (!academicYear){
                    academicYear = getAssignment.academicYear;
                }

                if (!assignmentFile){
                    assignmentFile = getAssignment.assignmentFile;
                } else {
                    fileRemove(getAssignment.assignmentFile)
                }

            }

            const updatedAssignment = await lecturerAssignmentRepository.handleLecturerUpdateAssignment({
                id,
                superAdminId,
                lecturerId, 
                assignmentName,
                assignmentType,
                assignmentDescription,
                assignmentValue,
                assignmentFile,
                assignmentPeriod,
                academicYear
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    updatedAssignment: updatedAssignment
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updatedAssignment: null,
                },
            };

        }

    };

    /* ------------------- End Handle Lecturer Update Assignment ------------------- */


    /* ------------------- Handle Lecturer Delete Assignment ------------------- */

    static async handleLecturerDeleteAssignment({ id, lecturerId }) {

        try {

            const getAssignment = await lecturerAssignmentRepository.handleGetAssignmentById({ id });

            if (getAssignment.lecturerId == lecturerId) {

                const deletedAssignment = await lecturerAssignmentRepository.handleLecturerDeleteAssignment({ id });

                fileRemove(getAssignment.assignmentFile);

                return {
                    status: true,
                    status_code: 201,
                    message: "Data deleted successfully",
                    data: {
                        deletedAssignment: deletedAssignment
                    },
                };

            } else {

                return {
                    status: false,
                    status_code: 401,
                    message: "Resource Unauthorized",
                    data: {
                        deletedAssignment: null,
                    },
                }

            }
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    deletedAssignment: null,
                },
            };

        }

    };

    /* ------------------- End Handle Lecturer Delete Devotion ------------------- */

};

module.exports = LecturerAssignmentService;