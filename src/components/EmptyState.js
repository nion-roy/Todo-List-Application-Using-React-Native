import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  CheckCircle2,
  ClipboardList,
  Hourglass,
  SearchX,
} from 'lucide-react-native';

export default function EmptyState({ activeFilter, isSearching }) {
  const getMessage = () => {
    if (isSearching) {
      return {
        Icon: SearchX,
        iconColor: '#EF4444',
        bgCircle: '#FEF2F2',
        title: 'কোনো কাজ পাওয়া যায়নি!',
        subtitle: 'আপনার সার্চ শব্দের সাথে মেলে এমন কোনো কাজ তালিকায় নেই। অন্য কিছু লিখে খুঁজুন।',
        tag: 'ফলাফল শূন্য',
      };
    }

    switch (activeFilter) {
      case 'active':
        return {
          Icon: CheckCircle2,
          iconColor: '#10B981',
          bgCircle: '#ECFDF5',
          title: 'সব কাজ সম্পন্ন হয়েছে!',
          subtitle: 'বর্তমানে কোনো অসমাপ্ত কাজ নেই। আপনি অসাধারণ কাজ করেছেন!',
          tag: 'সম্পূর্ণ সমাপ্ত',
        };
      case 'completed':
        return {
          Icon: Hourglass,
          iconColor: '#F59E0B',
          bgCircle: '#FFFBEB',
          title: 'এখনও কোনো কাজ সম্পন্ন হয়নি',
          subtitle: 'কাজ শেষ করার পর তালিকার বামপাশের বৃত্তাকার বাটনে ট্যাপ করুন।',
          tag: 'চলমান কাজ',
        };
      default:
        return {
          Icon: ClipboardList,
          iconColor: '#6366F1',
          bgCircle: '#EEF2FF',
          title: 'এখনও কোনো কাজ যোগ করা হয়নি!',
          subtitle: 'আপনার পরিকল্পনা শুরু করতে উপরের বক্সে একটি নতুন কাজ লিখুন।',
          tag: 'নতুন শুরু',
        };
    }
  };

  const { Icon, iconColor, bgCircle, title, subtitle, tag } = getMessage();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={[styles.iconCircleOuter, { backgroundColor: bgCircle }]}>
          <View style={styles.iconCircleInner}>
            <Icon size={28} color={iconColor} strokeWidth={2.2} />
          </View>
        </View>

        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>

        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  iconCircleOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  iconCircleInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  tagBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  titleText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    maxWidth: 280,
  },
});
