import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

const User = sequelize.define(
    'User', 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, 

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },

        isConsultant: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, 
    {
        timestamps: true,
    }
);

User.beforeCreate(async(user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

User.prototype.validPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

export default User;