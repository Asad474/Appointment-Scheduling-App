import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import User from "./userModel.js";
import Consultant from "./consultantModel.js";

const Appointment = sequelize.define('Appointment', {
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