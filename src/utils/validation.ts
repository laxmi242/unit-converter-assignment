import { CategoryConfig, ValidationResult } from '../types/converter';

export function validateInput(
  value: string,
  fromUnit: string,
  config: CategoryConfig
): ValidationResult {
  // Empty input is valid (just show nothing)
  if (value.trim() === '') {
    return { isValid: true };
  }

  // Check if it's a valid number
  const num = parseFloat(value);
  if (isNaN(num)) {
    return {
      isValid: false,
      error: 'Please enter a valid number.',
    };
  }

  // Check for negative values
  if (!config.allowNegative && num < 0) {
    return {
      isValid: false,
      error: `Negative values are not allowed for ${config.label}.`,
    };
  }

  // Special validation for Kelvin (absolute zero)
  if (fromUnit === 'kelvin' && num < 0) {
    return {
      isValid: false,
      error: 'Kelvin cannot be below absolute zero (0 K).',
    };
  }

  // Check for Celsius below absolute zero
  if (fromUnit === 'celsius' && num < -273.15) {
    return {
      isValid: false,
      error: 'Temperature cannot be below absolute zero (-273.15°C).',
    };
  }

  // Check for Fahrenheit below absolute zero
  if (fromUnit === 'fahrenheit' && num < -459.67) {
    return {
      isValid: false,
      error: 'Temperature cannot be below absolute zero (-459.67°F).',
    };
  }

  return { isValid: true };
}

export function parseInputValue(value: string): number | null {
  if (value.trim() === '') {
    return null;
  }
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}
