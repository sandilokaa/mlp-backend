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

    static async handleGetDetailLecturer({ lecturerId }) {

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
                }
            ]
        };

        const getDetailLecturer = await LecturerDetails.findOne(query);

        return getDetailLecturer;

    };

    /* ------------------- End Handle Get Detail Lecturer ------------------- */


    /* ------------------- Handle Get All Lecturer Expertise Group ------------------- */

    static async handleGetAllLecturerExpertiseGroup({ name, groupName, devotionPeriod, academicYear }) {
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

                if (academicYear) {
                    devotionFilter.academicYear = academicYear;
                }
    
                return {
                    ...detail.dataValues,
                };
            })
        );
    
        return lecturerDetails;

    };

    /* ------------------- End Handle Get All Lecturer Expertise Group ------------------- */


    /* ------------------- Handle Get Lecturer Expertise Group By Id ------------------- */

    static async handleGetLecturerExpertiseGroupById({ id, devotionPeriod, academicYear }) {

        const devotionFilter = { lecturerId: id };

        if (devotionPeriod) {
            devotionFilter.devotionPeriod = devotionPeriod;
        }
    
        if (academicYear) {
            devotionFilter.academicYear = academicYear;
        }
    
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
                    attributes: ['id', 'devotionName', 'devotionPeriod'],
                    where: devotionFilter,
                    limit: 3
                }
            ]
        };
    
        const getDetailLecturer = await LecturerDetails.findOne(query);
    
        return getDetailLecturer;
    };

    /* ------------------- End Handle Get Lecturer Expertise Group By Id ------------------- */


};

module.exports = LecturerRepository;