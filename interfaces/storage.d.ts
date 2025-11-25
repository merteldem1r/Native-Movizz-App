interface StoredMovie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface SavedMoviesMap {
  [movieId: string]: StoredMovie;
}
