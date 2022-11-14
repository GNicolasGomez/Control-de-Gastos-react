import app from "./app.js";
import { sequelize } from "./database/db.js";



async function main() {
try {
    await sequelize.sync({force:false});
    await sequelize.authenticate();
    console.log("La conexion ha sido establecida");
    app.listen(3000);
    console.log("Listen on port", 3000);
} catch (error) {
    console.error('No pudo conectarse...',error);
}
}

main();