const { Assignments, Lecturers } = require("../models");

class LecturerAssignmentRepository{

    /* ------------------- Handle Get Assignment By Lecturer Id ------------------- */

    static async handleGetAssignmentByLecturerId({ lecturerId }) {

        const query = {
            where: { lecturerId },
            attributes: [
                'id',
                'assignmentName',
                'assignmentType',
                'assignmentValue'
            ]
        };

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
                'assignmentFile'
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
        assignmentFile
    }) {

        const assignmentCreated = await  Assignments.create({
            superAdminId,
            lecturerId, 
            assignmentName,
            assignmentType,
            assignmentDescription,
            assignmentValue,
            assignmentFile
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
        assignmentFile
    }) {

        const updatedAssignment = await Assignments.update({
            assignmentName,
            assignmentType,
            assignmentDescription,
            assignmentValue,
            assignmentFile
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