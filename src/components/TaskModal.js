import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

export default function TaskModal({ visible, onClose, onAddTask }) {
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
    onClose();
  };

  const handleClose = () => {
    setText('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalCard}>
              {/* Header */}
              <View style={styles.modalHeader}>
                <View style={styles.titleGroup}>
                  <View style={styles.iconCircle}>
                    <Zap size={16} color="#4F46E5" />
                  </View>
                  <Text style={styles.modalTitle}>নতুন কাজ তৈরি করুন</Text>
                </View>

                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.closeButton}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <X size={16} color="#64748B" />
                </TouchableOpacity>
              </View>

              {/* Input Box */}
              <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
                <PenLine size={16} color="#94A3B8" style={styles.inputPrefixIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="কাজের শিরোনাম লিখুন (যেমন: ল্যাব রিপোর্ট জমা)..."
                  placeholderTextColor="#94A3B8"
                  value={text}
                  onChangeText={setText}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  returnKeyType="done"
                  onSubmitEditing={handleAdd}
                  autoFocus={true}
                />
                {text.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setText('')}
                    style={styles.clearInputButton}
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                  >
                    <X size={12} color="#64748B" />
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

              {/* Footer Action Buttons */}
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleClose}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelButtonText}>বাতিল</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleAdd}
                  activeOpacity={0.85}
                >
                  <Plus size={16} color="#FFFFFF" strokeWidth={3} />
                  <Text style={styles.submitButtonText}>কাজ যোগ করুন</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: 480,
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 16,
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
    padding: 0,
    fontWeight: '600',
    outlineStyle: 'none',
    outlineWidth: 0,
  },
  clearInputButton: {
    padding: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    marginLeft: 6,
  },
  optionSection: {
    marginBottom: 14,
  },
  optionHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
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
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
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
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  priorityChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  modalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  cancelButton: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 12,
    gap: 6,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 3,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
