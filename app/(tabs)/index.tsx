import MovieCard from "@/components/MovieCard";
import NowPlayingCard from "@/components/NowPlayingCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies, fetchNowPlayingMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: nowPlayingMovies,
    isLoading: isNowPlayingLoading,
    error: nowPlayingError,
  } = useFetch(() => fetchNowPlayingMovies());
  const {
    data: latestMovies,
    isLoading: isLatestLoading,
    error: latestError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const nowPlaying = nowPlayingMovies?.results || [];
  const movies = latestMovies?.results || [];

  console.log("Now Playing Movies:", nowPlayingMovies);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute" />

      <ScrollView
        className="flex-1 px-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto" />

        <View className="mt-10">
          <SearchBar
            value=""
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
            editable={false}
          />
        </View>

        {isNowPlayingLoading ? (
          <ActivityIndicator size="large" color="#fff" className="mt-10" />
        ) : nowPlayingError ? (
          <Text className="text-white text-center mt-10">Error: {nowPlayingError?.message}</Text>
        ) : (
          <View className="mt-5">
            <Text className="text-white text-lg font-bold mb-2">Now Playing</Text>

            <FlatList
              data={nowPlaying}
              renderItem={({ item }) => <NowPlayingCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-2"
              contentContainerStyle={{ paddingRight: 10 }}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />
          </View>
        )}

        {isLatestLoading ? (
          <ActivityIndicator size="large" color="#fff" className="mt-10" />
        ) : latestError ? (
          <Text className="text-white text-center mt-10">Error: {latestError?.message}</Text>
        ) : (
          <View className="mt-2">
            <Text className="text-white text-lg font-bold mt-2 mb-4">Latest Movies</Text>

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
