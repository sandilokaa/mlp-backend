const reportNoteRepository = require("../repositories/reportNoteRepository");

class ReportNoteService {

    /* ------------------- Handle Create Report ------------------- */

    static async handleCreateReport({ 
        superAdminId,
        reportName,
        reportPeriod,
        academicYear,
        reportStatus,
        reportFile
    }) {

        try {

            // ------------------------- Payload Validation ------------------------- //

            if (!reportName) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Title is required!",
                    data: {
                        reportCreated: null,
                    },
                };
            }

            if (!reportPeriod) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Period is required!",
                    data: {
                        reportCreated: null,
                    },
                };
            }
            
            if (!academicYear) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Academic year is required!",
                    data: {
                        reportCreated: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //

            const createdReport = await reportNoteRepository.handleCreateReport({
                superAdminId,
                reportName,
                reportPeriod,
                academicYear,
                reportStatus,
                reportFile
            })

            return {
                status: true,
                status_code: 201,
                message: "Successfully created report",
                data: {
                    reportCreated: createdReport,
                },
            }

            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    reportCreated: null,
                },
            }

        }

    };

    /* ------------------- End Handle Create Report ------------------- */


    /* ------------------- Handle Get All Report ------------------- */

    static async handleGetAllReport({ superAdminId, reportPeriod, academicYear }){

        try {

            const getedReport = await reportNoteRepository.handleGetAllReport({ superAdminId, reportPeriod, academicYear });

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed report (:",
                data: {
                    getedReport: getedReport
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getedReport: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get All Report ------------------- */


    /* ------------------- Handle Get Report By Id ------------------- */

    static async handleGetReportById({ id }){

        try {

            const getReport = await reportNoteRepository.handleGetReportById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    getReport: getReport,
                },
            };

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getReport: null,
                },
            };

        }

    }

    /* ------------------- End Handle Get Report By Id ------------------- */


    /* ------------------- Handle Update Report ------------------- */

    static async handleUpdateReport({
        id,
        superAdminId,
        reportName,
        reportPeriod,
        academicYear,
        reportStatus,
        reportFile
    }) {

        try {

            const getReport = await reportNoteRepository.handleGetReportById({ id });

            if (getReport.id == id) {

                if (!reportName){
                    reportName = getReport.reportName;
                }

                if (!reportPeriod){
                    reportPeriod = getReport.period;
                }

                if (!academicYear){
                    academicYear = getReport.academicYear;
                }
                
                if (!reportStatus){
                    reportStatus = getReport.reportStatus;
                }

                if (!reportFile){
                    reportFile = getReport.reportFile;
                } else {
                    fileRemove(getReport.reportFile)
                }

            }

            const updatedReport = await reportNoteRepository.handleUpdateReport({
                id,
                superAdminId,
                reportName,
                reportPeriod,
                academicYear,
                reportStatus,
                reportFile
            });
            

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    updatedReport: updatedReport
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updatedReport: null,
                },
            };

        }

    };

    /* ------------------- End Handle Update Report ------------------- */


    /* ------------------- Handle Get All Report By Dean ------------------- */

    static async handleGetAllReportByDean({ reportPeriod, academicYear }){

        try {

            const getedReport = await reportNoteRepository.handleGetAllReportByDean({ reportPeriod, academicYear });

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed report (:",
                data: {
                    getedReport: getedReport
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getedReport: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get All Report By Dean ------------------- */


    /* ------------------- Handle Create Note ------------------- */

    static async handleCreateNote({
        reportId,
        superAdminId,
        note,
        reportStatus
    }) {

        try {

            // ------------------------- Payload Validation ------------------------- //

            if (!note) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Note is required!",
                    data: {
                        createdNote: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //

            
            const createdNote = await reportNoteRepository.handleCreateNote({
                reportId,
                superAdminId,
                note
            });

            const updateStatus = await reportNoteRepository.handleUpdateReportByDean({reportId: createdNote.reportId, reportStatus: 'New Comment'});

            return {
                status: true,
                status_code: 201,
                message: "Successfully created report",
                data: {
                    createdNote: createdNote,
                    updateStatus: updateStatus
                },
            }

            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    createdNote: null,
                    updateStatus: null
                },
            }

        }

    };

    /* ------------------- End Handle Create Note ------------------- */


    /* ------------------- Handle Get Note By Report Id ------------------- */

    static async handleGetNoteByReportId({ reportId }){

        try {

            const getNote = await reportNoteRepository.handleGetNoteByReportId({ reportId });

            return {
                status: true,
                status_code: 201,
                message: "Successfully displayed data",
                data: {
                    getNote: getNote
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    getNote: null,
                },
            };

        }

    };

    /* ------------------- End Handle Get Note By Report Id ------------------- */


    /* ------------------- Handle Update Note Status By Id ------------------- */

    static async handleUpdateNoteStatus({ superAdminId, reportStatus, note, reportId }){

        try {
            
            const createdNote = await reportNoteRepository.handleCreateNote({ superAdminId, reportId, note: 'Selesai' });
            
            const updatedReport = await reportNoteRepository.handleUpdateReportByDean({
                reportId: createdNote.reportId,
                reportStatus: createdNote.note
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    createdNote: createdNote,
                    updatedReport: updatedReport
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    createdNote: null,
                    updatedReport: null
                },
            };

        }

    };

    /* ------------------- End Handle Update Note Status By Id ------------------- */
    
};

module.exports = ReportNoteService;