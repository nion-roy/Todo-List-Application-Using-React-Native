import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Search, X } from 'lucide-react-native';

export default function SearchBar({ searchQuery, onSearchChange }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.searchWrapper, isFocused && styles.searchWrapperFocused]}>
        <Search
          size={16}
          color={isFocused ? '#4F46E5' : '#64748B'}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="কাজের নাম বা বিষয় দিয়ে খুঁজুন..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={onSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => onSearchChange('')}
            style={styles.clearButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <X size={13} color="#64748B" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 6,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 9,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchWrapperFocused: {
    borderColor: '#4F46E5',
    shadowColor: '#4F46E5',
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    padding: 0,
    fontWeight: '600',
    outlineStyle: 'none',
    outlineWidth: 0,
  },
  clearButton: {
    padding: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
