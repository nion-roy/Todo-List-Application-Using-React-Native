import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  CheckCircle2,
  ClipboardList,
  Clock,
  PartyPopper,
} from 'lucide-react-native';

const toBengaliNumber = (num = 0) => {
  if (num === null || num === undefined) return '০';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => bengaliDigits[d]);
};

export default function StatsCard({ totalCount, completedCount, remainingCount }) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isAllDone = totalCount > 0 && remainingCount === 0;

  return (
    <View style={styles.card}>
      {/* Top Header Row */}
      <View style={styles.topRow}>
        <View style={styles.labelGroup}>
          <Text style={styles.progressLabel}>কাজের অগ্রগতি</Text>
          {isAllDone && (
            <View style={styles.allDoneBadge}>
              <PartyPopper size={12} color="#16A34A" />
              <Text style={styles.allDoneText}>চমৎকার! সব শেষ</Text>
            </View>
          )}
        </View>

        <View style={styles.percentBadge}>
          <Text style={styles.progressPercent}>{toBengaliNumber(percentage)}%</Text>
          <Text style={styles.percentSub}>সম্পন্ন</Text>
        </View>
      </View>

      {/* Progress Bar with Glow Track */}
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${percentage}%`,
              backgroundColor: isAllDone ? '#10B981' : '#4F46E5',
            },
          ]}
        />
      </View>

      {/* 3 Modern Metric Cards */}
      <View style={styles.metricsContainer}>
        {/* Total Tasks */}
        <View style={[styles.metricTile, styles.totalTile]}>
          <View style={[styles.iconContainer, { backgroundColor: '#EEF2FF' }]}>
            <ClipboardList size={16} color="#4F46E5" />
          </View>
          <View>
            <Text style={[styles.metricValue, { color: '#334155' }]}>
              {toBengaliNumber(totalCount)}
            </Text>
            <Text style={styles.metricLabel}>মোট কাজ</Text>
          </View>
        </View>

        {/* Pending Tasks */}
        <View style={[styles.metricTile, styles.pendingTile]}>
          <View style={[styles.iconContainer, { backgroundColor: '#FEF3C7' }]}>
            <Clock size={16} color="#D97706" />
          </View>
          <View>
            <Text style={[styles.metricValue, { color: '#D97706' }]}>
              {toBengaliNumber(remainingCount)}
            </Text>
            <Text style={styles.metricLabel}>বাকি রয়েছে</Text>
          </View>
        </View>

        {/* Completed Tasks */}
        <View style={[styles.metricTile, styles.completedTile]}>
          <View style={[styles.iconContainer, { backgroundColor: '#DCFCE7' }]}>
            <CheckCircle2 size={16} color="#16A34A" />
          </View>
          <View>
            <Text style={[styles.metricValue, { color: '#059669' }]}>
              {toBengaliNumber(completedCount)}
            </Text>
            <Text style={styles.metricLabel}>সম্পন্ন</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 8,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  allDoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  allDoneText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },
  percentBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '900',
    color: '#4F46E5',
  },
  percentSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6366F1',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 10,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  metricTile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalTile: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  pendingTile: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FEF3C7',
  },
  completedTile: {
    backgroundColor: '#F0FDF4',
    borderColor: '#DCFCE7',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 18,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 1,
  },
});
