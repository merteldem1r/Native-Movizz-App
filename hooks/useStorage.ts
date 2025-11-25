import { getSavedMoviesArray, isMovieSaved, removeMovie, saveMovie } from "@/lib/storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export const useSavedMovies = () => {
  const [savedMovies, setSavedMovies] = useState<StoredMovie[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMovies = useCallback(async () => {
    setLoading(true);
    const movies = await getSavedMoviesArray();
    setSavedMovies(movies);
    setLoading(false);
  }, []);

  // Reload when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadMovies();
    }, [loadMovies])
  );

  const save = async (movie: StoredMovie) => {
    const success = await saveMovie(movie);
    if (success) {
      await loadMovies();
    }
    return success;
  };

  const remove = async (movieId: number) => {
    const success = await removeMovie(movieId);
    if (success) {
      await loadMovies();
    }
    return success;
  };

  const checkSaved = async (movieId: number) => {
    return await isMovieSaved(movieId);
  };

  return {
    savedMovies,
    loading,
    save,
    remove,
    checkSaved,
    refresh: loadMovies,
  };
};
