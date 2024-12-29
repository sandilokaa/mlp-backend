const { Patents, Lecturers } = require("../models");
const { Op } = require("sequelize");

class LecturerPatentRepository{


    /* ------------------- Handle Get Patent By Lecturer Id ------------------- */

    static async handleGetPatentByLecturerId({ lecturerId }) {

        const query = {
            where: { lecturerId },
            attributes: [
                'id',
                'patentTitle',
                'registrationNumber',
                'patentDate'
            ]
        };

        const getPatent = await Patents.findAll(query);

        return getPatent;

    };

    /* ------------------- End Handle Get Patent By Lecturer Id ------------------- */


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


    /* ------------------- Handle Lecturer Create Patent ------------------- */

    static async handleLecturerCreatePatent({
        superAdminId,
        lecturerId, 
        patentTitle,
        patentDate,
        registrationNumber,
        description,
        patentFile
    }) {

        const patentCreated = await  Patents.create({
            superAdminId,
            lecturerId, 
            patentTitle,
            patentDate,
            registrationNumber,
            description,
            patentFile
        });

        return patentCreated;

    };

    /* ------------------- End Handle Lecturer Create Patent ------------------- */


    /* ------------------- Handle Lecturer Update Patent ------------------- */

    static async handleLecturerUpdatePatent({
        id,
        patentTitle,
        patentDate,
        registrationNumber,
        description,
        patentFile
    }) {

        const updatedPatent = await Patents.update({
            patentTitle,
            patentDate,
            registrationNumber,
            description,
            patentFile
        }, {
            where: { id }
        });

        return updatedPatent;

    };

    /* ------------------- End Handle Lecturer Update Patent ------------------- */


    /* ------------------- Handle Lecturer Delete Patent ------------------- */

    static async handleLecturerDeletePatent({ id }) {

        const deletedPatent = await Patents.destroy({ where: { id } });

        return deletedPatent;

    };

    /* ------------------- End Handle Lecturer Delete Patent ------------------- */

};

module.exports = LecturerPatentRepository;