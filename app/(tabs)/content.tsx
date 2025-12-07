import React from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import styles from './HomeScreen';
import { Row } from "./data.tsx";

export function ArchiveModal({
  visible,
  setVisible,
  expiredItems,
  onLongPress
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.safe}>
        <View style={styles.archiveHeader}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <MaterialIcons name="arrow-back" size={24} color="#2D3648" />
          </TouchableOpacity>
          <Text style={styles.archiveTitle}>Expired Items</Text>
          <View style={{ width: 24 }} />
        </View>

        <FlatList
          data={expiredItems}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 18 }}
          renderItem={({ item, index }) => (
            <Pressable
              onLongPress={() => onLongPress(item)}
              delayLongPress={300}
              android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
            >
              <Row item={item} index={index} />
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <MaterialCommunityIcons name="archive" size={48} color="#C0C5D0" />
              <Text style={{ color: '#6B7280', marginTop: 12, fontSize: 16 }}>
                No expired items
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </Modal>
  );
}

export function NotificationsModal({
  visible,
  setVisible,
  notifications
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.safe}>
        <View style={styles.archiveHeader}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <MaterialIcons name="arrow-back" size={24} color="#2D3648" />
          </TouchableOpacity>
          <Text style={styles.archiveTitle}>Notifications</Text>
          <View style={{ width: 24 }} />
        </View>

        <FlatList
          data={notifications}
          keyExtractor={item => String(item.id) + item.timestamp}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 18, paddingTop: 12 }}
          renderItem={({ item }) => (
            <View style={styles.notificationCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationTime}>{item.timestamp}</Text>
              </View>
              <View style={[styles.notificationDaysLeft, { backgroundColor: item.daysLeft <= 1 ? '#FF3B30' : item.daysLeft <= 3 ? '#FF7A45' : '#FFB84D' }]}>
                <Text style={styles.notificationDaysText}>{item.daysLeft}d</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <MaterialCommunityIcons name="bell-off" size={48} color="#C0C5D0" />
              <Text style={{ color: '#6B7280', marginTop: 12, fontSize: 16 }}>
                No notifications
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </Modal>
  );
}

export function CustomAlertModal({
  visible,
  setVisible,
  data
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.alertContainer}>
        <View style={styles.alertBox}>
          <View style={[
            styles.alertIconContainer,
            {
              backgroundColor:
                data.type === 'success'
                  ? '#D4EDDA'
                  : data.type === 'error'
                  ? '#F8D7DA'
                  : '#D1ECF1'
            }
          ]}>
            <MaterialCommunityIcons
              name={
                data.type === 'success'
                  ? 'check-circle'
                  : data.type === 'error'
                  ? 'alert-circle'
                  : 'information'
              }
              size={32}
              color={
                data.type === 'success'
                  ? '#155724'
                  : data.type === 'error'
                  ? '#721C24'
                  : '#0C5460'
              }
            />
          </View>

          <Text style={styles.alertTitle}>{data.title}</Text>
          <Text style={styles.alertMessage}>{data.message}</Text>

          <Pressable
            style={[
              styles.alertButton,
              data.type === 'error'
                ? styles.alertButtonDanger
                : styles.alertButtonPrimary
            ]}
            onPress={() => setVisible(false)}
          >
            <Text style={styles.alertButtonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
