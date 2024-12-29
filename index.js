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
const superAdminDevotionController = require("./controllers/superAdminDevotionController");
const superAdminResearchController = require("./controllers/superAdminResearchController");
const superAdminPublicationController = require("./controllers/superAdminPublicationController");
const superAdminPatentController = require("./controllers/superAdminPatentController");
const superAdminIPRightController = require("./controllers/superAdminIPRightController");
const superAdminDashboardController = require("./controllers/superAdminDashboardController");

const lecturerController = require("./controllers/lecturerController");
const lecturerDevotionController = require("./controllers/lecturerDevotionController");
const lecturerResearchController = require("./controllers/lecturerResearchController");
const lecturerPublicationController = require("./controllers/lecturerPublicationController");
const lecturerPatentController = require("./controllers/lecturerPatentController");
const lecturerIPRightController = require("./controllers/lecturerIPRightController");

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
app.get('/api/v1/superadmin/devotion/:id', middleware.authenticateSuperAdmin, superAdminDevotionController.handleGetDevotionById);

app.get('/api/v1/superadmin/:superAdminId/research', middleware.authenticateSuperAdmin, superAdminResearchController.handleGetResearchBySuperAdminId);
app.get('/api/v1/superadmin/research/:id', middleware.authenticateSuperAdmin, superAdminResearchController.handleGetResearchById);

app.get('/api/v1/superadmin/:superAdminId/publication', middleware.authenticateSuperAdmin, superAdminPublicationController.handleGetPublicationBySuperAdminId);
app.get('/api/v1/superadmin/publication/:id', middleware.authenticateSuperAdmin, superAdminPublicationController.handleGetPublicationById);

app.get('/api/v1/superadmin/:superAdminId/patent', middleware.authenticateSuperAdmin, superAdminPatentController.handleGetPatentBySuperAdminId);
app.get('/api/v1/superadmin/patent/:id', middleware.authenticateSuperAdmin, superAdminPatentController.handleGetPatentById);

app.get('/api/v1/superadmin/:superAdminId/ipright', middleware.authenticateSuperAdmin, superAdminIPRightController.handleGetIPRightBySuperAdminId);
app.get('/api/v1/superadmin/ipright/:id', middleware.authenticateSuperAdmin, superAdminIPRightController.handleGetIPRightById);

app.get('/api/v1/superadmin/dashboard/publications', middleware.authenticateSuperAdmin, superAdminDashboardController.handleGetAllPublicationDashboard);
app.get('/api/v1/superadmin/dashboard/patents', middleware.authenticateSuperAdmin, superAdminDashboardController.handleGetAllPatentDashboard);
app.get('/api/v1/superadmin/dashboard/iprights', middleware.authenticateSuperAdmin, superAdminDashboardController.handleGetAllIPRightDashboard);
app.get('/api/v1/superadmin/dashboard/researchs', middleware.authenticateSuperAdmin, superAdminDashboardController.handleGetAllResearchDashboard);
app.get('/api/v1/superadmin/dashboard/devotions', middleware.authenticateSuperAdmin, superAdminDashboardController.handleGetAllDevotionDashboard);

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

app.get('/api/v1/lecturer/research/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerResearchController.handleGetResearchById);
app.get('/api/v1/lecturer/research', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerResearchController.handleGetResearchByLecturerId);
app.post('/api/v1/lecturer/research', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), fileUpload.single('researchFile'), lecturerResearchController.handleLecturerCreateResearch);
app.put('/api/v1/lecturer/research/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), fileUpload.single('researchFile'), lecturerResearchController.handleLecturerUpdateResearch);
app.delete('/api/v1/lecturer/research/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerResearchController.handleLecturerDeleteResearch);

app.get('/api/v1/lecturer/publication/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerPublicationController.handleGetPublicationById);
app.get('/api/v1/lecturer/publication', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerPublicationController.handleGetPublicationByLecturerId);
app.post('/api/v1/lecturer/publication', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), fileUpload.single('publicationFile'), lecturerPublicationController.handleLecturerCreatePublication);
app.put('/api/v1/lecturer/publication/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), fileUpload.single('publicationFile'), lecturerPublicationController.handleLecturerUpdatePublication);
app.delete('/api/v1/lecturer/publication/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerPublicationController.handleLecturerDeletePublication);


app.get('/api/v1/lecturer/patent/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerPatentController.handleGetPatentById);
app.get('/api/v1/lecturer/patent', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerPatentController.handleGetPatentByLecturerId);
app.post('/api/v1/lecturer/patent', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), fileUpload.single('patentFile'), lecturerPatentController.handleLecturerCreatePatent);
app.put('/api/v1/lecturer/patent/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), fileUpload.single('patentFile'), lecturerPatentController.handleLecturerUpdatePatent);
app.delete('/api/v1/lecturer/patent/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerPatentController.handleLecturerDeletePatent);

app.get('/api/v1/lecturer/ipright/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerIPRightController.handleGetIPRightById);
app.get('/api/v1/lecturer/ipright', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerIPRightController.handleGetIPRightByLecturerId);
app.post('/api/v1/lecturer/ipright', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), fileUpload.single('ipRightFile'), lecturerIPRightController.handleLecturerCreateIPRight);
app.put('/api/v1/lecturer/ipright/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), fileUpload.single('ipRightFile'), lecturerIPRightController.handleLecturerUpdateIPRight);
app.delete('/api/v1/lecturer/ipright/:id', middleware.authenticateLecturer, middleware.authorizeLecturer(ROLES.LECTURER), lecturerIPRightController.handleLecturerDeleteIPRight);

/* -------------- End Lecturer Endpoint -------------- */


// ------------------------- End Define Routes ------------------------- //


// ------------------------- Server Listen ------------------------- //

app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT http://localhost:${PORT}`);
});

// ------------------------- End Server Listen ------------------------- //

module.exports = app;