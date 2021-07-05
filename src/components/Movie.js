import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";
function Movie({ id, title, poster, rating, summary, genres }) {
  return (
    <div className="movie_item">
      <img src={poster} alt={title}></img>
      <div className="movie-info">
        <h3>{title}</h3>
        <p>rating : {rating} / 10.0 </p>
        <p>{summary.slice(0, 140)}...</p>
        <div className="genres">
          {genres.map((genre, index) => (
            <span className="genre_name" key={index}>
              #{genre}&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Movie;
