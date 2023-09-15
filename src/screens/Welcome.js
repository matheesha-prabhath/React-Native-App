import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    // Fetch all characters from the API initially
    fetchCharacters();
  }, []);

  useEffect(() => {
    // Filter characters based on searchQuery
    const filtered = characters.filter((character) =>
      character.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [searchQuery, characters]);

  const fetchCharacters = () => {
    // Fetch characters from the API
    fetch("https://thronesapi.com/api/v2/Characters")
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data);
      })
      .catch((error) => {
        console.error("Error fetching character data:", error);
      });
  };

  const handleCharacterSelection = (character) => {
    // Set the selected character for detailed view
    setSelectedCharacter(character);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Characters"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            style={styles.settings}
            source={require("../../assets/interface/Settings.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <ScrollView style={styles.characterList}>
          {filteredCharacters.map((character) => (
            <TouchableOpacity
              key={character.id}
              style={styles.characterItem}
              onPress={() => handleCharacterSelection(character)}
            >
              <Image
                style={styles.characterListImage}
                source={{ uri: character.imageUrl }}
              />
              <Text style={styles.characterListName}>{character.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView style={styles.detailedView}>
          <View style={styles.detailedViewContaner}>
          {selectedCharacter && (
            <View style={styles.detailedCharacter}>
              <Image
                style={styles.characterImage}
                source={{ uri: selectedCharacter.imageUrl }}
              />
              <Text style={styles.characterTitle}>
                {selectedCharacter.title}
              </Text>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Full Name</Text>
                <Text style={styles.characterName}>
                  {selectedCharacter.fullName}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>First Name</Text>
                <Text style={styles.characterName}>
                  {selectedCharacter.firstName}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Last Name</Text>
                <Text style={styles.characterName}>
                  {selectedCharacter.lastName}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Family</Text>
                <Text style={styles.characterName}>
                  {selectedCharacter.family}
                </Text>
              </View>
            </View>
          )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A2A2A",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 35,
    paddingBottom:5,
    paddingHorizontal: 10,
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 18,
    width: "80%",
  },
  settingsButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  settings: {
    resizeMode: "center",
  },
  title: {
    marginVertical: 5,
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 10,
    top:-12,
    paddingHorizontal:5,
    backgroundColor:"#2A2A2A"
  },
  textContainer:{
    marginVertical:10,
    top:10,
    borderWidth:2,
    borderColor:"gray",
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
    padding:3,
    minWidth:150,
    height:50
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  characterList: {
    flex: 1,
    backgroundColor: "#3D3D3D",
  },
  characterItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  characterImage: {
    width: 140,
    height: 140,
    borderRadius: 25,
  },
  characterListImage: {
    width: 25,
    height: 25,
    borderRadius: 25,
  },
  characterName: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    top:-10,
  },
  characterListName: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  characterTitle: {
    marginVertical: 5,
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  detailedView: {
    flex: 2,
    backgroundColor: "#2A2A2A",
  },
  detailedViewContaner:{    
    justifyContent:"center",
    marginVertical:"60%"

  },
  detailedCharacter: {
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default Welcome;
