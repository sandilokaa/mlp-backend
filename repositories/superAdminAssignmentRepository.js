const { 
    Assignments,
    Lecturers
} = require("../models");
const { Op } = require("sequelize");

class SuperAdminAssignmentRepository {

    /* ------------------- Handle Get Assignment By Lecturer Id ------------------- */

    static async handleGetAssignmentBySuperAdminId({ superAdminId, assignmentName, assignmentPeriod, academicYear }) {

        const query = {
            where: { superAdminId },
            attributes: [
                'id',
                'assignmentName',
                'assignmentValue',
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'email']

                }
            ]
        };

        if (assignmentName) {
            query.where[Op.or] = [
                { assignmentName: { [Op.like]: '%' + assignmentName + '%' } }
            ];
        }
        
        if (assignmentPeriod && academicYear) {
            query.where[Op.and] = [
                { assignmentPeriod: assignmentPeriod },
                { academicYear: academicYear }
            ];
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
                'assignmentDescription',
                'assignmentFile',
                'assignmentValue',
                'assignmentPeriod',
                'academicYear'
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name']
                },
            ]
        }

        const getAssignment = Assignments.findOne(query);

        return getAssignment;

    };

    /* ------------------- End  Handle Get Assignment By Id ------------------- */

};

module.exports = SuperAdminAssignmentRepository;