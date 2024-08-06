const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');
const { JWT } = require("../libs/jwtSecurity");
const { ROLES } = require("../libs/role");

const authenticateSuperAdmin = async (req, res, next) => {
    
    const authHeader = req.get("Authorization");
    
    let token = "";

    if(authHeader && authHeader.startsWith("Bearer")) {
        
        token = authHeader.split(" ")[1];

    } else {

        return res.status(401).send({
            status: false,
            message: "You must log in to access this resource!",
            data: null,
        });

    }

    try {

        const { email } = jwt.verify(token, JWT.SECRET);

        const getSuperAdminByEmail = await authRepository.handleGetSuperAdminByEmail({ email });

        req.superadmin = getSuperAdminByEmail;

        next();

    } catch(err) {

        return res.status(401).send({
            status: false,
            message:"Your session has expired, please log in again!",
            data: null,
        });

    } 

};


const authenticateLecturer = async (req, res, next) => {
    
    const authHeader = req.get("Authorization");
    
    let token = "";

    if(authHeader && authHeader.startsWith("Bearer")) {
        
        token = authHeader.split(" ")[1];

    } else {

        return res.status(401).send({
            status: false,
            message: "You must log in to access this resource!",
            data: null,
        });

    }

    try {

        const { email } = jwt.verify(token, JWT.SECRET);

        const getLecturerByEmail = await authRepository.handleGetLecturerByEmail({ email });

        req.lecturer = getLecturerByEmail;

        next();

    } catch(err) {

        return res.status(401).send({
            status: false,
            message:"Your session has expired, please log in again!",
            data: null,
        });

    } 

};

const authorizeSuperAdmin = (allowedRole) => {
    return (req, res, next) => {

        const { role } = req.superadmin;

        if (!role || role !== allowedRole) {
            return res.status(403).json({
                status: false,
                message: "You do not have permission to perform this update.",
                data: null,
            });
        }

        next();
    };
};

const authorizeLecturer = (allowedRole) => {
    return (req, res, next) => {

        const { role } = req.lecturer;

        if (!role || role !== allowedRole) {
            return res.status(403).json({
                status: false,
                message: "You do not have permission to perform this update.",
                data: null,
            });
        }

        next();
    };
};


module.exports = { 
    authenticateSuperAdmin, 
    authenticateLecturer,
    authorizeSuperAdmin,
    authorizeLecturer 
};