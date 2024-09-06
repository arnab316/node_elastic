import { elasticClient } from "../config/elastic-config.js";

class MovieRepository {
  async createMovie(movie) {
   try {
    const response = await elasticClient.index({
        index: "movies",
        body: movie,
      });
      return response.body.result;
   } catch (error) {
    throw new Error(`error creating movie ${error.message}`);
   }
  }

  async getMovieById(movieId) {
    try {
        const response = await elasticClient.get({
            index: "movies",
            id: movieId,
          });
          return response._source;
    } catch (error) {
        if (error.meta && error.meta.statusCode === 404) {
            throw new Error('Movie not found');
          }
          throw new Error(`Error retrieving movie: ${error.message}`);
    }
  }
  async searchMovies(query) {
    try {
        const esQuery = {
            index: "movies",
            from: (page - 1) * size,
            size: size,
            sort: [{ [sort]: { order: order } }],
            query: {
              bool: {
                must: query ? { match: { description: query } } : { match_all: {} }, // Replace 'description' with appropriate field
                filter: filters, // e.g., status, date range
              },
            },
          };
          const response = await elasticClient.search(esQuery);
          return response.body.hits;      
    } catch (error) {
        throw new Error(`Error searching movies: ${error.message}`);
    }
  }
  async updateMovie(movieId, updatedMovie) {
    try {
        const response = await elasticClient.update({
            index: "movies",
            id: movieId,
            body: {
              doc: updatedMovie,
            },
          });
          return response.body.result;
    } catch (error) {
        throw new Error(`Error updating movie: ${error.message}`);
    }
  }
  async deleteMovie(movieId) {
    try {
        const response = await elasticClient.delete({
          index: "movies",
          id: movieId,
        });
        return response.body.result; // Typically 'deleted'
      } catch (error) {
        if (error.meta && error.meta.statusCode === 404) {
          throw new Error('Movie not found');
        }
        throw new Error(`Error deleting movie: ${error.message}`);
      }
    
  }
}

export default MovieRepository;
