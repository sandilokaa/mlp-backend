const { Publications, Lecturers } = require("../models");
const { Op } = require("sequelize");

class SuperAdminPublicationRepository{


    /* ------------------- Handle Get Publication By SuperAdmin Id ------------------- */

    static async handleGetPublicationBySuperAdminId({ superAdminId, publicationTitle }) {

        const query = {
            where: { superAdminId },
            attributes: [
                'id',
                'publicationTitle',
                'publicationType',
                'urlPublication'
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'groupName']
                },
            ]
        };

        if (publicationTitle) {
            query.where[Op.or] = [
                { publicationTitle: { [Op.like]: '%' + publicationTitle + '%' } }
            ];
        }

        const getPublication = await Publications.findAll(query);

        return getPublication;

    };

    /* ------------------- End Handle Get Publication By SuperAdmin Id ------------------- */


    /* ------------------- Handle Get Publication By Id ------------------- */

    static async handleGetPublicationById({ id }) {
        
        const query = {
            where: { id },
            attributes: [
                'id',
                'lecturerId', 
                'publicationTitle',
                'publicationType',
                'journalName',
                'urlPublication',
                'publicationFile'
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'groupName']
                },
            ]
        };
        

        const getPublication = Publications.findOne(query);

        return getPublication;

    };

    /* ------------------- End  Handle Get Publication By Id ------------------- */

};

module.exports = SuperAdminPublicationRepository;