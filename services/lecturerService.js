const lecturerRepository = require("../repositories/lecturerRepository");

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
                
                if (!groupName){
                    groupName = getLecturer.groupName;
                }

                if (!role){
                    role = getLecturer.role;
                }

                if (!nip){
                    nip = getLecturerPersonal.nip;
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
                groupName,
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


    /* ------------------- Handle Get All Lecturer Expertise Group ------------------- */

    static async handleGetAllLecturerExpertiseGroup({ name, groupName, devotionPeriod, academicYear  }){

        try {

            const getLecturer = await lecturerRepository.handleGetAllLecturerExpertiseGroup({ name, groupName, devotionPeriod, academicYear  });

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed data",
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

    /* ------------------- End Handle Get All Lecturer Expertise Group ------------------- */


    /* ------------------- Handle Get Lecturer Expertise Group By Id ------------------- */

    static async handleGetLecturerExpertiseGroupById({ id, devotionPeriod, academicYear }){

        try {

            const getLecturerDetail = await lecturerRepository.handleGetLecturerExpertiseGroupById({ id, devotionPeriod, academicYear });

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

    /* ------------------- End Handle Get Lecturer Expertise Group By Id ------------------- */

};

module.exports = LecturerService;