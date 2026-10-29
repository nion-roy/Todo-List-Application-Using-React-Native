import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  CheckCheck,
  Hourglass,
  ListTodo,
  Trash2,
} from 'lucide-react-native';

const toBengaliNumber = (num = 0) => {
  if (num === null || num === undefined) return '০';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => bengaliDigits[d]);
};

export default function FilterBar({
  activeFilter,
  onSelectFilter,
  counts,
  onClearCompleted,
}) {
  const filters = [
    { id: 'all', label: 'সব কাজ', Icon: ListTodo, count: counts.all },
    { id: 'active', label: 'চলমান', Icon: Hourglass, count: counts.active },
    { id: 'completed', label: 'সম্পন্ন', Icon: CheckCheck, count: counts.completed },
  ];

  return (
    <View style={styles.container}>
      {/* Segmented Filter Pills */}
      <View style={styles.tabsRow}>
        {filters.map((f) => {
          const isActive = activeFilter === f.id;
          const FilterIcon = f.Icon;
          return (
            <TouchableOpacity
              key={f.id}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => onSelectFilter(f.id)}
              activeOpacity={0.75}
            >
              <FilterIcon
                size={14}
                color={isActive ? '#4F46E5' : '#64748B'}
                strokeWidth={2.2}
              />
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {f.label}
              </Text>
              <View style={[styles.badge, isActive && styles.badgeActive]}>
                <Text style={[styles.badgeText, isActive && styles.badgeTextActive]}>
                  {toBengaliNumber(f.count)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Clear Completed Action */}
      {counts.completed > 0 && activeFilter === 'completed' && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onClearCompleted}
          activeOpacity={0.7}
        >
          <Trash2 size={13} color="#DC2626" />
          <Text style={styles.clearButtonText}>সম্পন্ন সব কাজ মুছুন</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 4,
    borderRadius: 16,
    gap: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  tabTextActive: {
    color: '#4F46E5',
    fontWeight: '800',
  },
  badge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 22,
    alignItems: 'center',
  },
  badgeActive: {
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E293B',
  },
  badgeTextActive: {
    color: '#4F46E5',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 10,
    gap: 6,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
});
