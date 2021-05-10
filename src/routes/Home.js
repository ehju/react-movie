import React , { Component }from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends Component {
  state = {
    isLoading: true,
    movies: [],
  };
  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    console.log(movies);
    this.setState({ movies, isLoading: false });
  };
  componentDidMount() {
    this.getMovies();
    
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <div>
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">"Loading..."</span>
          </div>
        ) : (
          <div className="content">
            <h1>Movie Library</h1>
            <div className="movies">
              {movies.map((movie) => {
                return (
                  <Movie
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster={movie.medium_cover_image}
                    rating={movie.rating}
                    summary={movie.summary}
                    genres={movie.genres}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
