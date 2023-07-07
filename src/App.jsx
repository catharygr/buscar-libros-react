import BuscarResultado from "./componentes/BuscarResultado";
import TextoInput from "./componentes/TextoInput";
import { useState } from "react";

const ENDPOINT =
  "https://www.omdbapi.com/?i=tt3896198&apikey=b4ee78c6&${type}=${searchInput}";

export default function App() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <header>
        <form>
          <TextoInput
            label="Buscar"
            placeholder="Busca una película"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </header>
    </>
  );
}
