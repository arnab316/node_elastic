import {MovieRepository} from '../repository/index.js'

class MovieService {
    constructor(){
        this.movieRepository = new MovieRepository();
    }

    async createMovie(movie){

      if (!movie.title) {
        throw new Error('Title is required');
      }
      if (!movie.description) {
        throw new Error('Description is required');
      }
        return this.movieRepository.createMovie(movie);
    }
    async getMovieById(movieId){
        return this.movieRepository.getMovieById(movieId);
    }

    async  searchMovies(searchParams){
        return await this.movieRepository.searchMovies(searchParams);
    }
    async updateMovie(movieId, updatedData) {
        // Business Logic: Validate updated data
        if (updatedData.title && updatedData.title.trim() === '') {
          throw new Error('Title cannot be empty');
        }
        // Add more validations as needed
    
        return await this.movieRepository.updateMovie(movieId, updatedData);
      }
      async deleteMovie(movieId) {
        return await this.movieRepository.deleteMovie(movieId);
      }
}


export default MovieService;