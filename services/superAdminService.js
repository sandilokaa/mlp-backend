const superAdminRepository = require("../repositories/superAdminRepository");
const authRepository = require("../repositories/authRepository");

const bcrypt = require("bcrypt");
const SALT_ROUND = 10;

class SuperAdminService {


    /* ------------------- Handle Get Detail SuperAdmin ------------------- */

    static async handleGetDetailSuperAdmin({ superAdminId }){

        try {

            const getDetailSuperAdmin = await superAdminRepository.handleGetDetailSuperAdmin({ superAdminId });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    getDetailSuperAdmin: getDetailSuperAdmin,
                },
            };

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getDetailSuperAdmin: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get Detail SuperAdmin ------------------- */


    /* ------------------- Handle Update Profile Super Admin ------------------- */
    
    static async handleUpdateProfileSuperAdmin({
        id,
        superAdminId,
        name, 
        email, 
        password,
        role,
        nip,
        groupName,
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

            const getSuperAdmin = await superAdminRepository.handleGetSuperAdminById({ id });
            const getSuperAdminPersonal = await superAdminRepository.handleGetSuperAdminPersonalByUserId({ superAdminId });
            const getSuperAdminEducation = await superAdminRepository.handleGetSuperAdminEducationByUserId({ superAdminId });

            if (getSuperAdmin.id == id) {

                if (!name){
                    name = getSuperAdmin.name;
                }

                if (!email){
                    email = getSuperAdmin.email;
                }

                if (!password){
                    password = getSuperAdmin.password;
                }
                
                if (!groupName){
                    groupName = getSuperAdmin.groupName;
                }

                if (!role){
                    role = getSuperAdmin.role;
                }

                if (!nip){
                    nip = getSuperAdminPersonal.nip;
                }

                if (!address){
                    address = getSuperAdminPersonal.address;
                }

                if (!gender){
                    gender = getSuperAdminPersonal.gender;
                }

                if (!phoneNumber){
                    phoneNumber = getSuperAdminPersonal.phoneNumber;
                }

                if (!placeOfBirth){
                    placeOfBirth = getSuperAdminPersonal.placeOfBirth;
                }
                
                if (!dateOfBirth){
                    dateOfBirth = getSuperAdminPersonal.dateOfBirth;
                }

                if (!bachelor){
                    bachelor = getSuperAdminEducation.bachelor;
                }

                if (!magister){
                    magister = getSuperAdminEducation.magister;
                }

                if (!doctor){
                    doctor = getSuperAdminEducation.doctor;
                }
            }

            const updatedSuperAdmin = await superAdminRepository.handleUpdateProfileSuperAdmin({
                id,
                name,
                email,
                password,
                groupName,
                role
            });

            const updatedSuperAdminPersonal = await superAdminRepository.handleUpdateProfileSuperAdminPersonal({
                superAdminId,
                nip,
                address,
                gender,
                phoneNumber,
                placeOfBirth,
                dateOfBirth
            });

            const updatedSuperAdminEducation = await superAdminRepository.handleUpdateProfileSuperAdminEducation({
                superAdminId,
                bachelor,
                magister,
                doctor
            });

            return {
                status: true,
                status_code: 201,
                message: "Data completed successfully",
                data: {
                    updatedSuperAdmin: updatedSuperAdmin,
                    updatedSuperAdminPersonal: updatedSuperAdminPersonal,
                    updatedSuperAdminEducation: updatedSuperAdminEducation
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updatedSuperAdmin: null,
                    updatedSuperAdminPersonal: null,
                    updatedSuperAdminEducation: null
                },
            };

        }

    };
    
    /* ------------------- End Handle Update Profile Super Admin ------------------- */


    /* ------------------- Handle Create Lecturer By  Super Admin ------------------- */

    static async handleCreateLecturer({ superAdminId, name, email, password, groupName , role }) {
    
        try {

            // ------------------------- Payload Validation ------------------------- //

            if (!name) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Name date is required!",
                    data: {
                        registeredLecturer: null,
                    },
                };
            }

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email date is required!",
                    data: {
                        registeredLecturer: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password is required!",
                    data: {
                        registeredLecturer: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Admin password is at least 8 characters long!",
                    data: {
                        registeredLecturerr: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //

            const getLecturerByEmail = await authRepository.handleGetLecturerByEmail({ email });

            if (getLecturerByEmail) {
                
                return {
                    status: false,
                    status_code: 400,
                    message: "Email already in use!",
                    data: {
                        registeredLecturer: null,
                    },
                };

            } else {

                const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

                const lecturerRegistered = await superAdminRepository.handleCreateLecturer({
                    superAdminId,
                    name,
                    email,
                    password: hashedPassword,
                    groupName,
                    role
                });

                const lecturerPersonalRegistered = await superAdminRepository.handleCreateLecturerPersonal({
                    lecturerId: lecturerRegistered.id
                });
                
                const lecturerEducationRegistered = await superAdminRepository.handleCreateLecturerEducation({
                    lecturerId: lecturerRegistered.id
                });
                
                const lectureDetailRegistered = await superAdminRepository.handleCreateLecturerDetail({
                    superAdminId,
                    lecturerId: lecturerRegistered.id,
                    lecturerPersonalId: lecturerPersonalRegistered.id,
                    lecturerEducationId: lecturerEducationRegistered.id
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Successfully registered lecture!",
                    data: {
                        lectureRegistered: lecturerRegistered,
                        lecturePersonalRegistered: lecturerPersonalRegistered,
                        lectureEducationRegistered: lecturerEducationRegistered,
                        lectureDetailRegistered: lectureDetailRegistered
                    },
                };

            }
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    lecturerRegistered: null,
                    lecturerPersonalRegistered: null,
                    lecturerEducationRegistered: null,
                    lecturerDetailRegistered: null
                },
            };

        }
    };

    /* ------------------- End Handle Create Lecturer By  Super Admin ------------------- */



    /* ------------------- Handle Get All Lecturer Group ------------------- */

    static async handleGetAllLecturerGroup({ name, groupName, devotionPeriod, assignmentPeriod, academicYear }){

        try {

            const getLecturer = await superAdminRepository.handleGetAllLecturerGroup({ name, groupName, devotionPeriod, assignmentPeriod, academicYear });

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed lecturer (:",
                data: {
                    getLecturer: getLecturer
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getLecturer: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get All Lecturer Group ------------------- */

    
    /* ------------------- Handle Get Lecture Detail ------------------- */

    static async handleGetLecturerDetail({ id, devotionPeriod, assignmentPeriod, academicYear }){

        try {

            const getLecturerDetail = await superAdminRepository.handleGetLecturerDetail({ id, devotionPeriod, assignmentPeriod, academicYear });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    getLecturerDetail: getLecturerDetail,
                },
            };

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getLecturerDetail: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get Lecture Detail ------------------- */


    /* ------------------- Handle Get Delete Lecture Detail ------------------- */

    static async handleDeleteLectureById({ id, superAdminId }) {

        try {

            const getLecturer = await superAdminRepository.handleGetLecturerDetail({ id });

            if (getLecturer.superAdminId == superAdminId) {

                const deletedLecturer = await superAdminRepository.handleDeleteLectureById({ id: getLecturer.lecturerId });
                const deletedLecturerPersonal = await superAdminRepository.handleDeleteLecturePersonalById({ id: getLecturer.lecturerId });
                const deletedLecturerEducation = await superAdminRepository.handleDeleteLectureEducationById({ id: getLecturer.lecturerId });
                const deletedLecturerDetail = await superAdminRepository.handleDeleteLectureDetailById({ id: getLecturer.lecturerId });

                return {
                    status: true,
                    status_code: 201,
                    message: "Data deleted successfully",
                    data: {
                        deletedLecturer: deletedLecturer,
                        deletedLecturerPersonal: deletedLecturerPersonal,
                        deletedLecturerEducation: deletedLecturerEducation,
                        deletedLecturerDetail: deletedLecturerDetail,
                    },
                };

            } else {

                return {
                    status: false,
                    status_code: 401,
                    message: "Resource Unauthorized",
                    data: {
                        deletedLecturer: null,
                        deletedLecturerPersonal: null,
                        deletedLecturerEducation: null,
                        deletedLecturerDetail: null,
                    },
                }

            }
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    deletedLecturer: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get Delete Lecture Detail ------------------- */


};

module.exports = SuperAdminService;