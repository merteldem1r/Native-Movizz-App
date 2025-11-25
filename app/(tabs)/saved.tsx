import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useSavedMovies } from "@/hooks/useStorage";
import React from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Saved = () => {
  const { savedMovies, loading, remove } = useSavedMovies();

  const handleClearAll = async () => {
    if (savedMovies.length === 0) return;

    // Remove all movies one by one
    for (const movie of savedMovies) {
      await remove(movie.id);
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto" />

        <View className="flex-row items-center justify-between mt-20">
          <Text className="text-white text-xl font-bold">Saved Movies</Text>
          {savedMovies.length > 0 && (
            <TouchableOpacity onPress={handleClearAll} className="bg-red-500 px-4 py-2 rounded-lg">
              <Text className="text-white font-semibold text-sm">Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        {loading ? ( 
          <ActivityIndicator size="large" color="#fff" className="mt-10" />
        ) : savedMovies.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-light-200 text-center text-lg">No saved movies yet</Text>
            <Text className="text-light-300 text-center text-sm mt-2 px-10">
              Browse movies and tap the save button to add them here
            </Text>
          </View>
        ) : (
          <View className="mt-5">
            <Text className="text-light-200 text-sm mb-4">
              {savedMovies.length} {savedMovies.length === 1 ? "movie" : "movies"} saved
            </Text>

            <FlatList
              data={savedMovies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: "flex-start", gap: 20, marginBottom: 15, paddingRight: 10 }}
              className="mt-2"
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Saved;
