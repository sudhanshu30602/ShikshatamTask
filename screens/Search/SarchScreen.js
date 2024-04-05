import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { AppStatusbar, ListingCard } from "../../components";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { route } from "../../routes";

const SarchScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = React.useState("");
  const [searchResult, setSearchRsult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

const searchId = 'your_search_id'; // Replace 'your_search_id' with the actual ID you want to use for the search
const url = `https://movies-api14.p.rapidapi.com/search?id=${searchId}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ee0bb87444msh6e0164788236e5bp1d9940jsn8bbdb8bf4252',
		'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
	}
};

  

  const handleSearching = async () => {
    setLoading(true);
    try {
      const response = await fetch( `https://movies-api14.p.rapidapi.com/search?query=${text}`, options);
      const data = await response.json();
      //console.log('hi', data);
      setSearchRsult(data.contents);
     console.log("dtaa", searchResult)
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <AppStatusbar
        style={"light"}
        translucent={false}
        backgroundColor={"#000"}
      />
      <View className="py-3 px-4 flex-row items-center gap-3">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={25} color="#fff" />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center rounded-md bg-slate-900 px-2">
          <Ionicons name="search" size={20} color="#ccc" />
          <TextInput
            placeholder="Search"
            value={text}
            onChangeText={(search) => {
              setText(search);
              handleSearching();
            }}
            className=" px-2 py-2 text-base w-full text-white"
            placeholderTextColor={"#ccc"}
          />
        </View>
      </View>
      {/*  */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={"large"} color={"#fff"} />
          <Text className="text-white capitalize text-base">
            fetching result
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchResult}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="py-1">
              <ListingCard movie={item} />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default SarchScreen;
