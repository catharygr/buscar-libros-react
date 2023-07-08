import BuscarResultado from "./componentes/BuscarResultado";
import TextoInput from "./componentes/TextoInput";
import { useState } from "react";

export default function App({ type }) {
  const [buscarInput, setBuscarinput] = useState("");
  const [buscarResultados, setBuscarResultados] = useState([]);

  // inactivo, cargando, exito, sin exito, error
  const [estado, setEstado] = useState("inactivo");

  // Funcion para manejar el submit del formulario
  async function handleSubmit(e) {
    e.preventDefault();
    setEstado("cargando");
    const ENDPOINT = `https://www.omdbapi.com/?i=tt3896198&apikey=b4ee78c6&type=${type}&s=${buscarInput}`;
    const url = `${ENDPOINT}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.Search) {
      setBuscarResultados(data.Search);
      setBuscarinput("");
      setEstado("exito");
    } else {
      setEstado("sin exito");
    }

    console.log(data);
  }

  const mapeo = buscarResultados.map((result) => {
    return <BuscarResultado key={result.imdbID} result={result} />;
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

// import BuscarResultado from "./componentes/BuscarResultado";
// import TextoInput from "./componentes/TextoInput";
// import { useState } from "react";

// export default function App({ type }) {
//   const ENDPOINT = `https://www.omdbapi.com/?i=tt3896198&apikey=b4ee78c6&type=${type}&s=${buscarInput}`;
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
