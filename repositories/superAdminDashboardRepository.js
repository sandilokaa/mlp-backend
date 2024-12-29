const { 
    Reports, 
    Patents,
    IPRights,
    Researchs,
    Devotions,
    SuperAdmins 
} = require("../models");
const { Sequelize, where } = require("sequelize");

class SuperAdminDashboardRepository{


    /* ------------------- Handle Get All Publication ------------------- */

    static async handleGetAllPublicationDashboard() {
        const query = {
            where: { reportType: 'Publikasi' },
            attributes: [
                [Sequelize.fn('count', Sequelize.col('Reports.id')), 'total']
            ],
            include: [
                {
                    model: SuperAdmins,
                    attributes: ['groupName'],
                    required: true,
                },
            ],
            group: ['SuperAdmin.groupName'],
        };
    
        const getPublication = await Reports.findAll(query);
    
        const formattedResult = getPublication.map(item => ({
            groupName: item.SuperAdmin ? item.SuperAdmin.groupName : undefined,
            total: item.get('total')
        }));
    
        return {
            counts: formattedResult
        };
    };

    /* ------------------- End Handle Get All Publication ------------------- */
    
    
    /* ------------------- Handle Get All Patent ------------------- */

    static async handleGetAllPatentDashboard() {
        const query = {
            where: { reportType: 'Paten' },
            attributes: [
                [Sequelize.fn('count', Sequelize.col('Reports.id')), 'total']
            ],
            include: [
                {
                    model: SuperAdmins,
                    attributes: ['groupName'],
                    required: true,
                },
            ],
            group: ['SuperAdmin.groupName'],
        };
    
        const getPublication = await Reports.findAll(query);
    
        const formattedResult = getPublication.map(item => ({
            groupName: item.SuperAdmin ? item.SuperAdmin.groupName : undefined,
            total: item.get('total')
        }));
    
        return {
            counts: formattedResult
        };
    };

    /* ------------------- End Handle Get All Patent ------------------- */
    
    
    /* ------------------- Handle Get All IPRight ------------------- */

    static async handleGetAllIPRightDashboard() {
        const query = {
            where: { reportType: 'HAKI' },
            attributes: [
                [Sequelize.fn('count', Sequelize.col('Reports.id')), 'total']
            ],
            include: [
                {
                    model: SuperAdmins,
                    attributes: ['groupName'],
                    required: true,
                },
            ],
            group: ['SuperAdmin.groupName'],
        };
    
        const getPublication = await Reports.findAll(query);
    
        const formattedResult = getPublication.map(item => ({
            groupName: item.SuperAdmin ? item.SuperAdmin.groupName : undefined,
            total: item.get('total')
        }));
    
        return {
            counts: formattedResult
        };
    };

    /* ------------------- End Handle Get All IPRight ------------------- */
    
    
    /* ------------------- Handle Get All Research ------------------- */

    static async handleGetAllResearchDashboard() {
        const query = {
            where: { reportType: 'Penelitian' },
            attributes: [
                [Sequelize.fn('count', Sequelize.col('Reports.id')), 'total']
            ],
            include: [
                {
                    model: SuperAdmins,
                    attributes: ['groupName'],
                    required: true,
                },
            ],
            group: ['SuperAdmin.groupName'],
        };
    
        const getPublication = await Reports.findAll(query);
    
        const formattedResult = getPublication.map(item => ({
            groupName: item.SuperAdmin ? item.SuperAdmin.groupName : undefined,
            total: item.get('total')
        }));
    
        return {
            counts: formattedResult
        };
    };

    /* ------------------- End Handle Get All Research ------------------- */
    
    
    /* ------------------- Handle Get All Devotion ------------------- */

    static async handleGetAllDevotionDashboard() {
        const query = {
            where: { reportType: 'Pengabdian' },
            attributes: [
                [Sequelize.fn('count', Sequelize.col('Reports.id')), 'total']
            ],
            include: [
                {
                    model: SuperAdmins,
                    attributes: ['groupName'],
                    required: true,
                },
            ],
            group: ['SuperAdmin.groupName'],
        };
    
        const getPublication = await Reports.findAll(query);
    
        const formattedResult = getPublication.map(item => ({
            groupName: item.SuperAdmin ? item.SuperAdmin.groupName : undefined,
            total: item.get('total')
        }));
    
        return {
            counts: formattedResult
        };
    };

    /* ------------------- End Handle Get All Devotion ------------------- */

};

module.exports = SuperAdminDashboardRepository;