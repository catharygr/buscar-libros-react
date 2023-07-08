/* eslint-disable react/prop-types */
import { useState } from "react";
import BuscarResultado from "./componentes/BuscarResultado";
import TextoInput from "./componentes/TextoInput";

export default function App({ type }) {
  const [buscarInput, setBuscarInput] = useState("");
  const [buscarResultados, setBuscarResultados] = useState([]);
  // inactivo, cargando, exito, sin exito, error
  const [estado, setEstado] = useState("inactivo");

  async function handleSubmit(e) {
    e.preventDefault();
    setEstado("cargando");
    const ENDPOINT = `https://www.omdbapi.com/?i=tt3896198&apikey=b4ee78c6&type=${type}&s=${buscarInput}`;
    const url = `${ENDPOINT}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") {
      setBuscarResultados([data]);
      setBuscarInput("");
      setEstado("exito");
    } else {
      setEstado("sin exito");
    }

    console.log(data);
  }

  const mapeo = buscarResultados.map((result) => (
    <BuscarResultado key={result.imdbID} result={result} />
  ));

  return (
    <>
      <header>
        <form onSubmit={handleSubmit} className="form-buscar">
          <TextoInput
            label="Buscar"
            placeholder="Busca una película"
            value={buscarInput}
            onChange={(e) => setBuscarInput(e.target.value)}
          />
          <button className="btn" type="submit">
            Ir
          </button>
        </form>
      </header>
      <main>
        <section className="seccion-buscar">
          <div>
            <h2>Buscar resultados:</h2>
            {estado === "inactivo" && <p>Busca una película</p>}
            {estado === "cargando" && <p>Cargando...</p>}
            {estado === "exito" && <p>Resultados encontrados</p>}
            {estado === "sin exito" && <p>Sin resultados</p>}
            {estado === "error" && <p>Hubo un error</p>}
            {mapeo}
          </div>
        </section>
      </main>
    </>
  );
}
