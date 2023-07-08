/* eslint-disable react/prop-types */
export default function BuscarResultado({ result }) {
  return (
    <div className="container">
      <article className="buscar-resultado">
        <div className="buscar-resultado__img">
          <img src={result.Poster} alt={result.Title} />
        </div>
        <div className="buscar-resultado__info">
          <h1>{result.Title}</h1>
          <h2>{result.Director}</h2>
          <p>{result.Genre}</p>
          <p>{result.Country}</p>
          <p>{result.Year}</p>
          <p>{result.Type}</p>
        </div>
      </article>
    </div>
  );
}
