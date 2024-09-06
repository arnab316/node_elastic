import MovieService from "../services/movie-service.js";

const movieService = new MovieService();

export const createMovie = async(req,res) => {
    
        try {
            const movie = req.body;
            const result = await movieService.createMovie(movie);
            res.status(201).json({
                message: "Movie created successfully",
                data: result,
                success: true,
                error: {}
            });
        } catch (error) {
            res.status(500).json({ 
                message: "Error creating movie",
                data: {},
                success: false,
                error:  error.message || error
             });
        }
    
}

