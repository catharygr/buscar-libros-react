export default function BuscarResultado(result) {
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

/*  <div class="container">
<header>
<div class="title-nav">
  <h1>Find your film</h1>
  <p>
    <a href="./mi-lista.html">My watchlist</a>
  </p>
</div>
<div class="search-form">
  <input id="search-field" class="search" type="text" placeholder="Movie name here...">
  <button id="search-btn" class="btn">Search</button>
</div>
</header>
<main id="main-container" class="main-container">
<p>Search results shows here...</p>
</main>
</div>   */
