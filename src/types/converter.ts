export type CategoryId = 'length' | 'weight' | 'temperature' | 'time';

export interface Unit {
  id: string;
  label: string;
  symbol: string;
}

export interface CategoryConfig {
  id: CategoryId;
  label: string;
  description: string;
  icon: string;
  units: Unit[];
  allowNegative: boolean;
  conversionType: 'base' | 'formula';
  baseUnit?: string;
  toBase?: Record<string, number>;
  note?: string;
  examples: ConversionExample[];
}

export interface ConversionExample {
  from: string;
  to: string;
  value: number;
}

export interface ConversionResult {
  value: number;
  formatted: string;
  error?: string;
}

export interface RecentConversion {
  id: string;
  category: CategoryId;
  inputValue: number;
  fromUnit: string;
  toUnit: string;
  result: number;
  timestamp: number;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
