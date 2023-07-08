import BuscarResultado from "./componentes/BuscarResultado";
import TextoInput from "./componentes/TextoInput";
import { useState } from "react";

const ENDPOINT =
  "https://www.omdbapi.com/?i=tt3896198&apikey=b4ee78c6&${type}=${searchInput}";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [buscarResultados, setBuscarResultados] = useState([]);

  // inactivo, cargando, exito, sin exito, error
  const [estado, setEstado] = useState("inactivo");

  async function handleSubmit(e) {
    e.preventDefault();
    setEstado("cargando");
    const url = `${ENDPOINT} ? searchInput=${searchInput}`;
    const res = await fetch(url);
    const data = await res.json();
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
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="btn" type="submit">
            Ir
          </button>
        </form>
      </header>
      <main>
        <section className="section-buscar">{mapeo}</section>
      </main>
    </>
  );
}
