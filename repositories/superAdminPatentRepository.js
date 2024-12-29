const { Patents, Lecturers } = require("../models");
const { Op } = require("sequelize");

class SuperAdminPatentRepository{


    /* ------------------- Handle Get Patent By SuperAdmin Id ------------------- */

    static async handleGetPatentBySuperAdminId({ superAdminId, patentTitle }) {

        const query = {
            where: { superAdminId },
            attributes: [
                'id',
                'patentTitle',
                'registrationNumber',
                'patentDate'
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'groupName']
                },
            ]
        };

        if (patentTitle) {
            query.where[Op.or] = [
                { patentTitle: { [Op.like]: '%' + patentTitle + '%' } }
            ];
        }

        const getPatent = await Patents.findAll(query);

        return getPatent;

    };

    /* ------------------- End Handle Get Patent By SuperAdmin Id ------------------- */


    /* ------------------- Handle Get Patent By Id ------------------- */

    static async handleGetPatentById({ id }) {
        
        const query = {
            where: { id },
            attributes: [
                'id',
                'lecturerId', 
                'patentTitle',
                'patentDate',
                'registrationNumber',
                'description',
                'patentFile'
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'groupName']
                },
            ]
        }

        const getPatent = Patents.findOne(query);

        return getPatent;

    };

    /* ------------------- End  Handle Get Patent By Id ------------------- */

};

module.exports = SuperAdminPatentRepository;