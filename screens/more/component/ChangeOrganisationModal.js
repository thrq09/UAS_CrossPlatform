import React, { useState } from "react";
import { View, Modal, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import { organisations } from "../component/organisationData";
import { useNavigation } from "@react-navigation/native";

const ChangeOrganisationModal = ({ visible, onClose }) => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const filteredData = organisations.filter(org =>
    org.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (org) => {
    onClose();
    navigation.navigate("OrganisationDetail", { organisation: org });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: "#000000aa", justifyContent: "center" }}>
        <View style={{ backgroundColor: "#fff", margin: 20, padding: 20, borderRadius: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Change Organisation</Text>
          <TextInput
            placeholder="Search organisation"
            value={search}
            onChangeText={setSearch}
            style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 6, marginBottom: 12 }}
          />
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)} style={{ padding: 10 }}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={{ marginTop: 20, alignSelf: "center" }}>
            <Text style={{ color: "#00bfa5", fontWeight: "bold" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChangeOrganisationModal;
