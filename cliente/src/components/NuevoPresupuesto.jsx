import { useState } from "react";
import Mensaje from "./mensaje";

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [mensaje, setMensaje] = useState("");

  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!presupuesto || presupuesto < 0) {
      setMensaje("No es un presupuesto válido");
      return;
    }

    setMensaje("");
    setIsValidPresupuesto(true);
    handleSubmit(presupuesto)

  };

  const handleSubmit = async (presupuesto)=>  {
    console.log(presupuesto)
    try {
      const url = "http://localhost:3000/presupuesto"
      const respuesta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({presupuesto}),
        headers: { 'Content-Type': 'application/json' }
      })
      const resultado = await respuesta.json();
      console.log(resultado);
    } catch (error) {
      console.error(error, 'Soy el error');
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form  onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label htmlFor=""> Definir Presupuesto</label>
          <input
            type="number"
            className="nuevo-presupuesto"
            placeholder="Añade tu Presupuesto"
            value={presupuesto}
            onChange={(e) => {
              setPresupuesto(Number(e.target.value));
            }}
          />
        </div>
        <input type="submit" value="Añadir" />

        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
