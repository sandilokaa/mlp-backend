const { 
    Lecturers, 
    LecturerPersonals, 
    LecturerEducations,
    LecturerDetails,
    Devotions,
    Assignments
} = require("../models");
const { Op, where } = require("sequelize");

class LecturerRepository {

    /* ------------------- Handle Get Lecturer By Id ------------------- */

    static async handleGetLecturerById({ id }) {

        const getLecturerById = await Lecturers.findOne({
            where: { id }
        });

        return getLecturerById;

    };

    /* ------------------- End Handle Get Lecturer By Id ------------------- */


    /* ------------------- Handle Get Lecturer Personal By User Id ------------------- */

    static async handleGetLecturerPersonalByUserId({ lecturerId }) {

        const getLecturerPersonalByUserId = await LecturerPersonals.findOne({
            where: { lecturerId }
        });

        return getLecturerPersonalByUserId;

    };

    /* ------------------- End Handle Get Lecturer Personal By User Id ------------------- */


    /* ------------------- Handle Get Lecturer Education By User Id ------------------- */

    static async handleGetLecturerEducationByUserId({ lecturerId }) {

        const getLecturerEducationByUserId = await LecturerEducations.findOne({
            where: { lecturerId }
        });

        return getLecturerEducationByUserId;

    };

    /* ------------------- End Handle Get Lecturer Education By User Id ------------------- */



    /* ------------------- Handle Update Profile Lecturer ------------------- */

    static async handleUpdateProfileLecturer({
        id,
        name,
        email,
        password,
        groupName,
        role
    }) {
        
        const updatedLecturer = await Lecturers.update({
            name, 
            email, 
            password, 
            groupName,
            role
        },
            { 
                where: { id } 
            }
        );

        return updatedLecturer;

    };

    /* ------------------- End Handle Update Profile Lecturer ------------------- */


    /* ------------------- Handle Update Profile Lecturer Personal ------------------- */

    static async handleUpdateProfileLecturerPersonal({
        lecturerId,
        nip,
        address,
        gender,
        phoneNumber,
        placeOfBirth,
        dateOfBirth,
    }) {
        
        const updatedLecturerPersonal = await LecturerPersonals.update({
            nip,
            address,
            gender,
            phoneNumber,
            placeOfBirth,
            dateOfBirth,
        },
            { 
                where: { lecturerId } 
            }
        );

        return updatedLecturerPersonal;

    };

    /* ------------------- End Handle Update Profile Lecturer Personal ------------------- */


    /* ------------------- Handle Update Profile Lecturer Eduction ------------------- */

    static async handleUpdateProfileLecturerEducation({
        lecturerId,
        bachelor,
        magister,
        doctor
    }) {
        
        const updatedLecturerEduction = await LecturerEducations.update({
            bachelor,
            magister,
            doctor
        },
            { 
                where: { lecturerId } 
            }
        );

        return updatedLecturerEduction;

    };

    /* ------------------- End Handle Update Profile Lecturer Eduction ------------------- */


    /* ------------------- Handle Get Detail Lecturer ------------------- */

    static async handleGetDetailLecturer({ lecturerId, devotionPeriod, assignmentPeriod, academicYear }) {

        const devotionFilter = { lecturerId };
        const assignmentFilter = { lecturerId };

        if (devotionPeriod) {
            devotionFilter.devotionPeriod = devotionPeriod;
        }
    
        if (assignmentPeriod) {
            assignmentFilter.assignmentPeriod = assignmentPeriod;
        }
    
        if (academicYear) {
            devotionFilter.academicYear = academicYear;
            assignmentFilter.academicYear = academicYear;
        }

        const [devotionsSum, devotionsCount] = await Promise.all([
            Devotions.sum('devotionValue', { where: devotionFilter }),
            Devotions.count({ where: devotionFilter }),
        ]);
        
        const [assignmentsSum, assignmentsCount] = await Promise.all([
            Assignments.sum('assignmentValue', { where: assignmentFilter }),
            Assignments.count({ where: assignmentFilter }),
        ]);

        const totalSum = devotionsSum + assignmentsSum;
        const totalCount = devotionsCount + assignmentsCount;

        const averageValue = totalCount ? totalSum / totalCount : 0;

        const query = {
            where: {lecturerId},
            attributes: [
                'lecturerId',
            ],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'email', 'groupName']
                },
                {
                    model: LecturerPersonals,
                    attributes: ['nip', 'address', 'gender', 'placeOfBirth', 'dateOfBirth', 'phoneNumber']
                },
                {
                    model: LecturerEducations,
                    attributes: ['bachelor', 'magister', 'doctor']
                },
            ]
        };

        const getDetailLecturer = await LecturerDetails.findOne(query);

        if (getDetailLecturer) {
            getDetailLecturer.dataValues.averageValue = averageValue;
        }

        return getDetailLecturer;

    };

    /* ------------------- End Handle Get Detail Lecturer ------------------- */


    /* ------------------- Handle Get All Lecturer Expertise Group ------------------- */

    static async handleGetAllLecturerExpertiseGroup({ name, groupName, devotionPeriod, assignmentPeriod, academicYear }) {
        const query = {
            where: {},
            attributes: ['id'],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'groupName'],
                    where: {},
                },
            ],
        };
    
        if (name && groupName) {
            query.include[0].where.name = { [Op.like]: `%${name}%` };
            query.include[0].where.groupName = { [Op.like]: `%${groupName}%` };
        } else if (name) { 
            query.include[0].where.name = { [Op.like]: `%${name}%` };
        } else if (groupName) {
            query.include[0].where.groupName = { [Op.like]: `%${groupName}%` };
        }
    
        let lecturerDetails = await LecturerDetails.findAll(query);
    
        lecturerDetails = await Promise.all(
            lecturerDetails.map(async detail => {
                const lecturerId = detail.id;
    
                const devotionFilter = { lecturerId };
                const assignmentFilter = { lecturerId };

                if (devotionPeriod) {
                    devotionFilter.devotionPeriod = devotionPeriod;
                }
                
                if (assignmentPeriod) {
                    assignmentFilter.assignmentPeriod = assignmentPeriod;
                }

                if (academicYear) {
                    devotionFilter.academicYear = academicYear;
                    assignmentFilter.academicYear = academicYear;
                }
    
                const [devotionsSum, devotionsCount] = await Promise.all([
                    Devotions.sum('devotionValue', { where: devotionFilter }),
                    Devotions.count({ where: devotionFilter }),
                ]);
    
                const [assignmentsSum, assignmentsCount] = await Promise.all([
                    Assignments.sum('assignmentValue', { where: assignmentFilter }),
                    Assignments.count({ where: assignmentFilter }),
                ]);
    
                const totalSum = devotionsSum + assignmentsSum;
                const totalCount = devotionsCount + assignmentsCount;
    
                const averageValue = totalCount ? totalSum / totalCount : 0;
    
                return {
                    ...detail.dataValues,
                    averageValue
                };
            })
        );
    
        return lecturerDetails;

    };

    /* ------------------- End Handle Get All Lecturer Expertise Group ------------------- */


    /* ------------------- Handle Get Lecturer Expertise Group By Id ------------------- */

    static async handleGetLecturerExpertiseGroupById({ id, devotionPeriod, assignmentPeriod, academicYear }) {

        const devotionFilter = { lecturerId: id };
        const assignmentFilter = { lecturerId: id };

        if (devotionPeriod) {
            devotionFilter.devotionPeriod = devotionPeriod;
        }
    
        if (assignmentPeriod) {
            assignmentFilter.assignmentPeriod = assignmentPeriod;
        }
    
        if (academicYear) {
            devotionFilter.academicYear = academicYear;
            assignmentFilter.academicYear = academicYear;
        }
    
        const [devotionsSum, devotionsCount] = await Promise.all([
            Devotions.sum('devotionValue', { where: devotionFilter }),
            Devotions.count({ where: devotionFilter }),
        ]);
    
        const [assignmentsSum, assignmentsCount] = await Promise.all([
            Assignments.sum('assignmentValue', { where: assignmentFilter }),
            Assignments.count({ where: assignmentFilter }),
        ]);
    
        const totalSum = devotionsSum + assignmentsSum;
        const totalCount = devotionsCount + assignmentsCount;
    
        const averageValue = totalCount ? totalSum / totalCount : 0;
    
        const query = {
            where: { id },
            attributes: ['lecturerId'],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'email', 'groupName']
                },
                {
                    model: LecturerPersonals,
                    attributes: ['nip', 'address', 'gender', 'placeOfBirth', 'dateOfBirth', 'phoneNumber']
                },
                {
                    model: LecturerEducations,
                    attributes: ['bachelor', 'magister', 'doctor']
                },
                {
                    model: Devotions,
                    attributes: ['id', 'devotionName', 'devotionValue'],
                    where: devotionFilter,
                    limit: 3
                },
                {
                    model: Assignments,
                    attributes: ['id', 'assignmentName', 'assignmentValue'],
                    where: assignmentFilter,
                    limit: 3
                }
            ]
        };
    
        const getDetailLecturer = await LecturerDetails.findOne(query);
    
        if (getDetailLecturer) {
            getDetailLecturer.dataValues.averageValue = averageValue;
        }
    
        return getDetailLecturer;
    };

    /* ------------------- End Handle Get Lecturer Expertise Group By Id ------------------- */


};

module.exports = LecturerRepository;