const lecturerIPRightRepository = require("../repositories/lecturerIPRightRepository");
const lecturerRepository = require("../repositories/lecturerRepository");
const fileRemove = require("../utils/fileRemove");

class LecturerIPRightService{

    /* ------------------- Handle Get IPRight By Lecturer Id ------------------- */

    static async handleGetIPRightByLecturerId({ lecturerId }){

        try {

            const getIPRight = await lecturerIPRightRepository.handleGetIPRightByLecturerId({ lecturerId });

            return {
                status: true,
                status_code: 201,
                message: "Data displayed successfully!",
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

    /* ------------------- End Handle Get IPRight By Lecturer Id ------------------- */


    /* ------------------- Handle Get IPRight By Id ------------------- */

    static async handleGetIPRightById({ id }){

        try {

            const getIPRight = await lecturerIPRightRepository.handleGetIPRightById({ id });

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


    /* ------------------- Handle Lecturer Create IPRight ------------------- */

    static async handleLecturerCreateIPRight({
        superAdminId,
        lecturerId,
        iPRightTitle,
        iPRightDate,
        registrationNumber,
        description,
        ipRightFile
    }) {

        try {
            
            // ------------------------- Payload Validation ------------------------- //

            if (!iPRightTitle) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Title is required!",
                    data: {
                        iPRightCreated: null,
                    },
                };
            }

            if (!iPRightDate) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Date is required!",
                    data: {
                        iPRightCreated: null,
                    },
                };
            }
            
            if (!registrationNumber) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Registration number is required!",
                    data: {
                        iPRightCreated: null,
                    },
                };
            }
            
            if (!description) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Description is required!",
                    data: {
                        iPRightCreated: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //

            const getLecturer = await lecturerRepository.handleGetLecturerById({id: lecturerId});

            const iPRightCreated = await lecturerIPRightRepository.handleLecturerCreateIPRight({
                superAdminId: getLecturer.superAdminId,
                lecturerId,
                iPRightTitle,
                iPRightDate,
                registrationNumber,
                description,
                ipRightFile
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created ip rights",
                data: {
                    iPRightCreated: iPRightCreated
                },
            }

        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    iPRightCreated: null
                },
            }

        }

    };

    /* ------------------- End Handle Lecturer Create IPRight ------------------- */


    /* ------------------- Handle Lecturer Update IPRight ------------------- */

    static async handleLecturerUpdateIPRight({
        id,
        superAdminId,
        lecturerId, 
        iPRightTitle,
        iPRightDate,
        registrationNumber,
        description,
        ipRightFile
    }) {

        try {

            const getIPRight = await lecturerIPRightRepository.handleGetIPRightById({ id });

            if (getIPRight.id == id) {

                if (!superAdminId){
                    superAdminId = getIPRight.superAdminId;
                }

                if (!lecturerId){
                    lecturerId = getIPRight.lecturerId;
                }

                if (!iPRightTitle){
                    iPRightTitle = getIPRight.iPRightTitle;
                }

                if (!iPRightDate){
                    iPRightDate = getIPRight.iPRightDate;
                }

                if (!registrationNumber){
                    registrationNumber = getIPRight.registrationNumber;
                }
                
                if (!description){
                    description = getIPRight.description;
                }

                if (!ipRightFile){
                    ipRightFile = getIPRight.ipRightFile;
                } else {
                    fileRemove(getIPRight.ipRightFile)
                }

            }

            const updatedIPRight = await lecturerIPRightRepository.handleLecturerUpdateIPRight({
                id,
                superAdminId,
                lecturerId, 
                iPRightTitle,
                iPRightDate,
                registrationNumber,
                description,
                ipRightFile
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    updatedIPRight: updatedIPRight
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updatedIPRight: null,
                },
            };

        }

    };

    /* ------------------- End Handle Lecturer Update IPRight ------------------- */


    /* ------------------- Handle Lecturer Delete IPRight ------------------- */

    static async handleLecturerDeleteIPRight({ id, lecturerId }) {

        try {

            const getIPRight = await lecturerIPRightRepository.handleGetIPRightById({ id });

            if (getIPRight.lecturerId == lecturerId) {

                const deletedIPRight = await lecturerIPRightRepository.handleLecturerDeleteIPRight({ id });

                fileRemove(getIPRight.ipRightFile);

                return {
                    status: true,
                    status_code: 201,
                    message: "Data deleted successfully",
                    data: {
                        deletedIPRight: deletedIPRight
                    },
                };

            } else {

                return {
                    status: false,
                    status_code: 401,
                    message: "Resource Unauthorized",
                    data: {
                        deletedIPRight: null,
                    },
                }

            }
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    deletedIPRight: null,
                },
            };

        }

    };

    /* ------------------- End Handle Lecturer Delete IPRight ------------------- */

};

module.exports = LecturerIPRightService;