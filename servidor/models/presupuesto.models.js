import { DataTypes } from "sequelize";
import { sequelize } from '../database/db.js';

export const Presupuesto = sequelize.define("presupuesto", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  presupuesto: {
    type: DataTypes.INTEGER,
  },
},{
    timestamp:true,
}
);
