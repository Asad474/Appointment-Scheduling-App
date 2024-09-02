import { sequelize } from "../config/db.js";
import { DataTypes } from 'sequelize';
import { User } from "./user.js";

export const Consultant = sequelize.define('Consultant', {
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    }, 

    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    },

    breaks: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },

    DaysOff: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: ["Sunday"]
    }
});

User.hasOne(Consultant, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

Consultant.belongsTo(User);