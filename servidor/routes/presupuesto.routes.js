import { Router } from "express";
import { getPresupuesto, addPresupuesto, removeBD } from "../controllers/presupuesto.controllers.js";

const router = Router();

router.get("/presupuesto",getPresupuesto);

router.post("/presupuesto",addPresupuesto);

router.delete('/presupuesto', removeBD)

export default router;
