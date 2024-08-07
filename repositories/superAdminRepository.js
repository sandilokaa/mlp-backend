const { 
    SuperAdmins, 
    SuperAdminPersonals, 
    SuperAdminEducations,
    SuperAdminDetails,
    Lecturers,
    LecturerPersonals,
    LecturerEducations,
    LecturerDetails,
    Roadmaps,
    ResearchValues
} = require("../models");
const { Op } = require("sequelize");

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
        address,
        gender,
        phoneNumber,
        placeOfBirth,
        dateOfBirth
    }) {
        
        const updatedSuperAdminPersonal = await SuperAdminPersonals.update({
            nip,
            address,
            gender,
            phoneNumber,
            placeOfBirth,
            dateOfBirth
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
        major,
        bachelor,
        magister,
        doctor
    }) {
        
        const updatedSuperAdminEduction = await SuperAdminEducations.update({
            major,
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
                    attributes: ['nip', 'address', 'gender', 'placeOfBirth', 'dateOfBirth', 'phoneNumber']
                },
                {
                    model: LecturerEducations,
                    attributes: ['major', 'bachelor', 'magister', 'doctor']
                }
            ]
        };

        const getedLecturerBySuperAdminId = await LecturerDetails.findAll(query);

        return getedLecturerBySuperAdminId;

    };

    /* ------------------- End Handle Get Lecturer By Super Admin Id ------------------- */


    /* ------------------- Handle Get Research By Lecturer Id ------------------- */

    static async handleGetResearchBySuperAdminId({ superAdminId, name, category, title }) {

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
                },
                {
                    model: ResearchValues,
                    attributes: ['value']
                }
            ]
        };

        if (title) {
            const searchResearchByTitle = await Roadmaps.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.like]: '%' + title + '%' } },
                    ]
                },
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
                    },
                    {
                        model: ResearchValues,
                        attributes: ['value']
                    }
                ],
                limit: 10
            });

            return searchResearchByTitle;
        }
        
        if (category) {
            const searchResearchByCategory = await Roadmaps.findAll({
                where: {
                    [Op.or]: [
                        { category: { [Op.like]: '%' + category + '%' } },
                    ]
                },
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
                    },
                    {
                        model: ResearchValues,
                        attributes: ['value']
                    }
                ],
                limit: 10
            });

            return searchResearchByCategory;
        }
        
        if (name) {
            const searchResearchByName = await Roadmaps.findAll({
                where: {},
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
                        attributes: ['name', 'email'],
                        where: {
                            name: { [Op.like]: `%${name}%` }
                        }
                    },
                    {
                        model: ResearchValues,
                        attributes: ['value']
                    }
                ],
                limit: 10
            });

            return searchResearchByName;
        }

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

    static async handleGetAllLecturerByFacultyDean({ name }) {

        const query = {
            where: {},
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'email']
                },
                {
                    model: LecturerPersonals,
                    attributes: ['nip', 'address', 'gender', 'placeOfBirth', 'dateOfBirth', 'phoneNumber']
                },
                {
                    model: LecturerEducations,
                    attributes: ['major', 'bachelor', 'magister', 'doctor']
                },
                {
                    model: SuperAdmins,
                    attributes: ['name']
                },
            ]
        };
        
        if (name) {
            const searchLectureByName = await LecturerDetails.findAll({
                where: {},
                include: [
                    {
                        model: Lecturers,
                        attributes: ['name', 'email'],
                        where: {
                            name: { [Op.like]: `%${name}%` }
                        }
                    },
                    {
                        model: LecturerPersonals,
                        attributes: ['nip', 'address', 'gender', 'placeOfBirth', 'dateOfBirth', 'phoneNumber']
                    },
                    {
                        model: LecturerEducations,
                        attributes: ['major', 'bachelor', 'magister', 'doctor']
                    },
                    {
                        model: SuperAdmins,
                        attributes: ['name']
                    },
                ],
                limit: 10
            });

            return searchLectureByName;
        }

        const getLecturer = await LecturerDetails.findAll(query);

        return getLecturer;

    };

    /* ------------------- End Handle Get All Lecturer By Faculty Dean ------------------- */


    /* ------------------- Handle Get Detail Lecturer ------------------- */

    static async handleGetDetailSuperAdmin({ superAdminId }) {

        const query = {
            where: {superAdminId},
            attributes: [
                'superAdminId',
            ],
            include: [
                {
                    model: SuperAdmins,
                    attributes: ['name', 'email']
                },
                {
                    model: SuperAdminPersonals,
                    attributes: ['nip', 'address', 'gender', 'placeOfBirth', 'dateOfBirth', 'phoneNumber']
                },
                {
                    model: SuperAdminEducations,
                    attributes: ['major', 'bachelor', 'magister', 'doctor']
                }
            ]
        };

        const getDetailSuperAdmin = await SuperAdminDetails.findOne(query);

        return getDetailSuperAdmin;

    };

    /* ------------------- End Handle Get Detail Lecturer ------------------- */


    /* ------------------- Handle Get Research Value By Id ------------------- */

    static async handleGetResearchValueById({ id }){

        const getResearchValue = await ResearchValues.findOne({
            where: { id }
        });

        return getResearchValue;

    };

    /* ------------------- End Handle Get Research Value By Id ------------------- */


    /* ------------------- Handle Update Research Value ------------------- */
    
    static async handleUpdateResearchValue({
        id,
        value
    }) {
        
        const updatedResearchValue = await ResearchValues.update({
            value
        },
            { 
                where: { id } 
            }
        );

        return updatedResearchValue;

    };
    
    /* ------------------- End Handle Update Research Value ------------------- */

};

module.exports = SuperAdminRepository;