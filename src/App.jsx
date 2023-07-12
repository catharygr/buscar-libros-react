import { useState } from "react";
import BuscarResultado from "./componentes/BuscarResultado";
import TextoInput from "./componentes/TextoInput";

export default function App() {
  const [buscarInput, setBuscarInput] = useState("");
  const [buscarResultados, setBuscarResultados] = useState([]);
  console.log(buscarResultados);
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
            required={true}
            className="input-buscar"
            type="text"
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
        <h2>Buscar resultados:</h2>
        {estado === "cargando" && <p className="resultados">Cargando...</p>}
        {estado === "exito" && (
          <p className="resultados">Resultados encontrados:</p>
        )}
        {estado === "sin exito" && <p className="resultados">Sin resultados</p>}
        {estado === "error" && <p className="resultados">Hubo un error</p>}
        <section className="seccion-buscar">{mapeo}</section>
      </main>
    </>
  );
}
