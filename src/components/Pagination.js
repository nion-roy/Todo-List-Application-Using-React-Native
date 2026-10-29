import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

const toBengaliNumber = (num = 0) => {
  if (num === null || num === undefined) return '০';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => bengaliDigits[d]);
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  startIndex,
  endIndex,
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      {/* Summary Info */}
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>
          মোট {toBengaliNumber(totalItems)}টি কাজের মধ্যে{' '}
          {toBengaliNumber(startIndex + 1)} - {toBengaliNumber(endIndex)} নম্বর কাজ দেখানো হচ্ছে
        </Text>
      </View>

      {/* Pagination Controls */}
      <View style={styles.controlsRow}>
        {/* Previous Button */}
        <TouchableOpacity
          style={[
            styles.navButton,
            currentPage === 1 && styles.navButtonDisabled,
          ]}
          onPress={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          activeOpacity={0.7}
        >
          <ChevronLeft
            size={16}
            color={currentPage === 1 ? '#CBD5E1' : '#334155'}
          />
          <Text
            style={[
              styles.navButtonText,
              currentPage === 1 && styles.navButtonTextDisabled,
            ]}
          >
            আগের পাতা
          </Text>
        </TouchableOpacity>

        {/* Page Number Pills */}
        <View style={styles.pageNumbersRow}>
          {pages.map((p) => {
            const isCurrent = currentPage === p;
            return (
              <TouchableOpacity
                key={p}
                style={[styles.pagePill, isCurrent && styles.pagePillActive]}
                onPress={() => onPageChange(p)}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    styles.pagePillText,
                    isCurrent && styles.pagePillTextActive,
                  ]}
                >
                  {toBengaliNumber(p)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={[
            styles.navButton,
            currentPage === totalPages && styles.navButtonDisabled,
          ]}
          onPress={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.navButtonText,
              currentPage === totalPages && styles.navButtonTextDisabled,
            ]}
          >
            পরের পাতা
          </Text>
          <ChevronRight
            size={16}
            color={currentPage === totalPages ? '#CBD5E1' : '#334155'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  infoRow: {
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
  },
  navButtonDisabled: {
    backgroundColor: '#F1F5F9',
    borderColor: '#F1F5F9',
  },
  navButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  navButtonTextDisabled: {
    color: '#94A3B8',
  },
  pageNumbersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pagePill: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pagePillActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  pagePillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  pagePillTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});
