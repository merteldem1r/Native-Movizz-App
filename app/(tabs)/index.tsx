import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch(() => fetchMovies({ query: "" }));

  const movies = data?.results || [];

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute" />

      <ScrollView
        className="flex-1 px-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto" />

        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" className="mt-10" />
        ) : error ? (
          <Text className="text-white text-center mt-10">Error: {error?.message}</Text>
        ) : (
          <View className="mt-10">
            <SearchBar onPress={() => router.push("/search")} placeholder="Search for a movie" />

            <Text className="text-white text-lg font-bold mt-5 mb-4">Latest Movies</Text>

            <FlatList
              data={movies}
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
}
