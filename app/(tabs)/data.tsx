import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Svg, Circle as SvgCircle } from "react-native-svg";
import styles from "./HomeScreen";

export const CATEGORY_LIST = [
  { id: 'food', title: 'Food', icon: 'food' },
  { id: 'medicine', title: 'Medicine', icon: 'medical-bag' },
  { id: 'grocery', title: 'Grocery', icon: 'shopping' },
  { id: 'appliance', title: 'Appliances', icon: 'blender' },
  { id: 'cosmetics', title: 'Cosmetics', icon: 'lipstick' },
  { id: 'others', title: 'Others', icon: 'dots-horizontal' },
];

export const getCategoryIcon = (categoryId) => {
  const cat = CATEGORY_LIST.find(c => c.id === categoryId);
  return cat ? cat.icon : "dots-horizontal";
};

/* =====================================================
   FORMAT DAYS TO YEARS/MONTHS/DAYS
===================================================== */
export const formatDuration = (daysLeft) => {
  if (daysLeft <= 0) return "Expired";

  if (daysLeft >= 365) {
    const years = Math.floor(daysLeft / 365);
    const remainingDays = daysLeft % 365;
    if (remainingDays === 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    }
    return `${years} year${years > 1 ? 's' : ''} ${remainingDays}d`;
  }

  if (daysLeft >= 30) {
    const months = Math.floor(daysLeft / 30);
    const remainingDays = daysLeft % 30;
    if (remainingDays === 0) {
      return `${months} month${months > 1 ? 's' : ''}`;
    }
    return `${months} month${months > 1 ? 's' : ''} ${remainingDays}d`;
  }

  return `${daysLeft} day${daysLeft > 1 ? 's' : ''}`;
};

/* =====================================================
   GET RADIAL DISPLAY TEXT
===================================================== */
export const getRadialText = (daysLeft) => {
  if (daysLeft <= 0) return { number: "0", unit: "d" };

  if (daysLeft >= 365) {
    const years = Math.floor(daysLeft / 365);
    return { number: String(years), unit: "y" };
  }

  if (daysLeft >= 30) {
    const months = Math.floor(daysLeft / 30);
    return { number: String(months), unit: "m" };
  }

  return { number: String(daysLeft), unit: "d" };
};

/* =====================================================
   GET RADIAL COLOR BASED ON DAYS LEFT
===================================================== */
export const getRadialColor = (daysLeft) => {
  if (daysLeft <= 0) return '#808080'; // Gray for expired
  if (daysLeft <= 1) return '#FF3B30'; // Red for 1 day
  if (daysLeft <= 3) return '#FF7A45'; // Orange for 2-3 days
  if (daysLeft <= 7) return '#FFB84D'; // Yellow for 4-7 days
  if (daysLeft <= 30) return '#FFC659'; // Light yellow for 8-30 days
  return '#22C55E'; // Green for 30+ days
};

export function Radial({ daysLeft = 0, size = 46, stroke = 4, maxDays = 30 }) {
  const displayDays = Math.max(0, daysLeft);
  const pct = Math.max(0, Math.min(1, (maxDays - displayDays) / maxDays));
  const radius = (size - stroke) / 2;
  const circ = Math.PI * 2 * radius;
  const offset = circ * (1 - pct);

  const color = getRadialColor(daysLeft);
  const radialText = getRadialText(daysLeft);
  
  // Background fill color (lighter version of stroke color)
  let fillColor = '#E8F5E9'; // Light green
  if (daysLeft <= 1) fillColor = '#FFEBEE'; // Light red
  else if (daysLeft <= 3) fillColor = '#FFE0B2'; // Light orange
  else if (daysLeft <= 7) fillColor = '#FFF9C4'; // Light yellow
  else if (daysLeft <= 30) fillColor = '#FFFDE7'; // Very light yellow

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Background filled circle */}
        <SvgCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill={fillColor}
        />
        {/* Progress stroke */}
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
        <Text style={styles.radialNumber}>{radialText.number}</Text>
        <Text style={styles.radialUnit}>{radialText.unit}</Text>
      </View>
    </View>
  );
}

export function AnimatedPill({ item, index, scrollX, active, onPress }) {
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

export function Banner() {
  return (
    <View style={styles.bannerBox}>
      <Text style={styles.bannerText}>Sponsored Ad Banner</Text>
    </View>
  );
}

export function Row({ item, index }) {
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

  const hasImage = item.image && item.image.trim() !== "";
  const formattedDuration = formatDuration(item.daysLeft);

  return (
    <Animated.View
      style={[
        styles.rowCard,
        { transform: [{ translateY: animY }], opacity },
      ]}
    >
      {hasImage ? (
        <Image source={{ uri: item.image }} style={styles.rowImage} />
      ) : (
        <View
          style={[
            styles.rowImage,
            {
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e2e6eeff",
              borderColor: "#184794ff",
            },
          ]}
        >
          <MaterialCommunityIcons
            name={getCategoryIcon(item.category)}
            size={32}
            color="#03031aff"
          />
        </View>
      )}

      <View style={styles.rowBody}>
        <Text numberOfLines={1} style={styles.rowTitle}>
          {item.name}
        </Text>

        <Text style={styles.rowSubtitle}>
          {item.category} • {formattedDuration}
        </Text>
      </View>

      <Radial daysLeft={item.daysLeft} />
    </Animated.View>
  );
}
