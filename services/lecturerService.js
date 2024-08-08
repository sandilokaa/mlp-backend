const lecturerRepository = require("../repositories/lecturerRepository");
const fileRemove = require("../utils/fileRemove");

class LecturerService {

    /* ------------------- Handle Update Profile Lecturer ------------------- */

    static async handleUpdateProfileLecturer({
        id,
        lecturerId,
        name, 
        email, 
        password,
        role,
        nip,
        major,
        address,
        gender,
        phoneNumber,
        placeOfBirth,
        dateOfBirth,
        bachelor,
        magister,
        doctor
    }) {

        try {

            const getLecturer = await lecturerRepository.handleGetLecturerById({ id });
            const getLecturerPersonal = await lecturerRepository.handleGetLecturerPersonalByUserId({ lecturerId });
            const getLecturerEducation = await lecturerRepository.handleGetLecturerEducationByUserId({ lecturerId });

            if (getLecturer.id == id) {

                if (!name){
                    name = getLecturer.name;
                }

                if (!email){
                    email = getLecturer.email;
                }

                if (!password){
                    password = getLecturer.password;
                }

                if (!role){
                    role = getLecturer.role;
                }

                if (!nip){
                    nip = getLecturerPersonal.nip;
                }

                if (!major){
                    major = getLecturerPersonal.major;
                }

                if (!address){
                    address = getLecturerPersonal.address;
                }

                if (!gender){
                    gender = getLecturerPersonal.gender;
                }

                if (!phoneNumber){
                    phoneNumber = getLecturerPersonal.phoneNumber;
                }

                if (!placeOfBirth){
                    placeOfBirth = getLecturerPersonal.placeOfBirth;
                }
                
                if (!dateOfBirth){
                    dateOfBirth = getLecturerPersonal.dateOfBirth;
                }

                if (!bachelor){
                    bachelor = getLecturerEducation.bachelor;
                }

                if (!magister){
                    magister = getLecturerEducation.magister;
                }

                if (!doctor){
                    doctor = getLecturerEducation.doctor;
                }
            }

            const updatedLecturer = await lecturerRepository.handleUpdateProfileLecturer({
                id,
                name,
                email,
                password,
                role
            });

            const updatedLecturerPersonal = await lecturerRepository.handleUpdateProfileLecturerPersonal({
                lecturerId,
                nip,
                address,
                gender,
                phoneNumber,
                placeOfBirth,
                dateOfBirth,
            });

            const updatedLecturerEducation = await lecturerRepository.handleUpdateProfileLecturerEducation({
                lecturerId,
                major,
                bachelor,
                magister,
                doctor
            });

            return {
                status: true,
                status_code: 201,
                message: "Data completed successfully",
                data: {
                    updatedLecturer: updatedLecturer,
                    updatedLecturerPersonal: updatedLecturerPersonal,
                    updatedLecturerEducation: updatedLecturerEducation
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updatedLecturer: null,
                    updatedLecturerPersonal: null,
                    updatedLecturerEducation: null
                },
            };

        }

    };

    /* ------------------- End Handle Update Profile Lecturer ------------------- */


    /* ------------------- Handle Get Research By Lecturer Id ------------------- */

    static async handleGetResearchByLecturerId({ lecturerId }){

        try {

            const getResearch = await lecturerRepository.handleGetResearchByLecturerId({ lecturerId });

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


    /* ------------------- Handle Lecturer Create Research ------------------- */

    static async handleLecturerCreateResearch({
        superAdminId,
        lecturerId,
        title,
        period,
        ta,
        category,
        researchFile,
        value
    }) {

        try {
            
            // ------------------------- Payload Validation ------------------------- //

            if (!title) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Title is required!",
                    data: {
                        researchCreated: null,
                    },
                };
            }

            if (!period) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Period is required!",
                    data: {
                        researchCreated: null,
                    },
                };
            }

            if (!ta) {
                return {
                    status: false,
                    status_code: 400,
                    message: "TA is required!",
                    data: {
                        researchCreated: null,
                    },
                };
            }

            if (!category) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Category is required!",
                    data: {
                        researchCreated: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //

            const getLecturer = await lecturerRepository.handleGetLecturerById({id: lecturerId});

            const researchCreated = await lecturerRepository.handleLecturerCreateResearch({
                superAdminId: getLecturer.superAdminId,
                lecturerId,
                title,
                period,
                ta,
                category,
                researchFile
            });

            const createResearchValue = await lecturerRepository.handleCreateResearchValue({
                superAdminId: getLecturer.superAdminId,
                roadmapId: researchCreated.id,
                value
            })

            return {
                status: true,
                status_code: 201,
                message: "Successfully created research",
                data: {
                    researchCreated: researchCreated,
                    valueCreated: createResearchValue
                },
            }

        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    researchCreated: null,
                    valueCreated: null
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
        title,
        period,
        ta,
        category,
        researchFile
    }) {

        try {

            const getResearch = await lecturerRepository.handleResearchById({ id });

            if (getResearch.id == id) {

                if (!superAdminId){
                    superAdminId = getResearch.superAdminId;
                }

                if (!lecturerId){
                    lecturerId = getResearch.lecturerId;
                }

                if (!title){
                    title = getResearch.title;
                }

                if (!period){
                    period = getResearch.period;
                }

                if (!ta){
                    ta = getResearch.ta;
                }

                if (!category){
                    category = getResearch.category;
                }

                if (!researchFile){
                    researchFile = getResearch.researchFile;
                } else {
                    fileRemove(getResearch.researchFile)
                }

            }

            const updatedResearch = await lecturerRepository.handleLecturerUpdateResearch({
                id,
                title,
                period,
                ta,
                category,
                researchFile
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

            const getResearch = await lecturerRepository.handleResearchById({ id });

            if (getResearch.lecturerId == lecturerId) {

                const deletedResearch = await lecturerRepository.handleLecturerDeleteResearch({ id });

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


    /* ------------------- Handle Get Detail Lecturer ------------------- */

    static async handleGetDetailLecturer({ lecturerId }){

        try {

            const getDetailLecture = await lecturerRepository.handleGetDetailLecturer({ lecturerId });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    getDetailLecture: getDetailLecture,
                },
            };

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getDetailLecture: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get Detail Lecturer ------------------- */


    /* ------------------- Handle Get Research By Id ------------------- */

    static async handleGetResearchById({ id }){

        try {

            const getResearch = await lecturerRepository.handleGetResearchById({ id });

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

module.exports = LecturerService;