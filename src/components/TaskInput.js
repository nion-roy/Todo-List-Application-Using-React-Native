import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AlertTriangle,
  BookOpen,
  Briefcase,
  CircleDot,
  Flame,
  PenLine,
  Plus,
  User,
  X,
  Zap,
} from 'lucide-react-native';

const CATEGORIES = [
  { id: 'ব্যক্তিগত', label: 'ব্যক্তিগত', Icon: User, color: '#6366F1' },
  { id: 'অফিস', label: 'অফিস', Icon: Briefcase, color: '#0EA5E9' },
  { id: 'পড়াশোনা', label: 'পড়াশোনা', Icon: BookOpen, color: '#8B5CF6' },
];

const PRIORITIES = [
  { id: 'সাধারণ', label: 'সাধারণ', Icon: CircleDot, color: '#3B82F6', activeBg: '#EFF6FF' },
  { id: 'মাঝারি', label: 'মাঝারি', Icon: AlertTriangle, color: '#F59E0B', activeBg: '#FFFBEB' },
  { id: 'জরুরি', label: 'জরুরি', Icon: Flame, color: '#EF4444', activeBg: '#FEF2F2' },
];

export default function TaskInput({ onAddTask }) {
  const [text, setText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [selectedPriority, setSelectedPriority] = useState(PRIORITIES[1].id);
  const [isFocused, setIsFocused] = useState(false);

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.alert) {
        window.alert('সতর্কতা: অনুগ্রহ করে কাজের বিবরণ লিখুন!');
      } else {
        Alert.alert('সতর্কতা', 'অনুগ্রহ করে কাজের বিবরণ লিখুন!', [
          { text: 'ঠিক আছে', style: 'default' },
        ]);
      }
      return;
    }

    onAddTask({
      title: trimmed,
      category: selectedCategory,
      priority: selectedPriority,
    });

    setText('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.card}>
      {/* Title */}
      <View style={styles.headerRow}>
        <View style={styles.iconCircle}>
          <Zap size={14} color="#4F46E5" />
        </View>
        <Text style={styles.sectionTitle}>নতুন কাজ তৈরি করুন</Text>
      </View>

      {/* Input Box */}
      <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
        <PenLine size={16} color="#94A3B8" style={styles.inputPrefixIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="এখানে কাজের নাম লিখুন (যেমন: বই পড়া, কোডিং প্র্যাকটিস)..."
          placeholderTextColor="#94A3B8"
          value={text}
          onChangeText={setText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          returnKeyType="done"
          onSubmitEditing={handleAdd}
        />
        {text.length > 0 && (
          <TouchableOpacity
            onPress={() => setText('')}
            style={styles.clearInputButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <X size={13} color="#64748B" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Selection */}
      <View style={styles.optionSection}>
        <Text style={styles.optionHeading}>ক্যাটাগরি নির্ধারণ:</Text>
        <View style={styles.chipRow}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const CatIcon = cat.Icon;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                activeOpacity={0.7}
                style={[
                  styles.categoryChip,
                  isSelected && {
                    backgroundColor: cat.color,
                    borderColor: cat.color,
                  },
                ]}
              >
                <CatIcon
                  size={13}
                  color={isSelected ? '#FFFFFF' : cat.color}
                />
                <Text
                  style={[
                    styles.categoryChipText,
                    isSelected && styles.chipTextSelected,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Priority Selection */}
      <View style={styles.optionSection}>
        <Text style={styles.optionHeading}>গুরুত্ব (Priority):</Text>
        <View style={styles.chipRow}>
          {PRIORITIES.map((pri) => {
            const isSelected = selectedPriority === pri.id;
            const PriIcon = pri.Icon;
            return (
              <TouchableOpacity
                key={pri.id}
                onPress={() => setSelectedPriority(pri.id)}
                activeOpacity={0.7}
                style={[
                  styles.priorityChip,
                  isSelected && {
                    backgroundColor: pri.activeBg,
                    borderColor: pri.color,
                  },
                ]}
              >
                <PriIcon
                  size={12}
                  color={isSelected ? pri.color : '#94A3B8'}
                />
                <Text
                  style={[
                    styles.priorityChipText,
                    isSelected && { color: pri.color, fontWeight: '800' },
                  ]}
                >
                  {pri.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAdd}
        activeOpacity={0.85}
      >
        <View style={styles.addButtonIconCircle}>
          <Plus size={15} color="#FFFFFF" strokeWidth={3} />
        </View>
        <Text style={styles.addButtonText}>তালিকায় যোগ করুন</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  inputWrapperFocused: {
    borderColor: '#4F46E5',
    backgroundColor: '#FFFFFF',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  inputPrefixIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    paddingVertical: 4,
    paddingHorizontal: 0,
    fontWeight: '600',
    outlineStyle: 'none',
    outlineWidth: 0,
  },
  clearInputButton: {
    padding: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSection: {
    marginBottom: 12,
  },
  optionHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 7,
    letterSpacing: 0.2,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 5,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  priorityChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 5,
  },
  priorityChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  addButton: {
    backgroundColor: '#4F46E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 14,
    marginTop: 4,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.32,
    shadowRadius: 10,
    elevation: 4,
    gap: 8,
  },
  addButtonIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
