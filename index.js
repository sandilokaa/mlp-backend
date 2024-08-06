const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 8080;

const fileUpload = require("./utils/fileUpload");
const { ROLES } = require("./libs/role");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// ------------------------- Public File Access ------------------------- //

app.use("/storages", express.static(path.join(__dirname, "storages")));

// ------------------------- End Public File Access ------------------------- //



// ------------------------- Import Controllers ------------------------- //

const authController = require("./controllers/authController");
const superAdminController = require("./controllers/superAdminController");
const lecturerController = require("./controllers/lecturerController");

// ------------------------- End Import Controllers ------------------------- //



// ------------------------- Import middlewares ------------------------- //

const middleware = require("./middlewares/auth");

// ------------------------- End Import middlewares ------------------------- //



// ------------------------- Define Routes ------------------------- //


/* -------------- Auth Endpoint -------------- */

app.post('/api/v1/auth/superadmin/login', authController.handleSuperAdminLogin);
app.get('/api/v1/auth/superadmin/me', middleware.authenticateSuperAdmin, authController.handleCurrentSuperAdmin);
app.post('/api/v1/auth/lecturer/login', authController.handleLecturerLogin);
app.get('/api/v1/auth/lecturer/me', middleware.authenticateLecturer, authController.handleCurrentLecturer);

/* -------------- End Auth Endpoint -------------- */


/* -------------- Super Admin Endpoint -------------- */

app.put('/api/v1/superadmin/:id', middleware.authenticateSuperAdmin, superAdminController.handleUpdateProfileSuperAdmin);
app.post('/api/v1/superadmin', middleware.authenticateSuperAdmin, superAdminController.handleCreateLecturer);
app.get('/api/v1/superadmin/:superAdminId/lecturer', middleware.authenticateSuperAdmin, middleware.authorizeSuperAdmin(ROLES.EXPERTISE_GROUP), superAdminController.handleGetLecturerBySuperAdminId);
app.get('/api/v1/superadmin/:superAdminId/research', middleware.authenticateSuperAdmin, middleware.authorizeSuperAdmin(ROLES.EXPERTISE_GROUP), superAdminController.handleGetResearchBySuperAdminId);
app.get('/api/v1/superadmin/research', middleware.authenticateSuperAdmin, middleware.authorizeSuperAdmin(ROLES.FACULTY_DEAN), superAdminController.handleGetAllResearchByFacultyDean);
app.get('/api/v1/superadmin/lecturer', middleware.authenticateSuperAdmin, middleware.authorizeSuperAdmin(ROLES.FACULTY_DEAN), superAdminController.handleGetAllLecturerByFacultyDean);

/* -------------- End Super Admin Endpoint -------------- */


/* -------------- Lecturer Endpoint -------------- */

app.get('/api/v1/lecturer', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerController.handleGetDetailLecturer);
app.put('/api/v1/lecturer/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerController.handleUpdateProfileLecturer);
app.get('/api/v1/lecturer/research', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerController.handleGetResearchByLecturerId);
app.get('/api/v1/lecturer/research/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerController.handleGetResearchById);
app.post('/api/v1/lecturer/research', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), fileUpload.single('researchFile'), lecturerController.handleLecturerCreateResearch);
app.put('/api/v1/lecturer/research/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), fileUpload.single('researchFile'), lecturerController.handleLecturerUpdateResearch);
app.delete('/api/v1/lecturer/research/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerController.handleLecturerDeleteResearch);

/* -------------- End Lecturer Endpoint -------------- */


// ------------------------- End Define Routes ------------------------- //


// ------------------------- Server Listen ------------------------- //

app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT http://localhost:${PORT}`);
});

// ------------------------- End Server Listen ------------------------- //

module.exports = app;