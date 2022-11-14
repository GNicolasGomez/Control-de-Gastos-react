import express from "express";
import cors from "cors";

import presupuestoRoutes from './routes/presupuesto.routes.js'
import gastoRoutes from './routes/gastos.routes.js'

// const whiteList = ['http://localhost:3000']

const app = express();
app.use(express.json());
app.use(cors()); //Acceso a todo el mundo



//Middleware
app.use(express.json());
app.use(express.static('cliente'))
app.use(express.urlencoded({extended:true}))

app.use(presupuestoRoutes);
app.use(gastoRoutes);


export default app;