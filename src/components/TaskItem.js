import React from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AlertTriangle,
  BookOpen,
  Briefcase,
  Check,
  CircleDot,
  Clock,
  Flame,
  Tag,
  Trash2,
  User,
} from 'lucide-react-native';

const PRIORITY_THEMES = {
  জরুরি: {
    badgeBg: '#FEE2E2',
    badgeText: '#B91C1C',
    border: '#FECACA',
    Icon: Flame,
    iconColor: '#DC2626',
  },
  মাঝারি: {
    badgeBg: '#FEF3C7',
    badgeText: '#B45309',
    border: '#FDE68A',
    Icon: AlertTriangle,
    iconColor: '#D97706',
  },
  সাধারণ: {
    badgeBg: '#DBEAFE',
    badgeText: '#1D4ED8',
    border: '#BFDBFE',
    Icon: CircleDot,
    iconColor: '#2563EB',
  },
};

const CATEGORY_THEMES = {
  ব্যক্তিগত: { bg: '#EEF2FF', text: '#3730A3', border: '#C7D2FE', Icon: User },
  অফিস: { bg: '#E0F2FE', text: '#0369A1', border: '#BAE6FD', Icon: Briefcase },
  পড়াশোনা: { bg: '#F3E8FF', text: '#6D28D9', border: '#DDD6FE', Icon: BookOpen },
};

export default function TaskItem({ item, onToggleComplete, onDelete }) {
  const priorityTheme = PRIORITY_THEMES[item.priority] || PRIORITY_THEMES['সাধারণ'];
  const categoryTheme = CATEGORY_THEMES[item.category] || {
    bg: '#F1F5F9',
    text: '#334155',
    border: '#E2E8F0',
    Icon: Tag,
  };

  const PriorityIcon = priorityTheme.Icon;
  const CategoryIcon = categoryTheme.Icon;

  const confirmDelete = () => {
    if (Platform.OS === 'web') {
      const confirmed = typeof window !== 'undefined' && window.confirm
        ? window.confirm(`আপনি কি "${item.title}" কাজটি মুছে ফেলতে চান?`)
        : true;
      if (confirmed) {
        onDelete(item.id);
      }
    } else {
      Alert.alert(
        'কাজ মুছে ফেলুন',
        `আপনি কি "${item.title}" কাজটি তালিকা থেকে মুছে ফেলতে চান?`,
        [
          { text: 'বাতিল', style: 'cancel' },
          {
            text: 'মুছে ফেলুন',
            style: 'destructive',
            onPress: () => onDelete(item.id),
          },
        ]
      );
    }
  };

  return (
    <View style={[styles.card, item.completed && styles.cardCompleted]}>
      {/* Checkbox Button */}
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
        onPress={() => onToggleComplete(item.id)}
        activeOpacity={0.7}
      >
        {item.completed && (
          <Check size={16} color="#FFFFFF" strokeWidth={3} />
        )}
      </TouchableOpacity>

      {/* Task Content */}
      <View style={styles.textContainer}>
        {/* Title */}
        <Text
          style={[
            styles.titleText,
            item.completed && styles.titleTextCompleted,
          ]}
          numberOfLines={3}
        >
          {item.title}
        </Text>

        {/* Badges Row */}
        <View style={styles.badgeRow}>
          {/* Completed Badge Indicator */}
          {item.completed && (
            <View style={styles.completedStatusBadge}>
              <Check size={11} color="#059669" strokeWidth={2.5} />
              <Text style={styles.completedStatusText}>সম্পন্ন</Text>
            </View>
          )}

          {/* Category Tag */}
          {item.category ? (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: categoryTheme.bg,
                  borderColor: categoryTheme.border,
                },
              ]}
            >
              <CategoryIcon size={12} color={categoryTheme.text} />
              <Text
                style={[
                  styles.badgeLabel,
                  { color: categoryTheme.text },
                ]}
              >
                {item.category}
              </Text>
            </View>
          ) : null}

          {/* Priority Tag */}
          {item.priority ? (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: priorityTheme.badgeBg,
                  borderColor: priorityTheme.border,
                },
              ]}
            >
              <PriorityIcon size={12} color={priorityTheme.iconColor} />
              <Text
                style={[
                  styles.badgeLabel,
                  { color: priorityTheme.badgeText },
                ]}
              >
                {item.priority}
              </Text>
            </View>
          ) : null}

          {/* Timestamp */}
          {item.createdAt ? (
            <View style={styles.timeBadge}>
              <Clock size={11} color="#64748B" />
              <Text style={styles.timeText}>{item.createdAt}</Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={confirmDelete}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Trash2 size={16} color="#DC2626" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  cardCompleted: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    backgroundColor: '#FFFFFF',
  },
  checkboxCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#059669',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    lineHeight: 23,
    letterSpacing: -0.2,
  },
  titleTextCompleted: {
    color: '#64748B',
    textDecorationLine: 'line-through',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 7,
  },
  completedStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  completedStatusText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#15803D',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});
