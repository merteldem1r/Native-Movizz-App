import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "./keys";

// Get all saved movies as a HashMap
export const getSavedMovies = async (): Promise<SavedMoviesMap> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.SAVED_MOVIES);
    return jsonValue ? JSON.parse(jsonValue) : {};
  } catch (error) {
    console.error("Error loading saved movies:", error);
    return {};
  }
};

// Save a movie to storage
export const saveMovie = async (movie: StoredMovie): Promise<boolean> => {
  try {
    const savedMovies = await getSavedMovies();
    
    // Add movie to the HashMap using movieId as key
    savedMovies[movie.id.toString()] = movie;
    
    await AsyncStorage.setItem(
      STORAGE_KEYS.SAVED_MOVIES,
      JSON.stringify(savedMovies)
    );
    return true;
  } catch (error) {
    console.error("Error saving movie:", error);
    return false;
  }
};

// Remove a movie from storage
export const removeMovie = async (movieId: number): Promise<boolean> => {
  try {
    const savedMovies = await getSavedMovies();
    
    // Delete the movie from HashMap
    delete savedMovies[movieId.toString()];
    
    await AsyncStorage.setItem(
      STORAGE_KEYS.SAVED_MOVIES,
      JSON.stringify(savedMovies)
    );
    return true;
  } catch (error) {
    console.error("Error removing movie:", error);
    return false;
  }
};

// Check if a movie is saved
export const isMovieSaved = async (movieId: number): Promise<boolean> => {
  try {
    const savedMovies = await getSavedMovies();
    return movieId.toString() in savedMovies;
  } catch (error) {
    console.error("Error checking if movie is saved:", error);
    return false;
  }
};

// Get all saved movies as an array
export const getSavedMoviesArray = async (): Promise<StoredMovie[]> => {
  try {
    const savedMovies = await getSavedMovies();
    return Object.values(savedMovies);
  } catch (error) {
    console.error("Error loading saved movies array:", error);
    return [];
  }
};