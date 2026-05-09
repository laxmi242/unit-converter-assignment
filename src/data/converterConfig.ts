import { CategoryConfig, CategoryId } from '../types/converter';

export const converterConfig: Record<CategoryId, CategoryConfig> = {
  length: {
    id: 'length',
    label: 'Length',
    description: 'Convert between metric and imperial length units',
    icon: 'Ruler',
    allowNegative: false,
    conversionType: 'base',
    baseUnit: 'm',
    units: [
      { id: 'mm', label: 'Millimeter', symbol: 'mm' },
      { id: 'cm', label: 'Centimeter', symbol: 'cm' },
      { id: 'm', label: 'Meter', symbol: 'm' },
      { id: 'km', label: 'Kilometer', symbol: 'km' },
      { id: 'inch', label: 'Inch', symbol: 'in' },
      { id: 'foot', label: 'Foot', symbol: 'ft' },
      { id: 'yard', label: 'Yard', symbol: 'yd' },
      { id: 'mile', label: 'Mile', symbol: 'mi' },
    ],
    toBase: {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      inch: 0.0254,
      foot: 0.3048,
      yard: 0.9144,
      mile: 1609.344,
    },
    examples: [
      { from: 'km', to: 'mile', value: 1 },
      { from: 'm', to: 'foot', value: 10 },
      { from: 'inch', to: 'cm', value: 12 },
    ],
  },
  weight: {
    id: 'weight',
    label: 'Weight',
    description: 'Convert between metric and imperial weight units',
    icon: 'Weight',
    allowNegative: false,
    conversionType: 'base',
    baseUnit: 'g',
    units: [
      { id: 'mg', label: 'Milligram', symbol: 'mg' },
      { id: 'g', label: 'Gram', symbol: 'g' },
      { id: 'kg', label: 'Kilogram', symbol: 'kg' },
      { id: 'tonne', label: 'Tonne', symbol: 't' },
      { id: 'ounce', label: 'Ounce', symbol: 'oz' },
      { id: 'pound', label: 'Pound', symbol: 'lb' },
    ],
    toBase: {
      mg: 0.001,
      g: 1,
      kg: 1000,
      tonne: 1000000,
      ounce: 28.3495,
      pound: 453.592,
    },
    examples: [
      { from: 'kg', to: 'pound', value: 1 },
      { from: 'g', to: 'ounce', value: 100 },
      { from: 'tonne', to: 'kg', value: 1 },
    ],
  },
  temperature: {
    id: 'temperature',
    label: 'Temperature',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin',
    icon: 'Thermometer',
    allowNegative: true,
    conversionType: 'formula',
    units: [
      { id: 'celsius', label: 'Celsius', symbol: '°C' },
      { id: 'fahrenheit', label: 'Fahrenheit', symbol: '°F' },
      { id: 'kelvin', label: 'Kelvin', symbol: 'K' },
    ],
    examples: [
      { from: 'celsius', to: 'fahrenheit', value: 0 },
      { from: 'fahrenheit', to: 'celsius', value: 100 },
      { from: 'celsius', to: 'kelvin', value: 25 },
    ],
  },
  time: {
    id: 'time',
    label: 'Time',
    description: 'Convert between various time units',
    icon: 'Clock',
    allowNegative: false,
    conversionType: 'base',
    baseUnit: 'second',
    units: [
      { id: 'second', label: 'Second', symbol: 's' },
      { id: 'minute', label: 'Minute', symbol: 'min' },
      { id: 'hour', label: 'Hour', symbol: 'hr' },
      { id: 'day', label: 'Day', symbol: 'd' },
      { id: 'week', label: 'Week', symbol: 'wk' },
      { id: 'month', label: 'Month', symbol: 'mo' },
      { id: 'year', label: 'Year', symbol: 'yr' },
    ],
    toBase: {
      second: 1,
      minute: 60,
      hour: 3600,
      day: 86400,
      week: 604800,
      month: 2592000, // 30 days
      year: 31536000, // 365 days
    },
    note: 'Month and year conversions are approximate (1 month = 30 days, 1 year = 365 days).',
    examples: [
      { from: 'hour', to: 'minute', value: 2 },
      { from: 'day', to: 'hour', value: 1 },
      { from: 'week', to: 'day', value: 1 },
    ],
  },
};

export const categoryOrder: CategoryId[] = ['length', 'weight', 'temperature', 'time'];

export const getCategoryConfig = (id: CategoryId): CategoryConfig => converterConfig[id];

export const isValidCategory = (id: string): id is CategoryId => {
  return id in converterConfig;
};
