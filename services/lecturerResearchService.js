const lecturerResearchRepository = require("../repositories/lecturerResearchRepository");
const lecturerRepository = require("../repositories/lecturerRepository");
const fileRemove = require("../utils/fileRemove");

class LecturerResearchService{

    /* ------------------- Handle Get Research By Lecturer Id ------------------- */

    static async handleGetResearchByLecturerId({ lecturerId, researchPeriod, academicYear }){

        try {

            const getResearch = await lecturerResearchRepository.handleGetResearchByLecturerId({ lecturerId, researchPeriod, academicYear });

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

    };

    /* ------------------- End Handle Get Research By Lecturer Id ------------------- */


    /* ------------------- Handle Get Research By Id ------------------- */

    static async handleGetResearchById({ id }){

        try {

            const getResearch = await lecturerResearchRepository.handleGetResearchById({ id });

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


    /* ------------------- Handle Lecturer Create Research ------------------- */

    static async handleLecturerCreateResearch({
        superAdminId,
        lecturerId, 
        researchName,
        researchCategory,
        researchFile,
        researchPeriod,
        academicYear
    }) {

        try {
            
            // ------------------------- Payload Validation ------------------------- //

            if (!researchName) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Name is required!",
                    data: {
                        researchCreated: null,
                    },
                };
            }

            if (!researchCategory) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Type is required!",
                    data: {
                        researchCreated: null,
                    },
                };
            }
            
            if (!researchPeriod) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Period is required!",
                    data: {
                        researchCreated: null,
                    },
                };
            }
            
            if (!academicYear) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Academic year is required!",
                    data: {
                        researchCreated: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //

            const getLecturer = await lecturerRepository.handleGetLecturerById({id: lecturerId});

            const researchCreated = await lecturerResearchRepository.handleLecturerCreateResearch({
                superAdminId: getLecturer.superAdminId,
                lecturerId, 
                researchName,
                researchCategory,
                researchFile,
                researchPeriod,
                academicYear
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created research",
                data: {
                    researchCreated: researchCreated
                },
            }

        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    researchCreated: null
                },
            }

        }

    };

    /* ------------------- End Handle Lecturer Create Research ------------------- */


    /* ------------------- Handle Lecturer Update Research ------------------- */

    static async handleLecturerUpdateResearch({
        id,
        superAdminId,
        lecturerId, 
        researchName,
        researchCategory,
        researchFile,
        researchPeriod,
        academicYear
    }) {

        try {

            const getResearch = await lecturerResearchRepository.handleGetResearchById({ id });

            if (getResearch.id == id) {

                if (!superAdminId){
                    superAdminId = getResearch.superAdminId;
                }

                if (!lecturerId){
                    lecturerId = getResearch.lecturerId;
                }

                if (!researchName){
                    researchName = getResearch.researchName;
                }

                if (!researchCategory){
                    researchCategory = getResearch.researchCategory;
                }

                if (!researchPeriod){
                    researchPeriod = getResearch.researchPeriod;
                }
                
                if (!academicYear){
                    academicYear = getResearch.academicYear;
                }

                if (!researchFile){
                    researchFile = getResearch.researchFile;
                } else {
                    fileRemove(getResearch.researchFile)
                }

            }

            const updatedResearch = await lecturerResearchRepository.handleLecturerUpdateResearch({
                id,
                superAdminId,
                lecturerId, 
                researchName,
                researchCategory,
                researchFile,
                researchPeriod,
                academicYear
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    updatedResearch: updatedResearch
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updatedResearch: null,
                },
            };

        }

    };

    /* ------------------- End Handle Lecturer Update Research ------------------- */


    /* ------------------- Handle Lecturer Delete Research ------------------- */

    static async handleLecturerDeleteResearch({ id, lecturerId }) {

        try {

            const getResearch = await lecturerResearchRepository.handleGetResearchById({ id });

            if (getResearch.lecturerId == lecturerId) {

                const deletedResearch = await lecturerResearchRepository.handleLecturerDeleteResearch({ id });

                fileRemove(getResearch.researchFile);

                return {
                    status: true,
                    status_code: 201,
                    message: "Data deleted successfully",
                    data: {
                        deletedResearch: deletedResearch
                    },
                };

            } else {

                return {
                    status: false,
                    status_code: 401,
                    message: "Resource Unauthorized",
                    data: {
                        deletedResearch: null,
                    },
                }

            }
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    deletedResearch: null,
                },
            };

        }

    };

    /* ------------------- End Handle Lecturer Delete Research ------------------- */

};

module.exports = LecturerResearchService;