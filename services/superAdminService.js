const superAdminRepository = require("../repositories/superAdminRepository");
const authRepository = require("../repositories/authRepository");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT } = require("../libs/jwtSecurity");
const SALT_ROUND = 10;

class SuperAdminService {

    /* ------------------- Handle Update Profile Super Admin ------------------- */
    
    static async handleUpdateProfileSuperAdmin({
        id,
        superAdminId,
        name, 
        email, 
        password,
        role,
        nip,
        major,
        address,
        gender,
        phoneNumber,
        birth,
        expertise,
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

                if (!role){
                    role = getSuperAdmin.role;
                }

                if (!nip){
                    nip = getSuperAdminPersonal.nip;
                }

                if (!major){
                    major = getSuperAdminPersonal.major;
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

                if (!birth){
                    birth = getSuperAdminPersonal.birth;
                }

                if (!expertise){
                    expertise = getSuperAdminEducation.expertise;
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
                role
            });

            const updatedSuperAdminPersonal = await superAdminRepository.handleUpdateProfileSuperAdminPersonal({
                superAdminId,
                nip,
                major,
                address,
                gender,
                phoneNumber,
                birth
            });

            const updatedSuperAdminEducation = await superAdminRepository.handleUpdateProfileSuperAdminEducation({
                superAdminId,
                expertise,
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

    static async handleCreateLecturer({ superAdminId, name, email, password, role }) {
    
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



    /* ------------------- Handle Get Lecturer By Super Admin Id ------------------- */

    static async handleGetLecturerBySuperAdminId({ superAdminId }){

        try {

            const getedLecturerBySuperAdminId = await superAdminRepository.handleGetLecturerBySuperAdminId({ superAdminId });

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed lecturer (:",
                data: {
                    getedLecturerBySuperAdminId: getedLecturerBySuperAdminId
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getedLecturerBySuperAdminId: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get Lecturer By Super Admin Id ------------------- */


    /* ------------------- Handle Get Research By Lecturer Id ------------------- */

    static async handleGetResearchBySuperAdminId({ superAdminId }){

        try {

            const getResearch = await superAdminRepository.handleGetResearchBySuperAdminId({ superAdminId });

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed lecturer (:",
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

    /* ------------------- End Handle Get Research By Super Admin Id ------------------- */


    /* ------------------- Handle Get All Research By Faculty Dean ------------------- */

    static async handleGetAllResearchByFacultyDean(){

        try {

            const getResearch = await superAdminRepository.handleGetAllResearchByFacultyDean();

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed lecturer (:",
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


    /* ------------------- End Handle Get All Research By Faculty Dean ------------------- */


    /* ------------------- Handle Get All Lecturer By Faculty Dean ------------------- */

    static async handleGetAllLecturerByFacultyDean(){

        try {

            const getLecturer = await superAdminRepository.handleGetAllLecturerByFacultyDean();

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


    /* ------------------- End Handle Get All Lecturer By Faculty Dean ------------------- */

};

module.exports = SuperAdminService;