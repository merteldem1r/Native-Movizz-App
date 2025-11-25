export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  HEADERS: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
};

export const fetchMovies = async (query: string) => {
  const url = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const options = {
    method: "GET",
    headers: TMDB_CONFIG.HEADERS,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching movies:", error);
    throw error;
  }
};
