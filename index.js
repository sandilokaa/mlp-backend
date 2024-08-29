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
const superAdminGiveValueController = require("./controllers/superAdminGiveValueController");
const superAdminDevotionController = require("./controllers/superAdminDevotionController");
const superAdminAssignmentController = require("./controllers/superAdminAssignmentController");

const lecturerController = require("./controllers/lecturerController");
const lecturerDevotionController = require("./controllers/lecturerDevotionController");
const lecturerAssignmentController = require("./controllers/lecturerAssignmentController");

const reportNoteController = require("./controllers/reportNoteController");

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

app.get('/api/v1/superadmin', middleware.authenticateSuperAdmin, superAdminController.handleGetDetailSuperAdmin);
app.put('/api/v1/superadmin/:id', middleware.authenticateSuperAdmin, superAdminController.handleUpdateProfileSuperAdmin);

app.post('/api/v1/superadmin/lecturer', middleware.authenticateSuperAdmin, middleware.authorizeSuperAdmin(ROLES.EXPERTISE_GROUP), superAdminController.handleCreateLecturer);
app.get('/api/v1/superadmin/lecturer/:id', middleware.authenticateSuperAdmin, superAdminController.handleGetLecturerDetail);
app.delete('/api/v1/superadmin/lecturer/:id', middleware.authenticateSuperAdmin, superAdminController.handleDeleteLectureById);
app.get('/api/v1/superadmin/lecturer', middleware.authenticateSuperAdmin, superAdminController.handleGetAllLecturerGroup);

app.get('/api/v1/superadmin/:superAdminId/devotion', middleware.authenticateSuperAdmin, superAdminDevotionController.handleGetDevotionBySuperAdminId);
app.get('/api/v1/superadmin/devotion/:id', middleware.authenticateLecturer, superAdminDevotionController.handleGetDevotionById);
app.put('/api/v1/superadmin/devotion/value/:id', middleware.authenticateSuperAdmin, middleware.authorizeSuperAdmin(ROLES.EXPERTISE_GROUP), superAdminGiveValueController.handleUpdateDevotionValue);

app.get('/api/v1/superadmin/:superAdminId/assignment', middleware.authenticateSuperAdmin, superAdminAssignmentController.handleGetAssignmentBySuperAdminId);
app.get('/api/v1/superadmin/assignment/:id', middleware.authenticateLecturer, superAdminAssignmentController.handleGetAssignmentById);
app.put('/api/v1/superadmin/assignment/value/:id', middleware.authenticateSuperAdmin, middleware.authorizeSuperAdmin(ROLES.EXPERTISE_GROUP), superAdminGiveValueController.handleUpdateAssignmentValue);

app.get('/api/v1/superadmin/:superAdminId/report', middleware.authenticateSuperAdmin, reportNoteController.handleGetAllReport);
app.get('/api/v1/superadmin/report/:id', middleware.authenticateSuperAdmin, reportNoteController.handleGetReportById);
app.post('/api/v1/superadmin/report', middleware.authenticateSuperAdmin, middleware.authorizeSuperAdmin(ROLES.EXPERTISE_GROUP), fileUpload.single('reportFile'), reportNoteController.handleCreateReport);
app.put('/api/v1/superadmin/report/:id', middleware.authenticateSuperAdmin, fileUpload.single('reportFile'), reportNoteController.handleUpdateReport);
app.get('/api/v1/superadmin/report', middleware.authenticateSuperAdmin, reportNoteController.handleGetAllReportByDean);

app.post('/api/v1/superadmin/note', middleware.authenticateSuperAdmin, middleware.authorizeSuperAdmin(ROLES.FACULTY_DEAN), reportNoteController.handleCreateNote);
app.post('/api/v1/superadmin/note/done', middleware.authenticateSuperAdmin, middleware.authorizeSuperAdmin(ROLES.FACULTY_DEAN), reportNoteController.handleUpdateNoteStatus);
app.get('/api/v1/superadmin/:reportId/note', middleware.authenticateSuperAdmin, reportNoteController.handleGetNoteByReportId);

/* -------------- End Super Admin Endpoint -------------- */


/* -------------- Lecturer Endpoint -------------- */

app.get('/api/v1/lecturer', middleware.authenticateLecturer, lecturerController.handleGetDetailLecturer);
app.put('/api/v1/lecturer/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerController.handleUpdateProfileLecturer);

app.get('/api/v1/lecturer/group', middleware.authenticateLecturer, lecturerController.handleGetAllLecturerExpertiseGroup);
app.get('/api/v1/lecturer/group/:id', middleware.authenticateLecturer, lecturerController.handleGetLecturerExpertiseGroupById);

app.get('/api/v1/lecturer/devotion/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerDevotionController.handleGetDevotionById);
app.get('/api/v1/lecturer/devotion', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerDevotionController.handleGetDevotionByLecturerId);
app.post('/api/v1/lecturer/devotion', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), fileUpload.single('devotionFile'), lecturerDevotionController.handleLecturerCreateDevotion);
app.put('/api/v1/lecturer/devotion/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), fileUpload.single('devotionFile'), lecturerDevotionController.handleLecturerUpdateDevotion);
app.delete('/api/v1/lecturer/devotion/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerDevotionController.handleLecturerDeleteDevotion);

app.get('/api/v1/lecturer/assignment/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerAssignmentController.handleGetAssignmentById);
app.get('/api/v1/lecturer/assignment', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerAssignmentController.handleGetAssignmentByLecturerId);
app.post('/api/v1/lecturer/assignment', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), fileUpload.single('assignmentFile'), lecturerAssignmentController.handleLecturerCreateAssignment);
app.put('/api/v1/lecturer/assignment/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), fileUpload.single('assignmentFile'), lecturerAssignmentController.handleLecturerUpdateAssignment);
app.delete('/api/v1/lecturer/assignment/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerAssignmentController.handleLecturerDeleteAssignment);

/* -------------- End Lecturer Endpoint -------------- */


// ------------------------- End Define Routes ------------------------- //


// ------------------------- Server Listen ------------------------- //

app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT http://localhost:${PORT}`);
});

// ------------------------- End Server Listen ------------------------- //

module.exports = app;