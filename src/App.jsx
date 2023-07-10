import { useState } from "react";
import BuscarResultado from "./componentes/BuscarResultado";
import TextoInput from "./componentes/TextoInput";

export default function App() {
  const [buscarInput, setBuscarInput] = useState("");
  const [buscarResultados, setBuscarResultados] = useState([]);
  //  cargando, exito, sin exito, error
  const [estado, setEstado] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setEstado("cargando");
    const url = `https://www.omdbapi.com/?i=tt3896198&apikey=b4ee78c6&s=${buscarInput}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") {
      setBuscarResultados(data.Search);
      setBuscarInput("");
      setEstado("exito");
    } else {
      setEstado("sin exito");
    }
  }

  const mapeo = buscarResultados.map((result) => (
    <BuscarResultado key={result.imdbID} result={result} />
  ));

  return (
    <>
      <header>
        <form onSubmit={handleSubmit} className="form-buscar">
          <TextoInput
            className="input-buscar"
            type="text"
            label="Buscar"
            id="buscar"
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
