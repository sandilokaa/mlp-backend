const { Reports } = require("../models");

class ReportNoteRepository {

    /* ------------------- Handle Create Report ------------------- */

    static async handleCreateReport({ 
        superAdminId,
        reportTitle,
        period,
        ta,
        reportStatus,
        reportFile
    }) {

        const createdReport = await Reports.create({
            superAdminId,
            reportTitle,
            period,
            ta,
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
                'reportTitle',
                'period',
                'ta',
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
                'reportTitle',
                'period',
                'ta',
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
        reportTitle,
        period,
        ta,
        reportStatus,
        reportFile
    }) {

        const updatedReport = await Reports.update({
            reportTitle,
            period,
            ta,
            reportStatus,
            reportFile
        }, {
            where: { id }
        });

        return updatedReport;

    };

    /* ------------------- End Handle Update Report ------------------- */

};

module.exports = ReportNoteRepository;