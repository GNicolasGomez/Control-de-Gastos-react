import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, SetGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    // Calcular el porcentaje gastado
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setDisponible(totalDisponible);
    SetGastado(totalGastado);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1500);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    const resultado = confirm('¿ Deseas reiniciar presupuesto y gastos?');

    if(resultado){
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);

      // Ejecutamos una funcion que resetee la base de datos
      resetBDgastos();
      resetBDpresupuestos();
    }
  }

  // ***** ELIMINAMOS LOS GASTOS EN LA BASE DE DATOS ******

  const resetBDgastos = async () => {
      const url = 'http://localhost:3000/gasto'
    try {
      const resultado = await fetch(url, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      })
    } catch (error) {
      console.log(error);
    }
  }

  const resetBDpresupuestos = async () => {
    const url = 'http://localhost:3000/presupuesto';
    try {
        const resultado = await fetch(url , {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
        })

        console.log({msg: 'Presupuesto Eliminado'})
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#D62626" : "#3B82F6",
            // trailColor:'#F5F5F5'
            textColor: porcentaje > 100 ? "#D62626" : "#3B82F6",
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>RESETEAR APP</button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
