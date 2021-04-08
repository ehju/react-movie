import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";
function Movie({ id, title, poster, rating }) {
  return (
    <div className="item">
      <h3>{title}</h3>
      <img src={poster} alt={title}></img>
      <p>rating : {rating} / 10.0 </p>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};
export default Movie;
