const authRepository = require("../repositories/authRepository");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT } = require("../libs/jwtSecurity");

class AuthService {

    /* ------------------- Handle Super Admin Login ------------------- */

    static async handleSuperAdminLogin({ email, password }){

        try {
            
            // ------------------------- Payload Validation ------------------------- //

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email is required!",
                    data: {
                        superadminLogin: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password is required!",
                    data: {
                        superadminLogin: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Super Admin password is at least 8 characters long!",
                    data: {
                        superadminLogin: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //


            const getSuperAdminByEmail = await authRepository.handleGetSuperAdminByEmail({ email });

            if (!getSuperAdminByEmail) {
                return {
                    status: false,
                    status_code: 404,
                    message: "Email not registered ):",
                    data: {
                        superadminLogin: null,
                    },
                };
            } else {

                const isPasswordMatch = await bcrypt.compare(password, getSuperAdminByEmail.password);

                if (isPasswordMatch) {

                    const token = jwt.sign({
                        id: getSuperAdminByEmail.id,
                        email: getSuperAdminByEmail.email,
                    },
                        JWT.SECRET,
                        {
                            expiresIn: JWT.EXPIRED,
                        });

                    return {
                        status: true,
                        status_code: 201,
                        message: "Super Admin login successfully!",
                        data: {
                            token,
                        },
                    };

                } else {

                    return {
                        status: false,
                        status_code: 400,
                        message: "Your email or password is incorrect!",
                        data: {
                            superadminLogin: null,
                        },
                    };

                }
            }

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    superadminLogin: null,
                },
            };

        }

    };

    /* ------------------- End Handle Super Admin Login ------------------- */


    /* ------------------- Handle Lecturer Login ------------------- */

    static async handleLecturerLogin({ email, password }){

        try {
            
            // ------------------------- Payload Validation ------------------------- //

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email is required!",
                    data: {
                        lecturerLogin: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password is required!",
                    data: {
                        lecturerLogin: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Lecturer password is at least 8 characters long!",
                    data: {
                        lecturerLogin: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //


            const getLecturerByEmail = await authRepository.handleGetLecturerByEmail({ email });

            if (!getLecturerByEmail) {
                return {
                    status: false,
                    status_code: 404,
                    message: "Email not registered ):",
                    data: {
                        lecturerLogin: null,
                    },
                };
            } else {

                const isPasswordMatch = await bcrypt.compare(password, getLecturerByEmail.password);

                if (isPasswordMatch) {

                    const token = jwt.sign({
                        id: getLecturerByEmail.id,
                        email: getLecturerByEmail.email,
                    },
                        JWT.SECRET,
                        {
                            expiresIn: JWT.EXPIRED,
                        });

                    return {
                        status: true,
                        status_code: 201,
                        message: "Lecturer login successfully!",
                        data: {
                            token,
                        },
                    };

                } else {

                    return {
                        status: false,
                        status_code: 400,
                        message: "Your email or password is incorrect!",
                        data: {
                            lecturerLogin: null,
                        },
                    };

                }
            }

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    lecturerLogin: null,
                },
            };

        }

    };

    /* ------------------- End Handle Lecturer Login ------------------- */

};

module.exports = AuthService;