import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error, refetch } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  const movies = data?.results || [];

  useEffect(() => {
    updateSearchCount(searchQuery, movies[0]);

    const timeoutId = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        refetch();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="flex-1 w-full z-0 absolute" />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          paddingRight: 10,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-center mt-10">
              {searchQuery.trim() === ""
                ? "Start typing to search for movies."
                : isLoading
                  ? "Searching..."
                  : "No movies found."}
            </Text>
          </View>
        }
        ListHeaderComponent={
          <>
            <View className="w-full flex-row items-center justify-center mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
                autoFocus={true}
              />
            </View>

            {searchQuery.trim() !== "" && (
              <Text className="flex-1 text-white text-xl">
                Search Results for: <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}

            {isLoading && <ActivityIndicator size="large" color="#0000ff" className="my-3" />}

            {error && <Text className="text-red-500 px-5 my-3 text-center">Error: {error.message}</Text>}
          </>
        }
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
