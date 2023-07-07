// import { useId } from "react";
// Función que genera un id único
export default function TextoInput() {
  // let generarId = useId();
  // let apliacadoId = id || generarId;
  return (
    <div className="container-input">
      <label className="label-buscar" htmlFor="buscar">
        Buscar
      </label>
      <input type="text" id="buscar" />
    </div>
  );
}
