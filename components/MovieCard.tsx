import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface MovieCardProps {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: MovieCardProps) => {
  return (
    <Link href={`/movies/${id}`} asChild className="mb-2">
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placeholder.com/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-white text-sm fond-bold mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row justify-start items-center gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xss text-white text-bold uppercase">{vote_average.toFixed(1)}</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300">{release_date.split("-")[0]}</Text>
          {/* <Text className="text-xs text-light-300 font-medium uppercase">Movie</Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
