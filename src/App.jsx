import { useState } from "react";
import BuscarResultado from "./componentes/BuscarResultado";
import TextoInput from "./componentes/TextoInput";

const API_KEY = "b4ee78c6";
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export default function App() {
  const [buscarInput, setBuscarInput] = useState("");
  const [buscarResultados, setBuscarResultados] = useState([]);
  // inactivo, cargando, exito, sin exito, error
  const [estado, setEstado] = useState("inactivo");

  async function handleSubmit(e) {
    e.preventDefault();

    if (buscarInput.trim() === "") {
      return;
    }

    setEstado("cargando");

    try {
      const url = `${API_URL}&type=movie&s=${buscarInput}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        setBuscarResultados(data.Search);
        setEstado("exito");
      } else {
        setEstado("sin exito");
      }
    } catch (error) {
      console.error("Error al buscar películas:", error);
      setEstado("error");
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
            {estado === "exito" && buscarResultados.length > 0 ? (
              <>
                <p>Resultados encontrados</p>
                {mapeo}
              </>
            ) : (
              estado === "sin exito" && <p>Sin resultados</p>
            )}
            {estado === "error" && (
              <p>Hubo un error al obtener los resultados</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

// import BuscarResultado from "./componentes/BuscarResultado";
// import TextoInput from "./componentes/TextoInput";
// import { useState } from "react";

// const ENDPOINT = `https://www.omdbapi.com/?i=tt3896198&apikey=b4ee78c6&type=${type}&s=${buscarInput}`;

// export default function App() {
//   const [buscarInput, setBuscarinput] = useState("");
//   const [buscarResultados, setBuscarResultados] = useState([]);

//   // inactivo, cargando, exito, sin exito, error
//   const [estado, setEstado] = useState("inactivo");

//   // Funcion para manejar el submit del formulario
//   async function handleSubmit(e) {
//     e.preventDefault();
//     setEstado("cargando");
//     const url = `${ENDPOINT} ? buscarInput=${buscarInput}`;
//     const res = await fetch(url);
//     const data = await res.json();

//     if (data.Search) {
//       setBuscarResultados(data.Search);
//       setBuscarinput("");
//       setEstado("exito");
//     } else {
//       setEstado("sin exito");
//     }

//     // if (data.ok) {
//     //   setBuscarResultados(data.Search);
//     //   buscarInput("");
//     //   data?.Search?.length > 0 ? setEstado("exito") : setEstado("sin exito");
//     // } else {
//     //   setEstado("error");
//     // }
//     console.log(data);
//   }

//   const mapeo = buscarResultados.map((result) => {
//     return <BuscarResultado key={result.imdbID} result={result} />;
//   });

//   return (
//     <>
//       <header>
//         <form onSubmit={handleSubmit} className="form-buscar">
//           <TextoInput
//             label="Buscar"
//             placeholder="Busca una película"
//             value={buscarInput}
//             onChange={(e) => setBuscarinput(e.target.value)}
//           />
//           <button className="btn" type="submit">
//             Ir
//           </button>
//         </form>
//       </header>
//       <main>
//         <section className="seccion-buscar">
//           <div>
//             <h2>Buscar resultados:</h2>
//             {estado === "inactivo" && <p>Busca una película</p>}
//             {estado === "cargando" && <p>Cargando...</p>}
//             {estado === "exito" && <p>Resultados encontrados</p>}
//             {estado === "sin exito" && <p>Sin resultados</p>}
//             {estado === "error" && <p>Hubo un error</p>}
//             {mapeo}
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }
