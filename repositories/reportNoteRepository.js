const { Reports } = require("../models");

class ReportNoteRepository {

    /* ------------------- Handle Create Report ------------------- */

    static async handleCreateReport({ 
        superAdminId,
        reportName,
        reportPeriod,
        academicYear,
        reportStatus,
        reportFile
    }) {

        const createdReport = await Reports.create({
            superAdminId,
            reportName,
            reportPeriod,
            academicYear,
            reportStatus,
            reportFile
        });

        return createdReport;

    };

    /* ------------------- End Handle Create Report ------------------- */


    /* ------------------- Handle Get All Report ------------------- */

    static async handleGetAllReport({ superAdminId }) {

        const query = {
            where: { superAdminId },
            attributes: [
                'id',
                'reportName',
                'reportPeriod',
                'academicYear',
                'reportFile',
                'reportStatus',
                'updatedAt'
            ]
        };

        const getedReport = await Reports.findAll(query);

        return getedReport;

    };

    /* ------------------- End Handle Get All Report ------------------- */


    /* ------------------- Handle Get Report By Id ------------------- */

    static async handleGetReportById({ id }) {
        
        const query = {
            where: { id },
            attributes: [
                'id',
                'reportName',
                'reportPeriod',
                'academicYear',
                'reportFile',
                'reportStatus',
                'updatedAt'
            ]
        };

        const getReport = Reports.findOne(query);

        return getReport;

    };

    /* ------------------- End Handle Get Report By Id ------------------- */


    /* ------------------- Handle Update Report ------------------- */

    static async handleUpdateReport({
        id,
        reportName,
        reportPeriod,
        academicYear,
        reportStatus,
        reportFile
    }) {

        const updatedReport = await Reports.update({
            reportName,
            reportPeriod,
            academicYear,
            reportStatus,
            reportFile
        }, {
            where: { id }
        });

        return updatedReport;

    };

    /* ------------------- End Handle Update Report ------------------- */


    /* ------------------- Handle Get All Report By Dean ------------------- */

    static async handleGetAllReportByDean() {

        const query = {
            where: {},
            attributes: [
                'id',
                'reportName',
                'reportPeriod',
                'academicYear',
                'reportFile',
                'reportStatus',
                'updatedAt'
            ]
        };

        const getedReport = await Reports.findAll(query);

        return getedReport;

    };

    /* ------------------- End Handle Get All Report By Dean ------------------- */

};

module.exports = ReportNoteRepository;