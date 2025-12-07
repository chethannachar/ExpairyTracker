import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import styles from './HomeScreen';

import {
  AnimatedPill,
  Banner,
  CATEGORY_LIST,
  Row
} from "./data.tsx";

import AdditionalContent from './AdditionalContent';
import {
  ArchiveModal,
  CustomAlertModal,
  NotificationsModal
} from './content.tsx';

const BACKEND_URL = "http://10.170.86.65:5000";

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [query, setQuery] = useState('');
  const scrollX = useRef(new Animated.Value(0)).current;
  const [items, setItems] = useState([]);

  /* MODAL STATES */
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('food');
  const [newImage, setNewImage] = useState('');
  const [newDate, setNewDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showImgPicker, setShowImgPicker] = useState(false);

  /* DELETE POPUP */
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  /* ARCHIVE MODAL */
  const [archiveVisible, setArchiveVisible] = useState(false);

  /* NOTIFICATION STATES */
  const [notifications, setNotifications] = useState([]);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notifiedProductIds, setNotifiedProductIds] = useState(new Set());

  /* CUSTOM ALERT STATES */
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const [customAlertData, setCustomAlertData] = useState({
    title: '',
    message: '',
    type: 'info'
  });

  /* =====================================================
     REQUEST NOTIFICATION PERMISSIONS
  ===================================================== */
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Notification permissions not granted');
      }
    };
    requestPermissions();
  }, []);

  /* =====================================================
     FETCH PRODUCTS
  ===================================================== */
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/products`);
      const json = await res.json();
      if (json.products) {
        setItems(json.products);
        checkExpiringProducts(json.products);
      }
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  /* =====================================================
     CHECK EXPIRING PRODUCTS (within 3 days)
  ===================================================== */
  const checkExpiringProducts = async (productList) => {
    const expiringProducts = productList.filter(
      item => item.daysLeft > 0 && item.daysLeft <= 3
    );

    for (const item of expiringProducts) {
      if (!notifiedProductIds.has(item.id)) {
        const notificationMessage = `${item.name} is expiring in ${item.daysLeft} day${item.daysLeft > 1 ? 's' : ''} on ${new Date(item.expiry_date).toDateString()}`;
        
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `${item.name} expiring soon! ⏰`,
            body: notificationMessage,
            data: {
              productId: item.id,
              productName: item.name,
              daysLeft: item.daysLeft,
            },
            badge: 1,
          },
          trigger: null,
        });

        setNotifiedProductIds(prev => new Set([...prev, item.id]));
      }
    }

    const newNotifications = expiringProducts.map(item => ({
      id: item.id,
      title: `${item.name} expiring soon`,
      message: `${item.name} is expiring in ${item.daysLeft} day${item.daysLeft > 1 ? 's' : ''} on ${new Date(item.expiry_date).toDateString()}`,
      timestamp: new Date().toLocaleTimeString(),
      daysLeft: item.daysLeft,
      read: false
    }));

    setNotifications(prev => {
      const existingIds = new Set(prev.map(n => n.id));
      const filteredNew = newNotifications.filter(n => !existingIds.has(n.id));
      return [...filteredNew, ...prev];
    });
  };

  /* =====================================================
     REFRESH PRODUCTS PERIODICALLY
  ===================================================== */
  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  /* =====================================================
     SORT + FILTER
  ===================================================== */
  const sorted = useMemo(
    () => items.slice().sort((a, b) => a.daysLeft - b.daysLeft),
    [items]
  );

  const filtered = useMemo(() => {
    const base = activeCategory
      ? sorted.filter(s => s.category === activeCategory.id && s.daysLeft > 0)
      : sorted.filter(s => s.daysLeft > 0);

    if (!query.trim()) return base;

    const q = query.toLowerCase();
    return base.filter(
      i =>
        i.name.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
    );
  }, [activeCategory, query, sorted]);

  /* =====================================================
     EXPIRED ITEMS (for archive)
  ===================================================== */
  const expiredItems = useMemo(() => {
    return items.filter(item => item.daysLeft <= 0).sort((a, b) => a.daysLeft - b.daysLeft);
  }, [items]);

  /* =====================================================
     OPEN DELETE POPUP
  ===================================================== */
  const openDeletePopup = (item) => {
    setSelectedItem(item);
    setDeleteVisible(true);
  };

  /* =====================================================
     DELETE PRODUCT
  ===================================================== */
  const handleDelete = async () => {
    if (!selectedItem) return;

    setDeleting(true);
    try {
      const res = await fetch(
        `${BACKEND_URL}/delete-product/${selectedItem.id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setDeleteVisible(false);
        setSelectedItem(null);
        setDeleting(false);
        showCustomAlert("Success", `${selectedItem.name} removed successfully`, "success");
        await fetchProducts();
      } else {
        let txt = await res.text();
        setDeleteVisible(false);
        setDeleting(false);
        showCustomAlert("Error", `Failed to delete product. ${txt}`, "error");
      }
    } catch (err) {
      setDeleteVisible(false);
      setDeleting(false);
      showCustomAlert("Network Error", "Could not reach server.", "error");
      console.log("Delete error:", err);
    }
  };

  /* =====================================================
     CUSTOM ALERT
  ===================================================== */
  const showCustomAlert = (title, message, type = "info") => {
    setCustomAlertData({ title, message, type });
    setCustomAlertVisible(true);
  };

  /* =====================================================
     ADD PRODUCT
  ===================================================== */
  const handleAdd = async () => {
    if (!newName.trim()) {
      showCustomAlert("Error", "Please enter a product name.", "error");
      return;
    }

    try {
      const payload = {
        name: newName,
        category: newCategory,
        image: newImage.trim() || null,
        expiry_date: newDate.toISOString().split("T")[0],
      };

      const res = await fetch(`${BACKEND_URL}/add-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.status === "success") {
        setModalVisible(false);
        setNewName('');
        setNewImage('');
        setNewCategory('food');
        showCustomAlert("Success", "Item added to database!", "success");
        fetchProducts();
      } else {
        showCustomAlert("Error", "Server error.", "error");
      }
    } catch (error) {
      showCustomAlert("Network Error", "Could not reach backend.", "error");
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={{ height: StatusBar.currentHeight, backgroundColor: '#2D3648' }} />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Expiry Dashboard</Text>
          <Text style={styles.subtitle}>Smart Inventory System</Text>
        </View>

        <View style={styles.rightIcons}>
          <TouchableOpacity
            onPress={() => {
              setNotifications(prev => prev.map(n => ({ ...n, read: true })));
              setNotificationVisible(true);
            }}
          >
            <View>
              <MaterialIcons name="notifications-none" size={22} color="#2D3648" />
              {unreadCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>{unreadCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setArchiveVisible(true)}>
            <MaterialCommunityIcons name="archive-outline" size={22} color="#2D3648" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addTopBtn}
            onPress={() => setModalVisible(true)}
          >
            <MaterialIcons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* SEARCH */}
      <View style={styles.searchRow}>
        <MaterialIcons name="search" size={18} color="#9AA6C0" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for items or category"
          placeholderTextColor="#9AA6C0"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity
          onPress={() => {
            setQuery('');
            setActiveCategory(null);
          }}
        >
          <MaterialIcons name="close" size={18} color="#9AA6C0" />
        </TouchableOpacity>
      </View>

      {/* BODY */}
      <View style={styles.content}>
        <Banner />

        <View style={styles.sectionTop}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>

        <View style={styles.categoriesWrapper}>
          <Animated.FlatList
            horizontal
            data={CATEGORY_LIST}
            keyExtractor={c => c.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pillsContainer}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            renderItem={({ item, index }) => (
              <AnimatedPill
                item={item}
                index={index}
                scrollX={scrollX}
                active={activeCategory?.id === item.id}
                onPress={c =>
                  setActiveCategory(prev =>
                    prev?.id === c.id ? null : c
                  )
                }
              />
            )}
          />
        </View>

        <View style={styles.sectionTop}>
          <Text style={styles.sectionTitle}>Expiring Soon</Text>
        </View>

        <FlatList
          data={filtered}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item, index }) => (
            <Pressable
              onLongPress={() => openDeletePopup(item)}
              delayLongPress={300}
              android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
            >
              <Row item={item} index={index} />
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <MaterialCommunityIcons name="inbox-outline" size={48} color="#C0C5D0" />
              <Text style={{ color: '#6B7280', marginTop: 12, fontSize: 16 }}>
                No items expiring soon
              </Text>
            </View>
          }
        />
      </View>

      {/* ================================
          MODALS
      ================================ */}
      <ArchiveModal
        visible={archiveVisible}
        setVisible={setArchiveVisible}
        expiredItems={expiredItems}
        onLongPress={openDeletePopup}
      />

      <NotificationsModal
        visible={notificationVisible}
        setVisible={setNotificationVisible}
        notifications={notifications}
      />

      <CustomAlertModal
        visible={customAlertVisible}
        setVisible={setCustomAlertVisible}
        data={customAlertData}
      />

      {/* ================================
          ADDITIONAL CONTENT (MODALS)
      ================================ */}
      <AdditionalContent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newName={newName}
        setNewName={setNewName}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        newImage={newImage}
        setNewImage={setNewImage}
        newDate={newDate}
        setNewDate={setNewDate}
        showDate={showDate}
        setShowDate={setShowDate}
        showImgPicker={showImgPicker}
        setShowImgPicker={setShowImgPicker}
        deleteVisible={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        deleting={deleting}
        setDeleting={setDeleting}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        fetchProducts={fetchProducts}
      />
    </SafeAreaView>
  );
}
