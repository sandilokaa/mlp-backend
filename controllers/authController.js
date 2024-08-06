const authService = require("../services/authService");


/* ------------------- Handle Super Admin Login ------------------- */

const handleSuperAdminLogin = async(req, res) => {

    const { email, password } = req.body;

    const { status, status_code, message, data} = await authService.handleSuperAdminLogin({
        email,
        password
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Super Admin Login ------------------- */


/* ------------------- Handle Lecturer Login ------------------- */

const handleLecturerLogin = async(req, res) => {

    const { email, password } = req.body;

    const { status, status_code, message, data} = await authService.handleLecturerLogin({
        email,
        password
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Login ------------------- */


/* ------------------- Handle Current User ------------------- */

const handleCurrentSuperAdmin = async (req, res) => {
    
    const currentUser = req.superadmin;

    res.status(200).send({
        status: true,
        message: "Berhasil mendapatkan data pengguna yang sedang login!",
        data: {
            currentUser: currentUser,
        }
    });
};

/* ------------------- End Handle Current User ------------------- */


/* ------------------- Handle Current User ------------------- */

const handleCurrentLecturer = async (req, res) => {
    
    const currentUser = req.lecturer;

    res.status(200).send({
        status: true,
        message: "Berhasil mendapatkan data pengguna yang sedang login!",
        data: {
            currentUser: currentUser,
        }
    });
};

/* ------------------- End Handle Current User ------------------- */


module.exports = { 
    handleSuperAdminLogin, 
    handleCurrentSuperAdmin,
    handleLecturerLogin,
    handleCurrentLecturer
};
