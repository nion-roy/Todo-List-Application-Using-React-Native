import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar, Sparkles } from 'lucide-react-native';

const toBengaliNumber = (num = 0) => {
  if (num === null || num === undefined) return '০';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => bengaliDigits[d]);
};

export default function Header({ remainingCount, totalCount }) {
  const getBengaliDate = () => {
    const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
    const months = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    const now = new Date();
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();

    return `${dayName}, ${toBengaliNumber(date)} ${monthName} ${toBengaliNumber(year)}`;
  };

  return (
    <View style={styles.headerContainer}>
      {/* Top Banner Row */}
      <View style={styles.topRow}>
        <View style={styles.dateBadge}>
          <Calendar size={13} color="#4338CA" style={styles.dateBadgeIcon} />
          <Text style={styles.dateText}>{getBengaliDate()}</Text>
        </View>

        <View style={styles.statusPill}>
          <View style={styles.pulseDot} />
          <Text style={styles.statusPillText}>আজকের পরিকল্পনা</Text>
        </View>
      </View>

      {/* Main Title Row */}
      <View style={styles.titleRow}>
        <View style={styles.titleContent}>
          <Text style={styles.titleText}>দৈনন্দিন কাজের তালিকা</Text>
          <View style={styles.subtitleRow}>
            <Text style={styles.subtitleText}>আপনার দৈনন্দিন লক্ষ্যগুলো সাজিয়ে রাখুন সহজে</Text>
            <Sparkles size={13} color="#F59E0B" />
          </View>
        </View>

        {/* Counter Badge */}
        <View style={styles.counterBadge}>
          <View style={styles.counterCircle}>
            <Text style={styles.counterNumber}>
              {toBengaliNumber(remainingCount)}
            </Text>
          </View>
          <Text style={styles.counterLabel}>বাকি কাজ</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  dateBadgeIcon: {
    marginRight: 6,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4338CA',
    letterSpacing: 0.2,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
    marginRight: 6,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContent: {
    flex: 1,
    paddingRight: 14,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  subtitleText: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    fontWeight: '500',
  },
  counterBadge: {
    backgroundColor: '#4F46E5',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 5,
  },
  counterCircle: {
    marginBottom: 2,
  },
  counterNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  counterLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E0E7FF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
