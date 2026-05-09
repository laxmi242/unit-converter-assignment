import { CategoryConfig, ConversionResult } from '../types/converter';

export function convert(
  value: number,
  fromUnit: string,
  toUnit: string,
  config: CategoryConfig
): ConversionResult {
  if (fromUnit === toUnit) {
    return {
      value,
      formatted: formatResult(value),
    };
  }

  if (config.conversionType === 'base' && config.toBase) {
    return convertWithBase(value, fromUnit, toUnit, config.toBase);
  }

  if (config.conversionType === 'formula') {
    return convertTemperature(value, fromUnit, toUnit);
  }

  return {
    value: 0,
    formatted: '0',
    error: 'Unknown conversion type',
  };
}

function convertWithBase(
  value: number,
  fromUnit: string,
  toUnit: string,
  toBase: Record<string, number>
): ConversionResult {
  const fromFactor = toBase[fromUnit];
  const toFactor = toBase[toUnit];

  if (!fromFactor || !toFactor) {
    return {
      value: 0,
      formatted: '0',
      error: 'Invalid unit',
    };
  }

  const baseValue = value * fromFactor;
  const result = baseValue / toFactor;

  return {
    value: result,
    formatted: formatResult(result),
  };
}

function convertTemperature(
  value: number,
  fromUnit: string,
  toUnit: string
): ConversionResult {
  let celsius: number;

  // Convert to Celsius first
  switch (fromUnit) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * (5 / 9);
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    default:
      return { value: 0, formatted: '0', error: 'Invalid unit' };
  }

  // Convert from Celsius to target
  let result: number;
  switch (toUnit) {
    case 'celsius':
      result = celsius;
      break;
    case 'fahrenheit':
      result = celsius * (9 / 5) + 32;
      break;
    case 'kelvin':
      result = celsius + 273.15;
      break;
    default:
      return { value: 0, formatted: '0', error: 'Invalid unit' };
  }

  return {
    value: result,
    formatted: formatResult(result),
  };
}

export function formatResult(value: number): string {
  if (Number.isInteger(value)) {
    return value.toString();
  }

  // Handle very small numbers
  if (Math.abs(value) < 0.0001 && value !== 0) {
    return value.toExponential(4);
  }

  // Round to reasonable precision
  const rounded = Math.round(value * 1000000) / 1000000;
  
  // Remove trailing zeros
  return rounded.toString();
}
