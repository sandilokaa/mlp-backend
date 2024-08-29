const { 
    Devotions,
    Lecturers
} = require("../models");
const { Op, Sequelize, literal } = require("sequelize");

class SuperAdminDevotionRepository {

    /* ------------------- Handle Get Devotion By Lecturer Id ------------------- */

    static async handleGetDevotionBySuperAdminId({ superAdminId, devotionName, devotionPeriod, academicYear }) {

        const query = {
            where: { superAdminId },
            attributes: [
                'id',
                'devotionName',
                'devotionValue',
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'email']

                }
            ]
        };

        if (devotionName) {
            query.where[Op.or] = [
                { devotionName: { [Op.like]: '%' + devotionName + '%' } }
            ];
        }
        
        if (devotionPeriod && academicYear) {
            query.where[Op.and] = [
                { devotionPeriod: devotionPeriod },
                { academicYear: academicYear }
            ];
        }
        

        const getDevotion = await Devotions.findAll(query);

        return getDevotion;

    };

    /* ------------------- End Handle Get Devotion By Lecturer Id ------------------- */


    /* ------------------- Handle Get Devotion By Id ------------------- */

    static async handleGetDevotionById({ id }) {
        
        const query = {
            where: { id },
            attributes: [
                'id',
                'lecturerId',
                'devotionName',
                'devotionRole',
                'devotionValue',
                'devotionFile',
                'devotionPeriod',
                'academicYear',
                'devotionDescription'
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name']
                },
            ]
        }

        const getDevotion = Devotions.findOne(query);

        return getDevotion;

    };

    /* ------------------- End  Handle Get Devotion By Id ------------------- */

};

module.exports = SuperAdminDevotionRepository;