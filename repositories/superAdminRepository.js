const { 
    SuperAdmins, 
    SuperAdminPersonals, 
    SuperAdminEducations,
    Lecturers,
    LecturerPersonals,
    LecturerEducations,
    LecturerDetails,
    Roadmaps 
} = require("../models");

class SuperAdminRepository {

    /* ------------------- Handle Get Super Admin By Id ------------------- */

    static async handleGetSuperAdminById({ id }) {

        const getSuperAdminById = await SuperAdmins.findOne({
            where: { id }
        });

        return getSuperAdminById;

    };

    /* ------------------- End Handle Get Super Admin By Id ------------------- */


    /* ------------------- Handle Get Super Admin Personal By User Id ------------------- */

    static async handleGetSuperAdminPersonalByUserId({ superAdminId }) {

        const getSuperAdminPersonalByUserId = await SuperAdminPersonals.findOne({
            where: { superAdminId }
        });

        return getSuperAdminPersonalByUserId;

    };

    /* ------------------- End Handle Get Super Admin Personal By User Id ------------------- */


    /* ------------------- Handle Get Super Admin Education By User Id ------------------- */

    static async handleGetSuperAdminEducationByUserId({ superAdminId }) {

        const getSuperAdminEducationByUserId = await SuperAdminEducations.findOne({
            where: { superAdminId }
        });

        return getSuperAdminEducationByUserId;

    };

    /* ------------------- End Handle Get Super Admin Education By User Id ------------------- */


    
    /* ------------------- Handle Update Profile Super Admin ------------------- */
    
    static async handleUpdateProfileSuperAdmin({
        id,
        name,
        email,
        password,
        role
    }) {
        
        const updatedSuperAdmin = await SuperAdmins.update({
            name, 
            email, 
            password, 
            role
        },
            { 
                where: { id } 
            }
        );

        return updatedSuperAdmin;

    };
    
    /* ------------------- End Handle Update Profile Super Admin ------------------- */


    /* ------------------- Handle Update Profile Super Admin Personal ------------------- */
    
    static async handleUpdateProfileSuperAdminPersonal({
        superAdminId,
        nip,
        major,
        address,
        gender,
        phoneNumber,
        birth
    }) {
        
        const updatedSuperAdminPersonal = await SuperAdminPersonals.update({
            nip,
            major,
            address,
            gender,
            phoneNumber,
            birth
        },
            { 
                where: { superAdminId } 
            }
        );

        return updatedSuperAdminPersonal;

    };
    
    /* ------------------- End Handle Update Profile Super Admin Personal ------------------- */


    /* ------------------- Handle Update Profile Super Admin Eduction ------------------- */
    
    static async handleUpdateProfileSuperAdminEducation({
        superAdminId,
        expertise,
        bachelor,
        magister,
        doctor
    }) {
        
        const updatedSuperAdminEduction = await SuperAdminEducations.update({
            expertise,
            bachelor,
            magister,
            doctor
        },
            { 
                where: { superAdminId } 
            }
        );

        return updatedSuperAdminEduction;

    };
    
    /* ------------------- End Handle Update Profile Super Admin Eduction ------------------- */


    /* ------------------- Handle Create Lecturer By  Super Admin ------------------- */

    static async handleCreateLecturer({ superAdminId, name, email, password, role }){

        const lectureRegistered = await Lecturers.create({
            superAdminId,
            name,
            email,
            password,
            role
        });

        return lectureRegistered;

    };

    static async handleCreateLecturerPersonal({ lecturerId }){

        const lecturerPersonalRegistered = await LecturerPersonals.create({ lecturerId });

        return lecturerPersonalRegistered;

    };

    static async handleCreateLecturerEducation({ lecturerId }){

        const lecturerEducationRegistered = await LecturerEducations.create({ lecturerId });

        return lecturerEducationRegistered;

    };

    static async handleCreateLecturerDetail({ superAdminId, lecturerId, lecturerPersonalId, lecturerEducationId }){

        const lecturerDetailRegistered = await LecturerDetails.create({ superAdminId, lecturerId, lecturerPersonalId, lecturerEducationId });

        return lecturerDetailRegistered;

    };

    /* ------------------- End Handle Create Lecturer By  Super Admin ------------------- */


    /* ------------------- Handle Get Lecturer By Super Admin Id ------------------- */

    static async handleGetLecturerBySuperAdminId({ superAdminId }) {

        const query = {
            where: { superAdminId },
            attributes: [
                'id',
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'email']
                },
                {
                    model: LecturerPersonals,
                    attributes: ['nip', 'address', 'gender', 'birth', 'phoneNumber']
                },
                {
                    model: LecturerEducations,
                    attributes: ['expertise', 'major', 'bachelor', 'magister', 'doctor']
                }
            ]
        };

        const getedLecturerBySuperAdminId = await LecturerDetails.findAll(query);

        return getedLecturerBySuperAdminId;

    };

    /* ------------------- End Handle Get Lecturer By Super Admin Id ------------------- */


    /* ------------------- Handle Get Research By Lecturer Id ------------------- */

    static async handleGetResearchBySuperAdminId({ superAdminId }) {

        const query = {
            where: { superAdminId },
            attributes: [
                'id',
                'title',
                'category',
                'period',
                'ta',
                'researchFile'
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'email']
                }
            ]
        };

        const getResearch = await Roadmaps.findAll(query);

        return getResearch;

    };

    /* ------------------- End Handle Get Research By Lecturer Id ------------------- */


    /* ------------------- Handle Get All Research By Faculty Dean ------------------- */

    static async handleGetAllResearchByFacultyDean() {

        const query = {
            where: {},
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'email']
                }
            ]
        };

        const getResearch = await Roadmaps.findAll(query);

        return getResearch;

    };

    /* ------------------- End Handle Get All Research By Faculty Dean ------------------- */
    
    
    /* ------------------- Handle Get All Lecturer By Faculty Dean ------------------- */

    static async handleGetAllLecturerByFacultyDean() {

        const query = {
            where: {},
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'email']
                },
                {
                    model: LecturerPersonals,
                    attributes: ['nip', 'address', 'gender', 'birth', 'phoneNumber']
                },
                {
                    model: LecturerEducations,
                    attributes: ['expertise', 'major', 'bachelor', 'magister', 'doctor']
                }
            ]
        };

        const getLecturer = await LecturerDetails.findAll(query);

        return getLecturer;

    };

    /* ------------------- End Handle Get All Lecturer By Faculty Dean ------------------- */

};

module.exports = SuperAdminRepository;