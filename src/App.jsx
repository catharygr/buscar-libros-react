import BuscarResultado from "./componentes/BuscarResultado";
import TextoInput from "./componentes/TextoInput";
import { useState } from "react";

const ENDPOINT =
  "https://www.omdbapi.com/?i=tt3896198&apikey=b4ee78c6&${type}=${buscarInput}";

export default function App() {
  const [buscarInput, setBuscarinput] = useState("");
  const [buscarResultados, setBuscarResultados] = useState([]);

  // inactivo, cargando, exito, sin exito, error
  const [estado, setEstado] = useState("inactivo");

  // Funcion para manejar el submit del formulario
  async function handleSubmit(e) {
    e.preventDefault();
    setEstado("cargando");
    const url = `${ENDPOINT} ? buscarInput=${buscarInput}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.ok) {
      setBuscarResultados(data.Search);
      buscarInput("");
      data?.Search?.length > 0 ? setEstado("exito") : setEstado("sin exito");
    } else {
      setEstado("error");
    }
    console.log(data);
  }

  const mapeo = buscarResultados.map((result) => {
    return <BuscarResultado key={result.index} result={result} />;
  });

  return (
    <>
      <header>
        <form onSubmit={handleSubmit} className="form-buscar">
          <TextoInput
            label="Buscar"
            placeholder="Busca una película"
            value={buscarInput}
            onChange={(e) => setBuscarinput(e.target.value)}
          />
          <button className="btn" type="submit">
            Ir
          </button>
        </form>
      </header>
      <main>
        <section className="section-buscar">
          <h2>Buscar resultados:</h2>
          {estado === "inactivo" && <p>Busca una película</p>}
          {estado === "cargando" && <p>Cargando...</p>}
          {estado === "exito" && <p>Resultados encontrados</p>}
          {estado === "sin exito" && <p>Sin resultados</p>}
          {estado === "error" && <p>Hubo un error</p>}
          {mapeo}
        </section>
      </main>
    </>
  );
}
