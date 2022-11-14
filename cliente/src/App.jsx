import { useState, useEffect } from "react";
import Header from "./components/Header";
import Filtros from "./components/Filtros";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarId, formatearFecha } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  // const [gastos, setGastos] = useState(
  //   localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [] 
  // );


  // Definimos el state GASTOS y hacemos la consulta a la API, asi vemos si tiene cargado algo en gastos
  const [gastos, setGastos] = useState([
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [] 
  ]);
  useEffect(()=>{
    const gastosCall = async () => {
      const url  = 'http://localhost:3000/gasto'
      try {
        const gasto =await fetch(url);
        const respuesta = await gasto.json();

        if(respuesta.length > 0) {
          setGastos(respuesta)
        }else{
          setGastos([])
        }

  
      } catch (error) {
        console.log(error) 
      } 
    }
    gastosCall();
  },[])

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto'))?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);


  useEffect(()=> {
    if(Object.keys(gastoEditar).length>0){
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }

  },[gastoEditar]);


  useEffect(()=> {
    localStorage.setItem('presupuesto',presupuesto ?? 0);

  }, [presupuesto]);

//Persistimos el presupuesto en el Local Storage
  useEffect(()=> {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLS > 0 ){
      setIsValidPresupuesto(true); 
    }
  }, []);

  //Persistimos los datos en el Local Storage
  useEffect(()=> {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos]);


  useEffect(()=> {  
     if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
     }
  },[filtro])


  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarGasto = (gasto) => { 
    if(gasto.id){
      //Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados); 
      setGastoEditar({})

      const id = gasto.id;

      //Lepasamos el id pora la actualización al back
      handleUpdateBack(id,gasto);
    }else{
      //Nuevo Gasto
      const fecha = Date.now();
      gasto.id = generarId();
      gasto.fecha = formatearFecha(fecha);
      setGastos([...gastos, gasto]);

      //Pasamos al back el gasto

      handleSubmitBack(gasto);
    }


    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };



  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados);

    deleteGastoBack(id);

  }


  // **** CONSULTAS AL BACK *****

  const handleSubmitBack = async (gasto) => {
      const url = 'http://localhost:3000/gasto';

    try {
      const respuesta = await fetch( url, {
        method: 'POST',
        body: JSON.stringify(
          {nombre:gasto.nombre,
          cantidad:gasto.cantidad,
          categoria:gasto.categoria,
          id:gasto.id,
           fecha:gasto.fecha
          }),
        headers: {'Content-Type': 'application/json'}
      })
      const resultado = await respuesta.json();
      console.log(resultado);
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateBack = async (id,gasto) => {
      const url = `http://localhost:3000/gasto/${id}`
    try {
      const respuesta = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
          nombre:gasto.nombre,
          cantidad:gasto.cantidad,
          categoria:gasto.categoria,
          idString:gasto.id,
           fecha:gasto.fecha
        }),
        headers: { 'Content-Type': 'application/json'}
      })
      const resultado =  await respuesta.json();
      console.log(resultado);

    } catch (error) {
      console.log(error);
    }
  }

  const deleteGastoBack = async (id) => {
    const url = `http://localhost:3000/gasto/${id}`;

    try {
      const respuesta = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
      });
      const resultado = await respuesta.json();
      console.log(resultado);
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className={modal ? "fijar": null}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro = {filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto} alt="" onClick={handleNuevoGasto} />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
