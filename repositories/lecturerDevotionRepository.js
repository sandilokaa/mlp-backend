const { 
    Devotions,
    Lecturers
} = require("../models");


class LecturerDevotionRepository {


    /* ------------------- Handle Get Devotion By Lecturer Id ------------------- */

    static async handleGetDevotionByLecturerId({ lecturerId }) {

        const query = {
            where: { lecturerId },
            attributes: [
                'id',
                'devotionName',
                'devotionRole',
                'devotionValue'
            ]
        };

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
                    attributes: ['name', 'groupName']
                },
            ]
        }

        const getDevotion = Devotions.findOne(query);

        return getDevotion;

    };

    /* ------------------- End  Handle Get Devotion By Id ------------------- */


    /* ------------------- Handle Lecturer Create Devotion ------------------- */

    static async handleLecturerCreateDevotion({
        superAdminId,
        lecturerId,
        devotionName,
        devotionRole,
        devotionPeriod,
        academicYear,
        devotionDescription,
        devotionValue,
        devotionFile
    }) {

        const devotionCreated = await  Devotions.create({
            superAdminId,
            lecturerId,
            devotionName,
            devotionRole,
            devotionPeriod,
            academicYear,
            devotionDescription,
            devotionValue,
            devotionFile
        });

        return devotionCreated;

    };

    /* ------------------- End Handle Lecturer Create Devotion ------------------- */


    /* ------------------- Handle Lecturer Update Devotion ------------------- */

    static async handleLecturerUpdateDevotion({
        id,
        devotionName,
        devotionRole,
        devotionPeriod,
        academicYear,
        devotionDescription,
        devotionValue,
        devotionFile
    }) {

        const updatedDevotion = await Devotions.update({
            devotionName,
            devotionRole,
            devotionPeriod,
            academicYear,
            devotionDescription,
            devotionValue,
            devotionFile
        }, {
            where: { id }
        });

        return updatedDevotion;

    };

    /* ------------------- End Handle Lecturer Update Devotion ------------------- */


    /* ------------------- Handle Lecturer Delete Devotion ------------------- */

    static async handleLecturerDeleteDevotion({ id }) {

        const deletedDevotion = await Devotions.destroy({ where: { id } });

        return deletedDevotion;

    };

    /* ------------------- End Handle Lecturer Delete Devotion ------------------- */


};

module.exports = LecturerDevotionRepository;