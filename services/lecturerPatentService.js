const lecturerPatentRepository = require("../repositories/lecturerPatentRepository");
const lecturerRepository = require("../repositories/lecturerRepository");
const fileRemove = require("../utils/fileRemove");

class LecturerPatentService{

    /* ------------------- Handle Get Patent By Lecturer Id ------------------- */

    static async handleGetPatentByLecturerId({ lecturerId }){

        try {

            const getPatent = await lecturerPatentRepository.handleGetPatentByLecturerId({ lecturerId });

            return {
                status: true,
                status_code: 201,
                message: "Data displayed successfully!",
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

    };

    /* ------------------- End Handle Get Patent By Lecturer Id ------------------- */


    /* ------------------- Handle Get Patent By Id ------------------- */

    static async handleGetPatentById({ id }){

        try {

            const getPatent = await lecturerPatentRepository.handleGetPatentById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    getPatent: getPatent,
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

    };

    /* ------------------- End Handle Get Patent By Id ------------------- */


    /* ------------------- Handle Lecturer Create Patent ------------------- */

    static async handleLecturerCreatePatent({
        superAdminId,
        lecturerId, 
        patentTitle,
        patentDate,
        registrationNumber,
        description,
        patentFile
    }) {

        try {
            
            // ------------------------- Payload Validation ------------------------- //

            if (!patentTitle) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Title is required!",
                    data: {
                        patentCreated: null,
                    },
                };
            }

            if (!patentDate) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Date is required!",
                    data: {
                        patentCreated: null,
                    },
                };
            }
            
            if (!registrationNumber) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Registration number is required!",
                    data: {
                        patentCreated: null,
                    },
                };
            }
            
            if (!description) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Description is required!",
                    data: {
                        patentCreated: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //

            const getLecturer = await lecturerRepository.handleGetLecturerById({id: lecturerId});

            const patentCreated = await lecturerPatentRepository.handleLecturerCreatePatent({
                superAdminId: getLecturer.superAdminId,
                lecturerId, 
                patentTitle,
                patentDate,
                registrationNumber,
                description,
                patentFile
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created patent",
                data: {
                    patentCreated: patentCreated
                },
            }

        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    patentCreated: null
                },
            }

        }

    };

    /* ------------------- End Handle Lecturer Create Patent ------------------- */


    /* ------------------- Handle Lecturer Update Patent ------------------- */

    static async handleLecturerUpdatePatent({
        id,
        superAdminId,
        lecturerId, 
        patentTitle,
        patentDate,
        registrationNumber,
        description,
        patentFile
    }) {

        try {

            const getPatent = await lecturerPatentRepository.handleGetPatentById({ id });

            if (getPatent.id == id) {

                if (!superAdminId){
                    superAdminId = getPatent.superAdminId;
                }

                if (!lecturerId){
                    lecturerId = getPatent.lecturerId;
                }

                if (!patentTitle){
                    patentTitle = getPatent.patentTitle;
                }

                if (!patentDate){
                    patentDate = getPatent.patentDate;
                }

                if (!registrationNumber){
                    registrationNumber = getPatent.registrationNumber;
                }
                
                if (!description){
                    description = getPatent.description;
                }

                if (!patentFile){
                    patentFile = getPatent.patentFile;
                } else {
                    fileRemove(getPatent.patentFile)
                }

            }

            const updatedPatent = await lecturerPatentRepository.handleLecturerUpdatePatent({
                id,
                superAdminId,
                lecturerId, 
                patentTitle,
                patentDate,
                registrationNumber,
                description,
                patentFile
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    updatedPatent: updatedPatent
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updatedPatent: null,
                },
            };

        }

    };

    /* ------------------- End Handle Lecturer Update Patent ------------------- */


    /* ------------------- Handle Lecturer Delete Patent ------------------- */

    static async handleLecturerDeletePatent({ id, lecturerId }) {

        try {

            const getPatent = await lecturerPatentRepository.handleGetPatentById({ id });

            if (getPatent.lecturerId == lecturerId) {

                const deletedPatent = await lecturerPatentRepository.handleLecturerDeletePatent({ id });

                fileRemove(getPatent.patentFile);

                return {
                    status: true,
                    status_code: 201,
                    message: "Data deleted successfully",
                    data: {
                        deletedPatent: deletedPatent
                    },
                };

            } else {

                return {
                    status: false,
                    status_code: 401,
                    message: "Resource Unauthorized",
                    data: {
                        deletedPatent: null,
                    },
                }

            }
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    deletedPatent: null,
                },
            };

        }

    };

    /* ------------------- End Handle Lecturer Delete Patent ------------------- */

};

module.exports = LecturerPatentService;