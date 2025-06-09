// MoreScreen/component/OrganisationModal.js

import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useOrgStore from "../../../stores/useOrgStore";
import organisationData from "./organisationData";


const OrganisationModal = ({ visible, onDismiss }) => {
  const { selectedOrg, setSelectedOrg } = useOrgStore();

  const handleSelect = (orgName) => {
    setSelectedOrg(orgName);
    onDismiss(); // Tutup modal
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onDismiss}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select Organisation</Text>
          <FlatList
            data={organisationData}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelect(item.name)}
              >
                <View style={styles.itemLeft}>
                  <Icon name="office-building" size={24} color="#333" />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.orgName}>{item.name}</Text>
                    <Text style={styles.location}>{item.location}</Text>
                  </View>
                </View>
                {selectedOrg === item.name && (
                  <Icon name="check" size={20} color="#14A2E2" />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "60%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  orgName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  location: {
    fontSize: 13,
    color: "gray",
  },
});

export default OrganisationModal;
