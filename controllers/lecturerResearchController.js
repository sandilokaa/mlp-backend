const lecturerResearchService = require("../services/lecturerResearchService");


/* ------------------- Handle Get Research By Lecturer Id ------------------- */

const handleGetResearchByLecturerId = async(req, res) => {

    const lecturerId = req.lecturer.id;

    const { researchPeriod, academicYear } = req.query

    const { status, status_code, message, data} = await lecturerResearchService.handleGetResearchByLecturerId({ lecturerId, researchPeriod, academicYear });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

    
};

/* ------------------- End Handle Get Research By Lecturer Id ------------------- */


/* ------------------- Handle Get Research By Id ------------------- */

const handleGetResearchById = async(req, res) => {

    const { id } = req.params;

    const { status, status_code, message, data} = await lecturerResearchService.handleGetResearchById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Research By Id ------------------- */


/* ------------------- Handle Lecturer Create Research ------------------- */

const handleLecturerCreateResearch = async(req, res) => {

    const lecturerId = req.lecturer.id;

    let researchFile = "";

    if (req.file) {
        researchFile = req.file.path;
    }

    const { 
        superAdminId,  
        researchName,
        researchCategory,
        researchPeriod,
        academicYear
    } = req.body;

    const { status, status_code, message, data} = await lecturerResearchService.handleLecturerCreateResearch({
        superAdminId,
        lecturerId, 
        researchName,
        researchCategory,
        researchFile,
        researchPeriod,
        academicYear
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Create Research ------------------- */


/* ------------------- Handle Lecturer Update Research ------------------- */

const handleLecturerUpdateResearch = async(req, res) => {

    const { id } = req.params;

    const lecturerId = req.lecturer.id;

    let researchFile = "";

    if (req.file) {
        researchFile = req.file.path;
    }

    const { 
        superAdminId,  
        researchName,
        researchCategory,
        researchPeriod,
        academicYear
    } = req.body;

    const { status, status_code, message, data} = await lecturerResearchService.handleLecturerUpdateResearch({
        id,
        superAdminId,
        lecturerId, 
        researchName,
        researchCategory,
        researchPeriod,
        academicYear,
        researchFile
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Update Research ------------------- */


/* ------------------- Handle Lecturer Delete Research ------------------- */

const handleLecturerDeleteResearch = async(req, res) => {

    const { id } = req.params;

    const lecturerId = req.lecturer.id;

    const { status, status_code, message, data} = await lecturerResearchService.handleLecturerDeleteResearch({ id, lecturerId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Lecturer Delete Research ------------------- */


module.exports = { 
    handleGetResearchByLecturerId,
    handleGetResearchById,
    handleLecturerCreateResearch,
    handleLecturerUpdateResearch,
    handleLecturerDeleteResearch
};