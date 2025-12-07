import React from 'react';
import {
    Alert,
    Image,
    Modal,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from "expo-image-picker";
import styles from './HomeScreen';
import { CATEGORY_LIST } from "./data.tsx";

const BACKEND_URL = "http://10.170.86.65:5000";

export default function AdditionalContent({
  modalVisible,
  setModalVisible,
  newName,
  setNewName,
  newCategory,
  setNewCategory,
  newImage,
  setNewImage,
  newDate,
  setNewDate,
  showDate,
  setShowDate,
  showImgPicker,
  setShowImgPicker,
  deleteVisible,
  setDeleteVisible,
  selectedItem,
  setSelectedItem,
  deleting,
  setDeleting,
  handleAdd,
  handleDelete,
  fetchProducts,
}) {
  /* =====================================================
     IMAGE PICKER
  ===================================================== */
  const pickFromCamera = async () => {
    setShowImgPicker(false);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera access is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.6,
      base64: false,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  const pickFromGallery = async () => {
    setShowImgPicker(false);

    const res = await ImagePicker.launchImageLibraryAsync({
      quality: 0.6,
      base64: false,
    });

    if (!res.canceled) {
      setNewImage(res.assets[0].uri);
    }
  };

  return (
    <>
      {/* ================================
          ADD ITEM MODAL
      ================================ */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add New Item</Text>

            <TextInput
              placeholder="Product Name"
              placeholderTextColor="#9AA6C0"
              style={styles.modalInput}
              value={newName}
              onChangeText={setNewName}
            />

            <Text style={styles.dropdownLabel}>Category:</Text>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              {CATEGORY_LIST.map(cat => (
                <Pressable
                  key={cat.id}
                  onPress={() => setNewCategory(cat.id)}
                  style={{
                    width: '32%',
                    marginVertical: 6,
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor:
                      newCategory === cat.id ? '#2D3648' : '#E8EDF6',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color:
                        newCategory === cat.id ? '#fff' : '#2D3648',
                      fontWeight: '600',
                      fontSize: 12,
                    }}
                  >
                    {cat.title}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* IMAGE PICKER BTN */}
            <Pressable
              onPress={() => setShowImgPicker(true)}
              style={{
                marginTop: 14,
                backgroundColor: '#2D3648',
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>
                Select Image
              </Text>
            </Pressable>

            {/* IMAGE PREVIEW */}
            {newImage ? (
              <Image
                source={{ uri: newImage }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  marginTop: 12,
                  alignSelf: 'center',
                }}
              />
            ) : null}

            <Pressable
              style={styles.dateButton}
              onPress={() => setShowDate(true)}
            >
              <Text style={styles.dateButtonText}>
                {newCategory === "appliance"
                  ? `Select Warranty Date: ${newDate.toDateString()}`
                  : `Select Expiry Date: ${newDate.toDateString()}`}
              </Text>
            </Pressable>

            {showDate && (
              <DateTimePicker
                value={newDate}
                mode="date"
                display="spinner"
                onChange={(e, selDate) => {
                  setShowDate(false);
                  selDate && setNewDate(selDate);
                }}
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalAdd}
                onPress={handleAdd}
              >
                <Text style={styles.modalAddText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ================================
          IMAGE PICKER POPUP
      ================================ */}
      <Modal visible={showImgPicker} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '78%',
              backgroundColor: '#fff',
              padding: 16,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#2D3648',
                marginBottom: 16,
                textAlign: 'center',
              }}
            >
              Select Image From
            </Text>

            <Pressable
              onPress={pickFromCamera}
              style={{
                paddingVertical: 10,
                backgroundColor: '#2D3648',
                borderRadius: 8,
                marginBottom: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>
                Camera
              </Text>
            </Pressable>

            <Pressable
              onPress={pickFromGallery}
              style={{
                paddingVertical: 10,
                backgroundColor: '#2D3648',
                borderRadius: 8,
                marginBottom: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>
                Gallery
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setShowImgPicker(false)}
              style={{
                paddingVertical: 10,
                backgroundColor: '#E4E7EC',
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#2D3648', fontWeight: '600' }}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* ================================
          DELETE POPUP
      ================================ */}
      <Modal visible={deleteVisible} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: '80%',
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#2D3648', marginBottom: 10 }}>
              Delete Item?
            </Text>

            <Text style={{ color: '#6B7280', marginBottom: 20, textAlign: 'center' }}>
              Are you sure you want to delete{" "}
              <Text style={{ fontWeight: '700', color: '#2D3648' }}>
                {selectedItem?.name}
              </Text>
              ?
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <Pressable
                style={styles.componentcancel}
                onPress={() => {
                  setDeleteVisible(false);
                  setSelectedItem(null);
                }}
              >
                <Text style={{ color: '#2D3648', fontWeight: '600' }}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={styles.complonentdelete}
                onPress={handleDelete}
                disabled={deleting}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>
                  {deleting ? "Deleting..." : "Delete"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
