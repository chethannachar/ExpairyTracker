import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Svg, Circle as SvgCircle } from 'react-native-svg';
import styles from './HomeScreen';

const { width: SCREEN_W } = Dimensions.get('window');

/* ---------- Demo data ---------- */
const CATEGORIES = [
  { id: 'food', title: 'Food', icon: 'food' },
  { id: 'medicine', title: 'Medicine', icon: 'medical-bag' },
  { id: 'grocery', title: 'Grocery', icon: 'shopping' },
  { id: 'appliance', title: 'Appliances', icon: 'blender' },
  { id: 'cosmetics', title: 'Cosmetics', icon: 'lipstick' },
];

const EXPIRING = [
  {
    id: '1',
    name: 'Milk Packet',
    daysLeft: 2,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
  },
  {
    id: '2',
    name: 'Crocin Strip',
    daysLeft: 5,
    category: 'medicine',
    image: 'https://images.unsplash.com/photo-1608848461950-0fe51df2b056?w=1200&q=80',
  },
  {
    id: '3',
    name: 'Bread Loaf',
    daysLeft: 1,
    category: 'grocery',
    image: 'https://images.unsplash.com/photo-1579632652768-5ab21a6856f6?w=1200&q=80',
  },
  {
    id: '4',
    name: 'Vitamin C',
    daysLeft: 3,
    category: 'medicine',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=1200&q=80',
  },
];

/* ---------- Radial Indicator ---------- */
function Radial({ daysLeft = 0, size = 46, stroke = 4, maxDays = 14 }) {
  const pct = Math.max(0, Math.min(1, (maxDays - daysLeft) / maxDays));
  const radius = (size - stroke) / 2;
  const circ = Math.PI * 2 * radius;
  const offset = circ * (1 - pct);

  let color = '#22C55E';
  if (daysLeft <= 1) color = '#FF3B30';
  else if (daysLeft <= 2) color = '#FF7A45';
  else if (daysLeft <= 5) color = '#FFB84D';

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <SvgCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F1F6FF"
          strokeWidth={stroke}
          fill="none"
        />
        <SvgCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${circ}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <View style={styles.radialCenter}>
        <Text style={styles.radialNumber}>{daysLeft}</Text>
        <Text style={styles.radialUnit}>d</Text>
      </View>
    </View>
  );
}

/* ---------- Animated Category Pill ---------- */
function AnimatedPill({ item, index, scrollX, active, onPress }) {
  const inputRange = [(index - 1) * 110, index * 110, (index + 1) * 110];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [1, 1.06, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPress(item)}
        style={[styles.pill, active ? styles.pillActive : styles.pillInactive]}
      >
        <MaterialCommunityIcons
          name={item.icon}
          size={18}
          color={active ? '#fff' : '#274060'}
        />
        <Text style={[styles.pillText, active && styles.pillTextActive]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

/* ---------- Hero Section ---------- */
function Hero() {
  return (
    <View style={styles.bigHero}>
      <View style={styles.bigHeroLeft}>
        <Text style={styles.bigHeroTitle}>Save food. Save money.</Text>
        <Text style={styles.bigHeroSubtitle}>
          Smart reminders, pantry analytics & trending UX — built for millions.
        </Text>

        <View style={styles.bigHeroActions}>
          <TouchableOpacity style={styles.primaryBtn}>
            <MaterialIcons name="add" size={16} color="#fff" />
            <Text style={styles.primaryBtnText}>Add item</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ghostBtn}>
            <Text style={styles.ghostBtnText}>How it works</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1516687400427-0b4b4b05a9f9?w=1200&q=80',
        }}
        style={styles.bigHeroImage}
      />
    </View>
  );
}

/* ---------- Expiring Item Row ---------- */
function Row({ item, index }) {
  const animY = useRef(new Animated.Value(18)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animY, {
        toValue: 0,
        duration: 420,
        delay: index * 60,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 420,
        delay: index * 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[styles.rowCard, { transform: [{ translateY: animY }], opacity }]}
    >
      <Image source={{ uri: item.image }} style={styles.rowImage} />

      <View style={styles.rowBody}>
        <Text numberOfLines={1} style={styles.rowTitle}>
          {item.name}
        </Text>

        <Text style={styles.rowSubtitle}>
          {item.category} •{' '}
          {item.daysLeft <= 1 ? 'Expires today' : `${item.daysLeft} days`}
        </Text>
      </View>

      <Radial daysLeft={item.daysLeft} />
    </Animated.View>
  );
}

/* ---------- Main Screen Component ---------- */
export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [query, setQuery] = useState('');
  const scrollX = useRef(new Animated.Value(0)).current;

  const sorted = useMemo(
    () => EXPIRING.slice().sort((a, b) => a.daysLeft - b.daysLeft),
    []
  );

  const filtered = useMemo(() => {
    const base = activeCategory
      ? sorted.filter(s => s.category === activeCategory.id)
      : sorted;

    if (!query.trim()) return base;

    const q = query.toLowerCase();
    return base.filter(
      i =>
        i.name.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
    );
  }, [activeCategory, query, sorted]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#07133F"
        translucent={false}
      />

      {/* Header */}
      <View style={styles.headerArea}>
        <View style={styles.headerGlass}>
          <View>
            <Text style={styles.logo}>Pantry</Text>
            <Text style={styles.logoSub}>Expiry • trending UI</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={styles.iconBtn}>
              <MaterialIcons
                name="notifications-none"
                size={18}
                color="#274060"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBtn}>
              <MaterialCommunityIcons name="account" size={18} color="#274060" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
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
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Hero />

        {/* Categories */}
        <View style={styles.sectionTop}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>

        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={c => c.id}
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
                setActiveCategory(prev => (prev?.id === c.id ? null : c))
              }
            />
          )}
        />

        {/* Expiring Soon */}
        <View style={styles.sectionTop}>
          <Text style={styles.sectionTitle}>Expiring Soon</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item, index }) => <Row item={item} index={index} />}
        />
      </View>
    </SafeAreaView>
  );
}
