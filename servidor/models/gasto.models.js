import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Gasto = sequelize.define("gasto", {
    nombre :{
        type: DataTypes.STRING,
        // allowNull: false
    },
    cantidad:{
        type: DataTypes.INTEGER,
        // allowNull: false
    },
    categoria:{
        type: DataTypes.STRING,
    },
    id :{
        type: DataTypes.STRING,
        primaryKey:true,
    },
    // id:{
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true
    // },
    fecha:{
        type: DataTypes.STRING,
    }
},
{
    timestamp:true
}
)