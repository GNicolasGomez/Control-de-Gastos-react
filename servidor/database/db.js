import Sequelize from 'sequelize';

export const sequelize = new Sequelize ('controlGastos',  'postgres', '',  {
    host: "localhost",
    dialect:"postgres"
})