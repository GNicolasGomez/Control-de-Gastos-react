
import  {Presupuesto}  from "../models/presupuesto.models.js";

const getPresupuesto = async (req,res) => {
    try {
        const presupuestos = await Presupuesto.findAll();
        console.log(presupuestos);
        res.send(presupuestos); 

    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}


const addPresupuesto = async (req,res) => {
    const presupuesto =  req.body;
    
    try {
        const newPresupuesto = await Presupuesto.create(presupuesto)
        console.log(newPresupuesto);
        res.json(newPresupuesto);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}

const removeBD = async (req,res) => {
    try {
        const resultado = await Presupuesto.destroy({
            truncate:true
        });
        res.send(resultado).message({msg:'Tabla presupuesto Eliminada'});
    } catch (error) {
        console.log(error)
    }
}

export {
    getPresupuesto,
    addPresupuesto,
    removeBD
}