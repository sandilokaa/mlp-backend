const { IPRights, Lecturers } = require("../models");
const { Op } = require("sequelize");

class SuperAdminIPRightRepository{


    /* ------------------- Handle Get IPRight By SuperAdmin Id ------------------- */

    static async handleGetIPRightBySuperAdminId({ superAdminId, iPRightTitle }) {

        const query = {
            where: { superAdminId },
            attributes: [
                'id',
                'iPRightTitle',
                'registrationNumber',
                'iPRightDate'
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'groupName']
                },
            ]
        };

        if (iPRightTitle) {
            query.where[Op.or] = [
                { iPRightTitle: { [Op.like]: '%' + iPRightTitle + '%' } }
            ];
        }

        const getIPRight = await IPRights.findAll(query);

        return getIPRight;

    };

    /* ------------------- End Handle Get IPRight By SuperAdmin Id ------------------- */


    /* ------------------- Handle Get IPRight By Id ------------------- */

    static async handleGetIPRightById({ id }) {
        
        const query = {
            where: { id },
            attributes: [
                'id',
                'lecturerId', 
                'iPRightTitle',
                'iPRightDate',
                'registrationNumber',
                'description',
                'ipRightFile'
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'groupName']
                },
            ]
        }

        const getIPRight = IPRights.findOne(query);

        return getIPRight;

    };

    /* ------------------- End  Handle Get IPRight By Id ------------------- */

};

module.exports = SuperAdminIPRightRepository;