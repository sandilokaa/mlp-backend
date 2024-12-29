const { Researchs, Lecturers } = require("../models");
const { Op } = require("sequelize");

class LecturerResearchRepository{

    /* ------------------- Handle Get Research By Lecturer Id ------------------- */

    static async handleGetResearchByLecturerId({ lecturerId, researchPeriod, academicYear }) {

        const query = {
            where: { lecturerId },
            attributes: [
                'id',
                'researchName',
                'researchCategory'
            ]
        };

        if (researchPeriod && academicYear) {
            
            const searchByPeriod = await Researchs.findAll({
                where: {
                    [Op.and]: [
                        { researchPeriod: researchPeriod },
                        { academicYear: academicYear },
                    ]
                },
                attributes: [
                    'id',
                    'researchName',
                    'researchCategory',
                    'researchPeriod'
                ],
                include: [
                    {
                        model: Lecturers,
                        attributes: ['name', 'email']    
                    }
                ],
                limit: 10
            });

            return searchByPeriod;
        }

        const getResearch = await Researchs.findAll(query);

        return getResearch;

    };

    /* ------------------- End Handle Get Research By Lecturer Id ------------------- */


    /* ------------------- Handle Get Research By Id ------------------- */

    static async handleGetResearchById({ id }) {
        
        const query = {
            where: { id },
            attributes: [
                'id',
                'lecturerId',
                'researchName',
                'researchCategory',
                'researchFile',
                'researchPeriod',
                'academicYear'
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'groupName']
                },
            ]
        }

        const getResearch = Researchs.findOne(query);

        return getResearch;

    };

    /* ------------------- End  Handle Get Research By Id ------------------- */


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

        const assignmentCreated = await  Researchs.create({
            superAdminId,
            lecturerId, 
            researchName,
            researchCategory,
            researchFile,
            researchPeriod,
            academicYear
        });

        return assignmentCreated;

    };

    /* ------------------- End Handle Lecturer Create Research ------------------- */


    /* ------------------- Handle Lecturer Update Research ------------------- */

    static async handleLecturerUpdateResearch({
        id,
        researchName,
        researchCategory,
        researchFile,
        researchPeriod,
        academicYear
    }) {

        const updatedResearch = await Researchs.update({
            researchName,
            researchCategory,
            researchFile,
            researchPeriod,
            academicYear
        }, {
            where: { id }
        });

        return updatedResearch;

    };

    /* ------------------- End Handle Lecturer Update Research ------------------- */


    /* ------------------- Handle Lecturer Delete Research ------------------- */

    static async handleLecturerDeleteResearch({ id }) {

        const deletedResearch = await Researchs.destroy({ where: { id } });

        return deletedResearch;

    };

    /* ------------------- End Handle Lecturer Delete Research ------------------- */

};

module.exports = LecturerResearchRepository;