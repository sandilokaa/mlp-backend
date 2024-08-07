const { 
    Lecturers, 
    LecturerPersonals, 
    LecturerEducations,
    LecturerDetails,
    Roadmaps,
    ResearchValues,
    SuperAdmins
} = require("../models");

class LecturerRepository {

    /* ------------------- Handle Get Lecturer By Id ------------------- */

    static async handleGetLecturerById({ id }) {

        const getLecturerById = await Lecturers.findOne({
            where: { id }
        });

        return getLecturerById;

    };

    /* ------------------- End Handle Get Lecturer By Id ------------------- */


    /* ------------------- Handle Get Lecturer Personal By User Id ------------------- */

    static async handleGetLecturerPersonalByUserId({ lecturerId }) {

        const getLecturerPersonalByUserId = await LecturerPersonals.findOne({
            where: { lecturerId }
        });

        return getLecturerPersonalByUserId;

    };

    /* ------------------- End Handle Get Lecturer Personal By User Id ------------------- */


    /* ------------------- Handle Get Lecturer Education By User Id ------------------- */

    static async handleGetLecturerEducationByUserId({ lecturerId }) {

        const getLecturerEducationByUserId = await LecturerEducations.findOne({
            where: { lecturerId }
        });

        return getLecturerEducationByUserId;

    };

    /* ------------------- End Handle Get Lecturer Education By User Id ------------------- */



    /* ------------------- Handle Update Profile Lecturer ------------------- */

    static async handleUpdateProfileLecturer({
        id,
        name,
        email,
        password,
        role
    }) {
        
        const updatedLecturer = await Lecturers.update({
            name, 
            email, 
            password, 
            role
        },
            { 
                where: { id } 
            }
        );

        return updatedLecturer;

    };

    /* ------------------- End Handle Update Profile Lecturer ------------------- */


    /* ------------------- Handle Update Profile Lecturer Personal ------------------- */

    static async handleUpdateProfileLecturerPersonal({
        lecturerId,
        nip,
        address,
        gender,
        phoneNumber,
        placeOfBirth,
        dateOfBirth,
    }) {
        
        const updatedLecturerPersonal = await LecturerPersonals.update({
            nip,
            address,
            gender,
            phoneNumber,
            placeOfBirth,
            dateOfBirth,
        },
            { 
                where: { lecturerId } 
            }
        );

        return updatedLecturerPersonal;

    };

    /* ------------------- End Handle Update Profile Lecturer Personal ------------------- */


    /* ------------------- Handle Update Profile Lecturer Eduction ------------------- */

    static async handleUpdateProfileLecturerEducation({
        lecturerId,
        major,
        bachelor,
        magister,
        doctor
    }) {
        
        const updatedLecturerEduction = await LecturerEducations.update({
            bachelor,
            magister,
            doctor
        },
            { 
                where: { lecturerId } 
            }
        );

        return updatedLecturerEduction;

    };

    /* ------------------- End Handle Update Profile Lecturer Eduction ------------------- */


    /* ------------------- Handle Get Research By Id ------------------- */

    static async handleResearchById({ id }) {

        const getResearch = await Roadmaps.findOne({
            where: { id }
        });

        return getResearch;

    };

    /* ------------------- Handle Get Research By Id ------------------- */


    /* ------------------- Handle Get Research By Lecturer Id ------------------- */

    static async handleGetResearchByLecturerId({ lecturerId }) {

        const query = {
            where: { lecturerId },
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
                    model: SuperAdmins,
                    attributes: ['name', 'email']
                },
            ]
        };

        const getResearch = await Roadmaps.findAll(query);

        return getResearch;

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
        researchFile
    }) {

        const researchCreated = await  Roadmaps.create({
            superAdminId,
            lecturerId,
            title,
            period,
            ta,
            category,
            researchFile
        });

        return researchCreated;

    };

    /* ------------------- End Handle Lecturer Create Research ------------------- */


    /* ------------------- Handle Create Research Value ------------------- */

    static async handleCreateResearchValue({
        superAdminId,
        roadmapId,
        value
    }) {

        const createResearchValue = await ResearchValues.create({
            superAdminId,
            roadmapId,
            value
        });

        return createResearchValue;

    };

    /* ------------------- End Handle Create Research Value ------------------- */


    /* ------------------- Handle Lecturer Update Research ------------------- */

    static async handleLecturerUpdateResearch({
        id,
        title,
        period,
        ta,
        category,
        researchFile
    }) {

        const updatedResearch = await Roadmaps.update({
            title,
            period,
            ta,
            category,
            researchFile
        }, {
            where: { id }
        });

        return updatedResearch;

    };

    /* ------------------- End Handle Lecturer Update Research ------------------- */


    /* ------------------- Handle Lecturer Delete Research ------------------- */

    static async handleLecturerDeleteResearch({ id }) {

        const deletedResearch = await Roadmaps.destroy({ where: { id } });

        return deletedResearch;

    };

    /* ------------------- End Handle Lecturer Delete Research ------------------- */


    /* ------------------- Handle Get Detail Lecturer ------------------- */

    static async handleGetDetailLecturer({ lecturerId }) {

        const query = {
            where: {lecturerId},
            attributes: [
                'lecturerId',
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

        const getDetailLecturer = await LecturerDetails.findOne(query);

        return getDetailLecturer;

    };

    /* ------------------- End Handle Get Detail Lecturer ------------------- */


    /* ------------------- Handle Get Research By Id ------------------- */

    static async handleGetResearchById({ id }) {
        
        const query = {
            where: { id },
            attributes: [
                'id',
                'title',
                'period',
                'ta',
                'category',
                'researchFile'
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'email']
                },
                {
                    model: SuperAdmins,
                    attributes: ['name', 'email']
                },
                {
                    model: ResearchValues,
                    attributes: ['value']
                }
            ]
        }

        const getResearch = Roadmaps.findOne(query);

        return getResearch;

    };

    /* ------------------- End  Handle Get Research By Id ------------------- */

};

module.exports = LecturerRepository;