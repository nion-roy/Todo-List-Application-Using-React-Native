import React, { useMemo, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Plus, Sparkles } from 'lucide-react-native';

import Header from './src/components/Header';
import StatsCard from './src/components/StatsCard';
import TaskModal from './src/components/TaskModal';
import SearchBar from './src/components/SearchBar';
import FilterBar from './src/components/FilterBar';
import TaskItem from './src/components/TaskItem';
import TaskSkeleton from './src/components/TaskSkeleton';
import Pagination from './src/components/Pagination';
import EmptyState from './src/components/EmptyState';

// প্রাথমিক কিছু ডেমো কাজ (বাংলায়)
const INITIAL_TASKS = [
  {
    id: '1',
    title: 'রিয়্যাক্ট নেটিভ ল্যাব প্রজেক্ট সম্পন্ন করা',
    completed: true,
    priority: 'জরুরি',
    category: 'অফিস',
    createdAt: '১০:৩০ পূর্বাহ্ন',
  },
  {
    id: '2',
    title: 'ইউজার ইন্টারফেসের আধুনিক ডিজাইন তৈরি করা',
    completed: false,
    priority: 'জরুরি',
    category: 'ব্যক্তিগত',
    createdAt: '১১:১৫ পূর্বাহ্ন',
  },
  {
    id: '3',
    title: 'এক্সপো দিয়ে অ্যান্ড্রয়েড ফোনে টেস্ট করা',
    completed: false,
    priority: 'মাঝারি',
    category: 'পড়াশোনা',
    createdAt: '১২:০০ অপরাহ্ন',
  },
  {
    id: '4',
    title: 'লুসিড ভেক্টর আইকন সেটআপ ও অপ্টিমাইজেশন',
    completed: true,
    priority: 'সাধারণ',
    category: 'অফিস',
    createdAt: '১২:৩০ অপরাহ্ন',
  },
  {
    id: '5',
    title: 'সার্চ ও পেজিনেশন ফিচার যুক্ত করা',
    completed: false,
    priority: 'জরুরি',
    category: 'পড়াশোনা',
    createdAt: '০১:১৫ অপরাহ্ন',
  },
  {
    id: '6',
    title: 'ল্যাব ফাইনাল প্রেজেন্টেশন স্লাইড তৈরি',
    completed: false,
    priority: 'মাঝারি',
    category: 'ব্যক্তিগত',
    createdAt: '০২:০০ অপরাহ্ন',
  },
];

const ITEMS_PER_PAGE = 4;

export default function App() {
  // ১. useState হুক দিয়ে স্টেট পরিচালনা
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchTimeoutRef = useRef(null);

  // সময় বাংলায় ফরম্যাট করা
  const getBengaliTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? 'অপরাহ্ন' : 'পূর্বাহ্ন';
    hours = hours % 12 || 12;

    const toBengaliNumber = (num) => {
      const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return num.toString().padStart(2, '0').replace(/\d/g, (d) => bengaliDigits[d]);
    };

    return `${toBengaliNumber(hours)}:${toBengaliNumber(minutes)} ${period}`;
  };

  // ২. নতুন কাজ ডায়নামিকালি যোগ করা (স্কেলেটন লোডার সহ)
  const handleAddTask = ({ title, category, priority }) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      category,
      priority,
      completed: false,
      createdAt: getBengaliTime(),
    };

    setIsLoading(true);
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setCurrentPage(1); // নতুন কাজ প্রথম পাতায় দেখতে পাতা ১-এ চলে যাবে

    setTimeout(() => {
      setIsLoading(false);
    }, 320);
  };

  // ৩. কাজের সমাপ্তি টগল করা (সম্পন্ন / অসম্পন্ন)
  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // ৪. তালিকা থেকে কাজ মুছে ফেলা (স্কেলেটন লোডার সহ)
  const handleDeleteTask = (taskId) => {
    setIsLoading(true);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setTimeout(() => {
      setIsLoading(false);
    }, 220);
  };

  // ৫. সব সম্পন্ন কাজ একবারে মুছে ফেলা
  const handleClearCompleted = () => {
    if (Platform.OS === 'web') {
      const confirmed = typeof window !== 'undefined' && window.confirm
        ? window.confirm('আপনি কি নিশ্চিতভাবে সব সম্পন্ন কাজ মুছে ফেলতে চান?')
        : true;
      if (confirmed) {
        setTasks((prev) => prev.filter((t) => !t.completed));
        setCurrentPage(1);
      }
    } else {
      Alert.alert(
        'সম্পন্ন কাজ মুছুন',
        'আপনি কি নিশ্চিতভাবে সব সম্পন্ন কাজ মুছে ফেলতে চান?',
        [
          { text: 'বাতিল', style: 'cancel' },
          {
            text: 'সব মুছুন',
            style: 'destructive',
            onPress: () => {
              setTasks((prev) => prev.filter((t) => !t.completed));
              setCurrentPage(1);
            },
          },
        ]
      );
    }
  };

  // ফিল্টার পরিবর্তন (স্কেলেটন লোডার সক্রিয় হবে)
  const handleFilterChange = (filter) => {
    setIsLoading(true);
    setActiveFilter(filter);
    setCurrentPage(1);
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  // সার্চ পরিবর্তন (স্কেলেটন লোডার সক্রিয় হবে)
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setIsLoading(true);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 260);
  };

  // পাতা পরিবর্তন (স্কেলেটন লোডার সক্রিয় হবে)
  const handlePageChange = (newPage) => {
    setIsLoading(true);
    setCurrentPage(newPage);
    setTimeout(() => {
      setIsLoading(false);
    }, 260);
  };

  // ফিল্টার ও সার্চ অনুযায়ী কাজের তালিকা তৈরি করা
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // ফিল্টার অনুযায়ী নির্বাচন
    if (activeFilter === 'active') {
      result = result.filter((t) => !t.completed);
    } else if (activeFilter === 'completed') {
      result = result.filter((t) => t.completed);
    }

    // সার্চ কিওয়ার্ড দিয়ে ফিল্টার
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          (t.category && t.category.toLowerCase().includes(query)) ||
          (t.priority && t.priority.toLowerCase().includes(query))
      );
    }

    return result;
  }, [tasks, activeFilter, searchQuery]);

  // পেজিনেশন হিসাব
  const totalFilteredItems = filteredTasks.length;
  const totalPages = Math.ceil(totalFilteredItems / ITEMS_PER_PAGE) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalFilteredItems);
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  // অবশিষ্ট ও মোট কাজের গণনা
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const remainingCount = totalCount - completedCount;

  const counts = {
    all: totalCount,
    active: remainingCount,
    completed: completedCount,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* FlatList ব্যবহার করে কাজের তালিকা রেন্ডার করা */}
        <FlatList
          data={isLoading ? [] : paginatedTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              item={item}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
            />
          )}
          ListHeaderComponent={
            <View>
              {/* হেডার সেকশন */}
              <Header
                remainingCount={remainingCount}
                totalCount={totalCount}
              />

              {/* অগ্রগতি ও সারাংশ কার্ড */}
              <StatsCard
                totalCount={totalCount}
                completedCount={completedCount}
                remainingCount={remainingCount}
              />

              {/* সার্চ বার */}
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />

              {/* ফিল্টার ট্যাব বার */}
              <FilterBar
                activeFilter={activeFilter}
                onSelectFilter={handleFilterChange}
                counts={counts}
                onClearCompleted={handleClearCompleted}
              />
            </View>
          }
          ListEmptyComponent={
            isLoading ? (
              <TaskSkeleton count={ITEMS_PER_PAGE} />
            ) : (
              <EmptyState
                activeFilter={activeFilter}
                isSearching={searchQuery.trim().length > 0}
              />
            )
          }
          ListFooterComponent={
            <View>
              {/* পেজিনেশন কন্ট্রোলস */}
              {!isLoading && (
                <Pagination
                  currentPage={validCurrentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={totalFilteredItems}
                  startIndex={startIndex}
                  endIndex={endIndex}
                />
              )}

              {/* ফুটার অনুপ্রেরণামূলক বার্তা */}
              {!isLoading && totalFilteredItems > 0 && (
                <View style={styles.footerContainer}>
                  <Sparkles size={13} color="#475569" />
                  <Text style={styles.footerText}>
                    "প্রতিদিনের ছোট ছোট পদক্ষেপই বড় সাফল্যের চাবিকাঠি"
                  </Text>
                </View>
              )}
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
        />

        {/* Floating Action Button (FAB) */}
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => setIsModalOpen(true)}
          activeOpacity={0.85}
        >
          <Plus size={24} color="#FFFFFF" strokeWidth={3} />
        </TouchableOpacity>

        {/* নতুন কাজ তৈরির মোডাল ডায়ালগ */}
        <TaskModal
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddTask={handleAddTask}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight || 28 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    maxWidth: 620,
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  listContent: {
    paddingBottom: 70,
  },
  fabButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    zIndex: 99,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
