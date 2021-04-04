import React from "react"
import PropTypes from "prop-types";


function Movie({id,title,poster,rating}){
    return <h1>{ title }</h1>
}
Movie.propTypes={
    id : PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired
}
export default Movie;