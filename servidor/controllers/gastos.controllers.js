import { Gasto } from "../models/gasto.models.js";



const getGastos = async (req,res) => {
    try {
        const gasto = await Gasto.findAll();
        res.json(gasto);
    } catch (error) {
        console.error(error);
    }
}

const addGastos = async (req, res) => {

    try {
        // const gasto = req.body;
        // console.log(gasto)
        // res.send(gasto)
        const gasto = req.body;
        const newGasto = await Gasto.create(gasto);

        res.json(newGasto);

    } catch (error) {
        console.error(error)
    }
}

const updateGasto = async (req,res) => {
    const {id} = req.params;

    try {
        const gasto = await Gasto.findOne({
            where: {id}
        });

        gasto.set(req.body);
        await gasto.save();
    
        console.log(gasto);
        res.send(gasto);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}

const deleteGasto = async (req,res) => {
    const {id} = req.params;

    try {
        const gastoEliminar = await Gasto.destroy({
            where: {id}
        })

        console.log(gastoEliminar);
        return res.sendStatus(204);

    } catch (error) {
        console.log(error)
    }
}


const deleteGastos = async (req,res) => {
    try {
        const gastosEliminados = await Gasto.destroy({
            truncate: true
        });
        console.log(gastosEliminados);
        res.send({msg:'Gastos eliminados'}).status(200);
    } catch (error) {
        console.log(error)
    }
}



export {
    getGastos,
    addGastos,
    updateGasto,
    deleteGasto,
    deleteGastos
}