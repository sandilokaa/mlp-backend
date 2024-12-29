const { 
    Researchs,
    Lecturers
} = require("../models");
const { Op } = require("sequelize");

class SuperAdminResearchRepository {

    /* ------------------- Handle Get Research By Lecturer Id ------------------- */

    static async handleGetResearchBySuperAdminId({ superAdminId, researchName, researchPeriod, academicYear }) {

        const query = {
            where: { superAdminId },
            attributes: [
                'id',
                'researchName',
                'researchPeriod',
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'email']

                }
            ]
        };

        if (researchName) {
            query.where[Op.or] = [
                { researchName: { [Op.like]: '%' + researchName + '%' } }
            ];
        }
        
        if (researchPeriod && academicYear) {
            query.where[Op.and] = [
                { researchPeriod: researchPeriod },
                { academicYear: academicYear }
            ];
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
                    attributes: ['name']
                },
            ]
        }

        const getResearch = Researchs.findOne(query);

        return getResearch;

    };

    /* ------------------- End  Handle Get Research By Id ------------------- */

};

module.exports = SuperAdminResearchRepository;