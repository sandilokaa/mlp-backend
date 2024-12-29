const { Publications, Lecturers } = require("../models");
const { Op } = require("sequelize");

class LecturerPublicationRepository{


    /* ------------------- Handle Get Publication By Lecturer Id ------------------- */

    static async handleGetPublicationByLecturerId({ lecturerId }) {

        const query = {
            where: { lecturerId },
            attributes: [
                'id',
                'publicationTitle',
                'publicationType',
                'urlPublication'
            ]
        };

        const getPublication = await Publications.findAll(query);

        return getPublication;

    };

    /* ------------------- End Handle Get Publication By Lecturer Id ------------------- */


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
        }

        const getPublication = Publications.findOne(query);

        return getPublication;

    };

    /* ------------------- End  Handle Get Publication By Id ------------------- */


    /* ------------------- Handle Lecturer Create Publication ------------------- */

    static async handleLecturerCreatePublication({
        superAdminId,
        lecturerId, 
        publicationTitle,
        publicationType,
        journalName,
        urlPublication,
        publicationFile
    }) {

        const publicationCreated = await  Publications.create({
            superAdminId,
            lecturerId, 
            publicationTitle,
            publicationType,
            journalName,
            urlPublication,
            publicationFile
        });

        return publicationCreated;

    };

    /* ------------------- End Handle Lecturer Create Publication ------------------- */


    /* ------------------- Handle Lecturer Update Publication ------------------- */

    static async handleLecturerUpdatePublication({
        id,
        publicationTitle,
        publicationType,
        journalName,
        urlPublication,
        publicationFile
    }) {

        const updatedPublication = await Publications.update({
            publicationTitle,
            publicationType,
            journalName,
            urlPublication,
            publicationFile
        }, {
            where: { id }
        });

        return updatedPublication;

    };

    /* ------------------- End Handle Lecturer Update Publication ------------------- */


    /* ------------------- Handle Lecturer Delete Publication ------------------- */

    static async handleLecturerDeletePublication({ id }) {

        const deletedPublication = await Publications.destroy({ where: { id } });

        return deletedPublication;

    };

    /* ------------------- End Handle Lecturer Delete Publication ------------------- */

};

module.exports = LecturerPublicationRepository;