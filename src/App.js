import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
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
            <h1>"Loading..."</h1>
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

export default App;
