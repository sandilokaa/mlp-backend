const { 
    SuperAdmins, 
    SuperAdminPersonals, 
    SuperAdminEducations,
    SuperAdminDetails,
    Lecturers,
    LecturerPersonals,
    LecturerEducations,
    LecturerDetails,
    Devotions,
    Assignments
} = require("../models");
const { Op, where } = require("sequelize");

class SuperAdminRepository {

    
    /* ------------------- Handle Get Detail Superadmin ------------------- */

    static async handleGetDetailSuperAdmin({ superAdminId }) {

        const query = {
            where: {superAdminId},
            attributes: [
                'superAdminId',
            ],
            include: [
                {
                    model: SuperAdmins,
                    attributes: ['name', 'email', 'groupName']
                },
                {
                    model: SuperAdminPersonals,
                    attributes: ['nip', 'address', 'gender', 'placeOfBirth', 'dateOfBirth', 'phoneNumber']
                },
                {
                    model: SuperAdminEducations,
                    attributes: ['bachelor', 'magister', 'doctor']
                }
            ]
        };

        const getDetailSuperAdmin = await SuperAdminDetails.findOne(query);

        return getDetailSuperAdmin;

    };

    /* ------------------- End Handle Get Detail Superadmin ------------------- */


    /* ------------------- Handle Get Super Admin By Id ------------------- */

    static async handleGetSuperAdminById({ id }) {

        const getSuperAdminById = await SuperAdmins.findOne({
            where: { id }
        });

        return getSuperAdminById;

    };

    /* ------------------- End Handle Get Super Admin By Id ------------------- */


    /* ------------------- Handle Get Super Admin Personal By User Id ------------------- */

    static async handleGetSuperAdminPersonalByUserId({ superAdminId }) {

        const getSuperAdminPersonalByUserId = await SuperAdminPersonals.findOne({
            where: { superAdminId }
        });

        return getSuperAdminPersonalByUserId;

    };

    /* ------------------- End Handle Get Super Admin Personal By User Id ------------------- */


    /* ------------------- Handle Get Super Admin Education By User Id ------------------- */

    static async handleGetSuperAdminEducationByUserId({ superAdminId }) {

        const getSuperAdminEducationByUserId = await SuperAdminEducations.findOne({
            where: { superAdminId }
        });

        return getSuperAdminEducationByUserId;

    };

    /* ------------------- End Handle Get Super Admin Education By User Id ------------------- */


    
    /* ------------------- Handle Update Profile Super Admin ------------------- */
    
    static async handleUpdateProfileSuperAdmin({
        id,
        name,
        email,
        password,
        groupName,
        role
    }) {
        
        const updatedSuperAdmin = await SuperAdmins.update({
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

        return updatedSuperAdmin;

    };
    
    /* ------------------- End Handle Update Profile Super Admin ------------------- */


    /* ------------------- Handle Update Profile Super Admin Personal ------------------- */
    
    static async handleUpdateProfileSuperAdminPersonal({
        superAdminId,
        nip,
        address,
        gender,
        phoneNumber,
        placeOfBirth,
        dateOfBirth
    }) {
        
        const updatedSuperAdminPersonal = await SuperAdminPersonals.update({
            nip,
            address,
            gender,
            phoneNumber,
            placeOfBirth,
            dateOfBirth
        },
            { 
                where: { superAdminId } 
            }
        );

        return updatedSuperAdminPersonal;

    };
    
    /* ------------------- End Handle Update Profile Super Admin Personal ------------------- */


    /* ------------------- Handle Update Profile Super Admin Eduction ------------------- */
    
    static async handleUpdateProfileSuperAdminEducation({
        superAdminId,
        bachelor,
        magister,
        doctor
    }) {
        
        const updatedSuperAdminEduction = await SuperAdminEducations.update({
            bachelor,
            magister,
            doctor
        },
            { 
                where: { superAdminId } 
            }
        );

        return updatedSuperAdminEduction;

    };
    
    /* ------------------- End Handle Update Profile Super Admin Eduction ------------------- */


    /* ------------------- Handle Create Lecturer By  Super Admin ------------------- */

    static async handleCreateLecturer({ superAdminId, name, email, password, groupName, role }){

        const lectureRegistered = await Lecturers.create({
            superAdminId,
            name,
            email,
            password,
            groupName,
            role
        });

        return lectureRegistered;

    };

    static async handleCreateLecturerPersonal({ lecturerId }){

        const lecturerPersonalRegistered = await LecturerPersonals.create({ lecturerId });

        return lecturerPersonalRegistered;

    };

    static async handleCreateLecturerEducation({ lecturerId }){

        const lecturerEducationRegistered = await LecturerEducations.create({ lecturerId });

        return lecturerEducationRegistered;

    };

    static async handleCreateLecturerDetail({ superAdminId, lecturerId, lecturerPersonalId, lecturerEducationId }){

        const lecturerDetailRegistered = await LecturerDetails.create({ superAdminId, lecturerId, lecturerPersonalId, lecturerEducationId });

        return lecturerDetailRegistered;

    };

    /* ------------------- End Handle Create Lecturer By  Super Admin ------------------- */


    /* ------------------- Handle Get All Lecturer Group ------------------- */

    static async handleGetAllLecturerGroup({ name, groupName, devotionPeriod, academicYear }) {

        const query = {
            where: {},
            attributes: ['id'],
            include: [
                {
                    model: Lecturers,
                    attributes: ['name', 'groupName', 'email'],
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

                if (devotionPeriod) {
                    devotionFilter.devotionPeriod = devotionPeriod;
                }

                if (academicYear) {
                    devotionFilter.academicYear = academicYear;
                }
    
                return {
                    ...detail.dataValues
                };
            })
        );
    
        return lecturerDetails;

    };

    /* ------------------- End Handle Get All Lecturer Group ------------------- */


    /* ------------------- Handle Get Lecture Detail ------------------- */

    static async handleGetLecturerDetail({ id, devotionPeriod, academicYear }){

        const devotionFilter = { lecturerId: id };

        if (devotionPeriod) {
            devotionFilter.devotionPeriod = devotionPeriod;
        }
    
        if (academicYear) {
            devotionFilter.academicYear = academicYear;
        }

        // const [devotionsSum, devotionsCount] = await Promise.all([
        //     Devotions.sum('devotionValue', { where: devotionFilter }),
        //     Devotions.count({ where: devotionFilter }),
        // ]);

        // const [assignmentsSum, assignmentsCount] = await Promise.all([
        //     Assignments.sum('assignmentValue', { where: assignmentFilter }),
        //     Assignments.count({ where: assignmentFilter }),
        // ]);

        // const totalSum = devotionsSum + assignmentsSum;
        // const totalCount = devotionsCount + assignmentsCount;

        // const averageValue = totalCount ? totalSum / totalCount : 0;

        const query = {
            where: {id},
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
                {
                    model: Devotions,
                    attributes: ['id', 'devotionName', 'devotionPeriod'],
                    where: devotionFilter,
                    limit: 3
                },
            ]
        };

        const getDetailLecturer = await LecturerDetails.findOne(query);

        // if (getDetailLecturer) {
        //     getDetailLecturer.dataValues.averageValue = averageValue;
        // }

        return getDetailLecturer;

    };

    /* ------------------- End Handle Get Lecture Detail ------------------- */


    /* ------------------- Handle Get Delete Lecture Detail ------------------- */

    static async handleDeleteLectureById({ id }) {

        const deletedDevotion = await Lecturers.destroy({ where: { id } });

        return deletedDevotion;

    };
    
    static async handleDeleteLecturePersonalById({ id }) {

        const deletedDevotion = await LecturerPersonals.destroy({ where: { id } });

        return deletedDevotion;

    };
    
    static async handleDeleteLectureEducationById({ id }) {

        const deletedDevotion = await LecturerEducations.destroy({ where: { id } });

        return deletedDevotion;

    };
    
    static async handleDeleteLectureDetailById({ id }) {

        const deletedDevotion = await LecturerDetails.destroy({ where: { id } });

        return deletedDevotion;

    };

    /* ------------------- End Handle Get Delete Lecture Detail ------------------- */


};

module.exports = SuperAdminRepository;