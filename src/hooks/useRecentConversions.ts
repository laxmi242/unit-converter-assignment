import { useState, useEffect } from 'react';
import { RecentConversion, CategoryId } from '../types/converter';

const STORAGE_KEY = 'recentConversions';
const MAX_RECENT = 5;

export function useRecentConversions() {
  const [recentConversions, setRecentConversions] = useState<RecentConversion[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentConversions));
  }, [recentConversions]);

  const addConversion = (
    category: CategoryId,
    inputValue: number,
    fromUnit: string,
    toUnit: string,
    result: number
  ) => {
    const newConversion: RecentConversion = {
      id: Date.now().toString(),
      category,
      inputValue,
      fromUnit,
      toUnit,
      result,
      timestamp: Date.now(),
    };

    setRecentConversions((prev) => {
      const updated = [newConversion, ...prev].slice(0, MAX_RECENT);
      return updated;
    });
  };

  const clearRecent = () => {
    setRecentConversions([]);
  };

  return {
    recentConversions,
    addConversion,
    clearRecent,
  };
}
