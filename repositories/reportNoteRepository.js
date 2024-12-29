const { Reports, SuperAdmins, Notes } = require("../models");
const { Op } = require("sequelize");

class ReportNoteRepository {

    /* ------------------- Handle Create Report ------------------- */

    static async handleCreateReport({ 
        superAdminId,
        reportName,
        reportPeriod,
        academicYear,
        reportStatus,
        reportType,
        reportFile
    }) {

        const createdReport = await Reports.create({
            superAdminId,
            reportName,
            reportPeriod,
            academicYear,
            reportStatus,
            reportType,
            reportFile
        });

        return createdReport;

    };

    /* ------------------- End Handle Create Report ------------------- */


    /* ------------------- Handle Get All Report ------------------- */

    static async handleGetAllReport({ superAdminId, reportPeriod, academicYear }) {

        const query = {
            where: { superAdminId },
            attributes: [
                'id',
                'reportName',
                'reportPeriod',
                'academicYear',
                'reportFile',
                'reportStatus',
                'reportType',
                'updatedAt'
            ]
        };

        if (reportPeriod && academicYear) {
            const searchByPeriod = await Reports.findAll({
                where: {
                    [Op.and]: [
                        { reportPeriod: reportPeriod },
                        { academicYear: academicYear },
                    ]
                },
                attributes: [
                    'id',
                    'reportName',
                    'reportPeriod',
                    'academicYear',
                    'reportFile',
                    'reportStatus',
                    'reportType',
                    'updatedAt'
                ],
                limit: 10
            });

            return searchByPeriod;
        }

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
                'reportType',
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
        reportType,
        reportFile
    }) {

        const updatedReport = await Reports.update({
            reportName,
            reportPeriod,
            academicYear,
            reportStatus,
            reportType,
            reportFile
        }, {
            where: { id }
        });

        return updatedReport;

    };
    
    
    static async handleUpdateReportByDean({
        reportId,
        reportStatus
    }) {

        const updatedReport = await Reports.update({
            reportStatus
        }, {
            where: { id: reportId }
        });

        return updatedReport;

    };

    /* ------------------- End Handle Update Report ------------------- */


    /* ------------------- Handle Get All Report By Dean ------------------- */

    static async handleGetAllReportByDean({ reportPeriod, academicYear }) {

        const query = {
            where: {},
            attributes: [
                'id',
                'reportName',
                'reportPeriod',
                'academicYear',
                'reportFile',
                'reportStatus',
                'reportType',
                'updatedAt'
            ],
            include: [
                {
                    model: SuperAdmins,
                    attributes: ['groupName']
                },
            ],
        };

        if (reportPeriod && academicYear) {
            const searchByPeriod = await Reports.findAll({
                where: {
                    [Op.and]: [
                        { reportPeriod: reportPeriod },
                        { academicYear: academicYear },
                    ]
                },
                attributes: [
                    'id',
                    'reportName',
                    'reportPeriod',
                    'academicYear',
                    'reportFile',
                    'reportStatus',
                    'reportType',
                    'updatedAt'
                ],
                include: [
                    {
                        model: SuperAdmins,
                        attributes: ['groupName']
                    },
                ],
                limit: 10
            });

            return searchByPeriod;
        }

        const getedReport = await Reports.findAll(query);

        return getedReport;

    };

    /* ------------------- End Handle Get All Report By Dean ------------------- */


    /* ------------------- Handle Create Note ------------------- */

    static async handleCreateNote({ 
        reportId,
        superAdminId,
        note
    }) {

        const createdNote = await Notes.create({
            reportId,
            superAdminId,
            note
        });

        return createdNote;

    };

    /* ------------------- End Handle Create Note ------------------- */


    /* ------------------- Handle Get Note By Report Id ------------------- */

    static async handleGetNoteByReportId({ reportId }) {

        const query = {
            where: { reportId },
            attributes: [
                'note',
                'createdAt',
            ]
        };

        const getDevotion = await Notes.findAll(query);

        return getDevotion;

    };

    /* ------------------- End Handle Get Note By Report Id ------------------- */

};

module.exports = ReportNoteRepository;