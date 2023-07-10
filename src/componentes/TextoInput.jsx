/* eslint-disable react/prop-types */
export default function TextoInput({ label, ...props }) {
  const imdbID = `input-${label}`;
  return (
    <>
      <label className="label-buscar" htmlFor={imdbID}>
        {label}
      </label>
      <input id={imdbID} {...props} />
    </>
  );
}
