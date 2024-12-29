const lecturerDevotionRepository = require("../repositories/lecturerDevotionRepository");
const lecturerRepository = require("../repositories/lecturerRepository");
const fileRemove = require("../utils/fileRemove");

class LecturerDevotionService {


    /* ------------------- Handle Get Devotion By Lecturer Id ------------------- */

        static async handleGetDevotionByLecturerId({ lecturerId, devotionPeriod, academicYear }){

            try {
    
                const getDevotion = await lecturerDevotionRepository.handleGetDevotionByLecturerId({ lecturerId, devotionPeriod, academicYear });
    
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
    
        };
    
    /* ------------------- End Handle Get Devotion By Lecturer Id ------------------- */


    /* ------------------- Handle Get Devotion By Id ------------------- */

    static async handleGetDevotionById({ id }){

        try {

            const getDevotion = await lecturerDevotionRepository.handleGetDevotionById({ id });

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


    /* ------------------- Handle Lecturer Create Devotion ------------------- */

    static async handleLecturerCreateDevotion({
        superAdminId,
        lecturerId,
        devotionName,
        devotionRole,
        devotionPeriod,
        academicYear,
        devotionDescription,
        devotionFile
    }) {

        try {
            
            // ------------------------- Payload Validation ------------------------- //

            if (!devotionName) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Name is required!",
                    data: {
                        devotionCreated: null,
                    },
                };
            }

            if (!devotionRole) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Role is required!",
                    data: {
                        devotionCreated: null,
                    },
                };
            }

            if (!devotionPeriod) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Period is required!",
                    data: {
                        devotionCreated: null,
                    },
                };
            }

            if (!academicYear) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Academic Year is required!",
                    data: {
                        devotionCreated: null,
                    },
                };
            }

            if (!devotionDescription) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Description is required!",
                    data: {
                        devotionCreated: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //

            const getLecturer = await lecturerRepository.handleGetLecturerById({id: lecturerId});

            const devotionCreated = await lecturerDevotionRepository.handleLecturerCreateDevotion({
                superAdminId: getLecturer.superAdminId,
                lecturerId,
                devotionName,
                devotionRole,
                devotionPeriod,
                academicYear,
                devotionDescription,
                devotionFile
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created devotion",
                data: {
                    devotionCreated: devotionCreated
                },
            }

        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    devotionCreated: null
                },
            }

        }

    };

    /* ------------------- End Handle Lecturer Create Devotion ------------------- */


    /* ------------------- Handle Lecturer Update Devotion ------------------- */

    static async handleLecturerUpdateDevotion({
        id,
        superAdminId,
        lecturerId,
        devotionName,
        devotionRole,
        devotionPeriod,
        academicYear,
        devotionDescription,
        devotionFile
    }) {

        try {

            const getDevotion = await lecturerDevotionRepository.handleGetDevotionById({ id });

            if (getDevotion.id == id) {

                if (!superAdminId){
                    superAdminId = getDevotion.superAdminId;
                }

                if (!lecturerId){
                    lecturerId = getDevotion.lecturerId;
                }

                if (!devotionName){
                    devotionName = getDevotion.devotionName;
                }

                if (!devotionRole){
                    devotionRole = getDevotion.devotionRole;
                }

                if (!devotionPeriod){
                    devotionPeriod = getDevotion.devotionPeriod;
                }

                if (!academicYear){
                    academicYear = getDevotion.academicYear;
                }
                
                if (!devotionDescription){
                    devotionDescription = getDevotion.devotionDescription;
                }

                if (!devotionFile){
                    devotionFile = getDevotion.devotionFile;
                } else {
                    fileRemove(getDevotion.devotionFile)
                }

            }

            const updatedDevotion = await lecturerDevotionRepository.handleLecturerUpdateDevotion({
                id,
                superAdminId,
                lecturerId,
                devotionName,
                devotionRole,
                devotionPeriod,
                academicYear,
                devotionDescription,
                devotionFile
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    updatedDevotion: updatedDevotion
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updatedDevotion: null,
                },
            };

        }

    };

    /* ------------------- End Handle Lecturer Update Devotion ------------------- */


    /* ------------------- Handle Lecturer Delete Devotion ------------------- */

    static async handleLecturerDeleteDevotion({ id, lecturerId }) {

        try {

            const getDevotion = await lecturerDevotionRepository.handleGetDevotionById({ id });

            if (getDevotion.lecturerId == lecturerId) {

                const deletedDevotion = await lecturerDevotionRepository.handleLecturerDeleteDevotion({ id });

                fileRemove(getDevotion.devotionFile);

                return {
                    status: true,
                    status_code: 201,
                    message: "Data deleted successfully",
                    data: {
                        deletedDevotion: deletedDevotion
                    },
                };

            } else {

                return {
                    status: false,
                    status_code: 401,
                    message: "Resource Unauthorized",
                    data: {
                        deletedDevotion: null,
                    },
                }

            }
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    deletedDevotion: null,
                },
            };

        }

    };

    /* ------------------- End Handle Lecturer Delete Devotion ------------------- */


};

module.exports = LecturerDevotionService;