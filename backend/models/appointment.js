import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import { User } from "./user.js";
import { Consultant } from "./consultant.js";

export const Appointment = sequelize.define('Appointment', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    time: {
        type: DataTypes.TIME,
        allowNull: false
    }
});

User.hasMany(Appointment, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

Appointment.belongsTo(User);

Consultant.hasMany(Appointment, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

Appointment.belongsTo(Consultant);

export default Appointment;