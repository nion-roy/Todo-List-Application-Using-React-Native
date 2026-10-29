import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function TaskSkeleton({ count = 4 }) {
  const pulseAnim = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.85,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.35,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [pulseAnim]);

  const items = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      {items.map((id) => (
        <Animated.View
          key={id}
          style={[styles.skeletonCard, { opacity: pulseAnim }]}
        >
          {/* Checkbox Placeholder */}
          <View style={styles.checkboxCircle} />

          {/* Content Placeholder */}
          <View style={styles.contentArea}>
            {/* Title Line */}
            <View
              style={[
                styles.titleLine,
                { width: id % 2 === 0 ? '70%' : '85%' },
              ]}
            />

            {/* Badges Row Placeholder */}
            <View style={styles.badgeRow}>
              <View style={[styles.pill, { width: 54 }]} />
              <View style={[styles.pill, { width: 48 }]} />
              <View style={[styles.pill, { width: 72 }]} />
            </View>
          </View>

          {/* Delete Button Placeholder */}
          <View style={styles.deleteButton} />
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
  skeletonCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  checkboxCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    marginRight: 14,
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
  },
  titleLine: {
    height: 16,
    borderRadius: 8,
    backgroundColor: '#CBD5E1',
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  pill: {
    height: 20,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
  },
  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    marginLeft: 10,
  },
});
