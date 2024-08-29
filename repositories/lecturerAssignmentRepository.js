const { Assignments, Lecturers } = require("../models");
const { Op } = require("sequelize");

class LecturerAssignmentRepository{

    /* ------------------- Handle Get Assignment By Lecturer Id ------------------- */

    static async handleGetAssignmentByLecturerId({ lecturerId, assignmentPeriod, academicYear }) {

        const query = {
            where: { lecturerId },
            attributes: [
                'id',
                'assignmentName',
                'assignmentType',
                'assignmentValue'
            ]
        };

        if (assignmentPeriod && academicYear) {
            
            const searchByPeriod = await Assignments.findAll({
                where: {
                    [Op.and]: [
                        { assignmentPeriod: assignmentPeriod },
                        { academicYear: academicYear },
                    ]
                },
                attributes: [
                    'id',
                    'assignmentName',
                    'assignmentType',
                    'assignmentValue'
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

        const getAssignment = await Assignments.findAll(query);

        return getAssignment;

    };

    /* ------------------- End Handle Get Assignment By Lecturer Id ------------------- */


    /* ------------------- Handle Get Assignment By Id ------------------- */

    static async handleGetAssignmentById({ id }) {
        
        const query = {
            where: { id },
            attributes: [
                'id',
                'lecturerId',
                'assignmentName',
                'assignmentType',
                'assignmentValue',
                'assignmentDescription',
                'assignmentFile',
                'assignmentPeriod',
                'academicYear'
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'groupName']
                },
            ]
        }

        const getAssignment = Assignments.findOne(query);

        return getAssignment;

    };

    /* ------------------- End  Handle Get Assignment By Id ------------------- */


    /* ------------------- Handle Lecturer Create assignment ------------------- */

    static async handleLecturerCreateAssignment({
        superAdminId,
        lecturerId, 
        assignmentName,
        assignmentType,
        assignmentDescription,
        assignmentValue,
        assignmentFile,
        assignmentPeriod,
        academicYear
    }) {

        const assignmentCreated = await  Assignments.create({
            superAdminId,
            lecturerId, 
            assignmentName,
            assignmentType,
            assignmentDescription,
            assignmentValue,
            assignmentFile,
            assignmentPeriod,
            academicYear
        });

        return assignmentCreated;

    };

    /* ------------------- End Handle Lecturer Create assignment ------------------- */


    /* ------------------- Handle Lecturer Update Assignment ------------------- */

    static async handleLecturerUpdateAssignment({
        id,
        assignmentName,
        assignmentType,
        assignmentDescription,
        assignmentValue,
        assignmentFile,
        assignmentPeriod,
        academicYear
    }) {

        const updatedAssignment = await Assignments.update({
            assignmentName,
            assignmentType,
            assignmentDescription,
            assignmentValue,
            assignmentFile,
            assignmentPeriod,
            academicYear
        }, {
            where: { id }
        });

        return updatedAssignment;

    };

    /* ------------------- End Handle Lecturer Update Assignment ------------------- */


    /* ------------------- Handle Lecturer Delete Assignment ------------------- */

    static async handleLecturerDeleteAssignment({ id }) {

        const deletedAssignment = await Assignments.destroy({ where: { id } });

        return deletedAssignment;

    };

    /* ------------------- End Handle Lecturer Delete Assignment ------------------- */

};

module.exports = LecturerAssignmentRepository;