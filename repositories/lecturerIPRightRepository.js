const { IPRights, Lecturers } = require("../models");
const { Op } = require("sequelize");

class LecturerIPRightRepository{


    /* ------------------- Handle Get IPRight By Lecturer Id ------------------- */

    static async handleGetIPRightByLecturerId({ lecturerId }) {

        const query = {
            where: { lecturerId },
            attributes: [
                'id',
                'iPRightTitle',
                'registrationNumber',
                'iPRightDate'
            ]
        };

        const getIPRight = await IPRights.findAll(query);

        return getIPRight;

    };

    /* ------------------- End Handle Get IPRight By Lecturer Id ------------------- */


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


    /* ------------------- Handle Lecturer Create IPRight ------------------- */

    static async handleLecturerCreateIPRight({
        superAdminId,
        lecturerId,
        iPRightTitle,
        iPRightDate,
        registrationNumber,
        description,
        ipRightFile
    }) {

        const publicationCreated = await IPRights.create({
            superAdminId,
            lecturerId,
            iPRightTitle,
            iPRightDate,
            registrationNumber,
            description,
            ipRightFile
        });

        return publicationCreated;

    };

    /* ------------------- End Handle Lecturer Create IPRight ------------------- */


    /* ------------------- Handle Lecturer Update IPRight ------------------- */

    static async handleLecturerUpdateIPRight({
        id,
        iPRightTitle,
        iPRightDate,
        registrationNumber,
        description,
        ipRightFile
    }) {

        const updatedIPRight = await IPRights.update({
            iPRightTitle,
            iPRightDate,
            registrationNumber,
            description,
            ipRightFile
        }, {
            where: { id }
        });

        return updatedIPRight;

    };

    /* ------------------- End Handle Lecturer Update IPRight ------------------- */


    /* ------------------- Handle Lecturer Delete IPRight ------------------- */

    static async handleLecturerDeleteIPRight({ id }) {

        const deletedIPRight = await IPRights.destroy({ where: { id } });

        return deletedIPRight;

    };

    /* ------------------- End Handle Lecturer Delete IPRight ------------------- */

};

module.exports = LecturerIPRightRepository;