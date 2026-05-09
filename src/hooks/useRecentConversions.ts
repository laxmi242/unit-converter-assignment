import { useState, useEffect, useRef, useCallback } from 'react';
import { RecentConversion, CategoryId } from '../types/converter';

const STORAGE_KEY = 'recentConversions';
const MAX_RECENT = 5;
const DEBOUNCE_DELAY = 700;

export function useRecentConversions() {
  const timeoutRef = useRef<number | null>(null);

  const [recentConversions, setRecentConversions] = useState<RecentConversion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentConversions));
  }, [recentConversions]);

  const addConversionImmediately = useCallback(
    (
      category: CategoryId,
      inputValue: number,
      fromUnit: string,
      toUnit: string,
      result: number
    ) => {
      if (!Number.isFinite(inputValue) || !Number.isFinite(result)) return;

      const newConversion: RecentConversion = {
        id: `${Date.now()}-${Math.random()}`,
        category,
        inputValue,
        fromUnit,
        toUnit,
        result,
        timestamp: Date.now(),
      };

      setRecentConversions((prev) => {
        const filteredPrev = prev.filter(
          (item) =>
            !(
              item.category === category &&
              item.inputValue === inputValue &&
              item.fromUnit === fromUnit &&
              item.toUnit === toUnit &&
              item.result === result
            )
        );

        return [newConversion, ...filteredPrev].slice(0, MAX_RECENT);
      });
    },
    []
  );

  const addConversion = useCallback(
    (
      category: CategoryId,
      inputValue: number,
      fromUnit: string,
      toUnit: string,
      result: number
    ) => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        addConversionImmediately(category, inputValue, fromUnit, toUnit, result);
      }, DEBOUNCE_DELAY);
    },
    [addConversionImmediately]
  );

  const clearRecent = () => {
    setRecentConversions([]);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    recentConversions,
    addConversion,
    clearRecent,
  };
}
