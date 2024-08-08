const reportNoteRepository = require("../repositories/reportNoteRepository");

class ReportNoteService {

    /* ------------------- Handle Create Report ------------------- */

    static async handleCreateReport({ 
        superAdminId,
        reportTitle,
        period,
        ta,
        reportStatus,
        reportFile
    }) {

        try {

            // ------------------------- Payload Validation ------------------------- //

            if (!reportTitle) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Title is required!",
                    data: {
                        reportCreated: null,
                    },
                };
            }

            if (!period) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Period is required!",
                    data: {
                        reportCreated: null,
                    },
                };
            }
            
            if (!ta) {
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
                reportTitle,
                period,
                ta,
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

    static async handleGetAllReport({ superAdminId }){

        try {

            const getedReport = await reportNoteRepository.handleGetAllReport({ superAdminId });

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
        reportTitle,
        period,
        ta,
        reportStatus,
        reportFile
    }) {

        try {

            const getReport = await reportNoteRepository.handleGetReportById({ id });

            if (getReport.id == id) {

                if (!reportTitle){
                    reportTitle = getReport.reportTitle;
                }

                if (!period){
                    period = getReport.period;
                }

                if (!ta){
                    ta = getReport.ta;
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
                reportTitle,
                period,
                ta,
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
    
};

module.exports = ReportNoteService;