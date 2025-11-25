import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
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

        <Text className="text-white text-sm fond-bold mt-2">
          {title.length > 20 ? `${title.substring(0, 10)}...` : title}
        </Text>

        <View className="flex-row justify-start items-center gap-x-1">
          <Image src={icons.star} className="size-4" />
          <Text className="">{Math.round(vote_average)}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
