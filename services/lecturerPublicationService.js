const lecturerPublicationRepository = require("../repositories/lecturerPublicationRepository");
const lecturerRepository = require("../repositories/lecturerRepository");
const fileRemove = require("../utils/fileRemove");

class LecturerPublicationService{

    /* ------------------- Handle Get Publication By Lecturer Id ------------------- */

    static async handleGetPublicationByLecturerId({ lecturerId }){

        try {

            const getPublication = await lecturerPublicationRepository.handleGetPublicationByLecturerId({ lecturerId });

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

    };

    /* ------------------- End Handle Get Publication By Lecturer Id ------------------- */


    /* ------------------- Handle Get Publication By Id ------------------- */

    static async handleGetPublicationById({ id }){

        try {

            const getPublication = await lecturerPublicationRepository.handleGetPublicationById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    getPublication: getPublication,
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

    };

    /* ------------------- End Handle Get Publication By Id ------------------- */


    /* ------------------- Handle Lecturer Create Publication ------------------- */

    static async handleLecturerCreatePublication({
        superAdminId,
        lecturerId, 
        publicationTitle,
        publicationType,
        journalName,
        urlPublication,
        publicationFile
    }) {

        try {
            
            // ------------------------- Payload Validation ------------------------- //

            if (!publicationTitle) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Title is required!",
                    data: {
                        publicationCreated: null,
                    },
                };
            }

            if (!publicationType) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Type is required!",
                    data: {
                        publicationCreated: null,
                    },
                };
            }
            
            if (!journalName) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Journal is required!",
                    data: {
                        publicationCreated: null,
                    },
                };
            }
            
            if (!urlPublication) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Url is required!",
                    data: {
                        publicationCreated: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //

            const getLecturer = await lecturerRepository.handleGetLecturerById({id: lecturerId});

            const publicationCreated = await lecturerPublicationRepository.handleLecturerCreatePublication({
                superAdminId: getLecturer.superAdminId,
                lecturerId, 
                publicationTitle,
                publicationType,
                journalName,
                urlPublication,
                publicationFile
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created publication",
                data: {
                    publicationCreated: publicationCreated
                },
            }

        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    publicationCreated: null
                },
            }

        }

    };

    /* ------------------- End Handle Lecturer Create Publication ------------------- */


    /* ------------------- Handle Lecturer Update Publication ------------------- */

    static async handleLecturerUpdatePublication({
        id,
        superAdminId,
        lecturerId, 
        publicationTitle,
        publicationType,
        journalName,
        urlPublication,
        publicationFile
    }) {

        try {

            const getPublication = await lecturerPublicationRepository.handleGetPublicationById({ id });

            if (getPublication.id == id) {

                if (!superAdminId){
                    superAdminId = getPublication.superAdminId;
                }

                if (!lecturerId){
                    lecturerId = getPublication.lecturerId;
                }

                if (!publicationTitle){
                    publicationTitle = getPublication.publicationTitle;
                }

                if (!publicationType){
                    publicationType = getPublication.publicationType;
                }

                if (!journalName){
                    journalName = getPublication.journalName;
                }
                
                if (!urlPublication){
                    urlPublication = getPublication.urlPublication;
                }

                if (!publicationFile){
                    publicationFile = getPublication.publicationFile;
                } else {
                    fileRemove(getPublication.publicationFile)
                }

            }

            const updatedPublication = await lecturerPublicationRepository.handleLecturerUpdatePublication({
                id,
                superAdminId,
                lecturerId, 
                publicationTitle,
                publicationType,
                journalName,
                urlPublication,
                publicationFile
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    updatedPublication: updatedPublication
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updatedPublication: null,
                },
            };

        }

    };

    /* ------------------- End Handle Lecturer Update Publication ------------------- */


    /* ------------------- Handle Lecturer Delete Publication ------------------- */

    static async handleLecturerDeletePublication({ id, lecturerId }) {

        try {

            const getPublication = await lecturerPublicationRepository.handleGetPublicationById({ id });

            if (getPublication.lecturerId == lecturerId) {

                const deletedPublication = await lecturerPublicationRepository.handleLecturerDeletePublication({ id });

                fileRemove(getPublication.publicationFile);

                return {
                    status: true,
                    status_code: 201,
                    message: "Data deleted successfully",
                    data: {
                        deletedPublication: deletedPublication
                    },
                };

            } else {

                return {
                    status: false,
                    status_code: 401,
                    message: "Resource Unauthorized",
                    data: {
                        deletedPublication: null,
                    },
                }

            }
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    deletedPublication: null,
                },
            };

        }

    };

    /* ------------------- End Handle Lecturer Delete Publication ------------------- */

};

module.exports = LecturerPublicationService;