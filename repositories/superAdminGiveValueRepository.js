const { Devotions, Assignments } = require("../models");


class SuperAdminGiveValueRepository{

    /* ------------------- Handle Get Devotion Value By Id ------------------- */

    static async handleGetDevotionValueById({ id }){

        const getDevotionValue = await Devotions.findOne({
            where: { id }
        });

        return getDevotionValue;

    };

    /* ------------------- End Handle Get Devotion Value By Id ------------------- */


    /* ------------------- Handle Update Devotion Value ------------------- */

    static async handleUpdateDevotionValue({
        id,
        devotionValue
    }) {
        
        const updatedDevotionValue = await Devotions.update({
            devotionValue
        },
            { 
                where: { id } 
            }
        );

        return updatedDevotionValue;

    };
    
    /* ------------------- End Handle Update Devotion Value ------------------- */
    
    
    /* ------------------- Handle Get Assignment Value By Id ------------------- */

    static async handleGetAssignmentValueById({ id }){

        const getAssignmentValue = await Assignments.findOne({
            where: { id }
        });

        return getAssignmentValue;

    };

    /* ------------------- End Handle Get Assignment Value By Id ------------------- */


    /* ------------------- Handle Update Assignment Value ------------------- */

    static async handleUpdateAssignmentValue({
        id,
        assignmentValue
    }) {
        
        const updatedAssignmentValue = await Assignments.update({
            assignmentValue
        },
            { 
                where: { id } 
            }
        );

        return updatedAssignmentValue;

    };
    
    /* ------------------- End Handle Update Devotion Value ------------------- */

};

module.exports = SuperAdminGiveValueRepository;