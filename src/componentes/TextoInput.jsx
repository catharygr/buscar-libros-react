// import { useId } from "react";
// Función que genera un id único
export default function TextoInput() {
  // let generarId = useId();
  // let apliacadoId = id || generarId;
  return (
    <>
      <label className="label-buscar" htmlFor="buscar">
        Buscar
      </label>
      <input className="input-buscar" type="text" id="buscar" />
    </>
  );
}
