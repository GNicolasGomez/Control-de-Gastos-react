import { Router } from 'express';
import { getGastos, addGastos, updateGasto, deleteGasto, deleteGastos } from '../controllers/gastos.controllers.js'

const router = Router();

//Obtener la lista de gastos
router.get('/gasto', getGastos );

//Enviamos un gasto
router.post('/gasto' , addGastos);

//Actualizamos un gasto
router.put('/gasto/:id', updateGasto)

//Eliminamos un gasto
router.delete('/gasto/:id', deleteGasto);

//Reseteamos toda la App
router.delete('/gasto', deleteGastos);


export default router;


