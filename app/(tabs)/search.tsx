import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error, refetch } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  const movies = data?.results || [];

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="flex-1 w-full z-0 absolute" />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
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
              />
            </View>

            {isLoading && <ActivityIndicator size="large" color="#0000ff" className="my-3" />}

            {error && <Text className="text-red-500 px-5 my-3 text-center">Error: {error.message}</Text>}

            {!isLoading && !error && searchQuery.trim() != "" && movies.length > 0 && (
              <Text className="text-white my-3">
                Search Results for: <Text className="text-xl text-white font-bold">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
