const { 
    SuperAdmins,
    Lecturers
} = require("../models");

class AuthRepository {

    /* ------------------- Handle Get Super Admin By Email ------------------- */

    static async handleGetSuperAdminByEmail({ email }) {
        
        const getSuperAdminByEmail = await SuperAdmins.findOne({
            where : { email }
        });

        return getSuperAdminByEmail;

    };

    /* ------------------- End Handle Get Super Admin By Email ------------------- */


    /* ------------------- Handle Get Lecture By Email ------------------- */

    static async handleGetLecturerByEmail({ email }) {
        
        const getLecturerByEmail = await Lecturers.findOne({
            where : { email }
        });

        return getLecturerByEmail;

    };

    /* ------------------- End Handle Get Lecture By Email ------------------- */

};

module.exports = AuthRepository;