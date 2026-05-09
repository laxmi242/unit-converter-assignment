import { useState, useEffect, useCallback } from 'react';
import { ArrowUpDown, Copy, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { CategoryConfig, CategoryId } from '../types/converter';
import { convert } from '../utils/conversion';
import { validateInput, parseInputValue } from '../utils/validation';
import UnitSelect from './UnitSelect';
import './ConverterCard.css';

interface ConverterCardProps {
  config: CategoryConfig;
  onConversion: (
    category: CategoryId,
    inputValue: number,
    fromUnit: string,
    toUnit: string,
    result: number
  ) => void;
}

function ConverterCard({ config, onConversion }: ConverterCardProps) {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState(config.units[0].id);
  const [toUnit, setToUnit] = useState(config.units[1]?.id || config.units[0].id);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleValueChange = (e) => {
  const value = e.target.value;

  if (value.length > 30) return;

  setInputValue(value.trim());
};

  const performConversion = useCallback(() => {
    const validation = validateInput(inputValue, fromUnit, config);

    if (!validation.isValid) {
      setError(validation.error || '');
      setResult('');
      return;
    }

    setError('');

    const numValue = parseInputValue(inputValue);
    if (numValue === null) {
      setResult('');
      return;
    }

    const conversionResult = convert(numValue, fromUnit, toUnit, config);

    if (conversionResult.error) {
      setError(conversionResult.error);
      setResult('');
      return;
    }

    setResult(conversionResult.formatted);
    onConversion(config.id, numValue, fromUnit, toUnit, conversionResult.value);
  }, [inputValue, fromUnit, toUnit, config, onConversion]);

  useEffect(() => {
    performConversion();
  }, [performConversion]);

  useEffect(() => {
    setFromUnit(config.units[0].id);
    setToUnit(config.units[1]?.id || config.units[0].id);
    setInputValue('');
    setResult('');
    setError('');
  }, [config]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleReset = () => {
    setInputValue('');
    setResult('');
    setError('');
    setFromUnit(config.units[0].id);
    setToUnit(config.units[1]?.id || config.units[0].id);
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  const fromUnitData = config.units.find((u) => u.id === fromUnit);
  const toUnitData = config.units.find((u) => u.id === toUnit);

  return (
    <div className="converter-card">
      <div className="converter-card-header">
        <h2 className="converter-card-title">{config.label} Converter</h2>
        <button className="converter-reset-btn" onClick={handleReset} title="Reset">
          <RotateCcw className="converter-reset-icon" />
        </button>
      </div>

      {config.note && (
        <div className="converter-note">
          <AlertCircle className="converter-note-icon" />
          <span>{config.note}</span>
        </div>
      )}

      <div className="converter-input-group">
        <label className="converter-input-label">Value</label>
        <input
          type="text"
          className={`converter-input ${error ? 'converter-input-error' : ''}`}
          value={inputValue}
          onChange={(e)=>handleValueChange(e)}
          placeholder="Enter a value"
          inputMode="decimal"
        />
      </div>

      <div className="converter-units-row">
        <UnitSelect
          units={config.units}
          value={fromUnit}
          onChange={setFromUnit}
          label="From"
        />

        <button className="converter-swap-btn" onClick={handleSwap} title="Swap units">
          <ArrowUpDown className="converter-swap-icon" />
        </button>

        <UnitSelect
          units={config.units}
          value={toUnit}
          onChange={setToUnit}
          label="To"
        />
      </div>

      {error && <div className="converter-error">{error}</div>}

      <div className="converter-result-section">
        <span className="converter-result-label">Result</span>
        <div className="converter-result-box">
          <span className="converter-result-value">
            {result || '—'}
          </span>
          {result && (
            <span className="converter-result-unit">{toUnitData?.symbol}</span>
          )}
          {result && (
            <button className="converter-copy-btn" onClick={handleCopy} title="Copy result">
              {copied ? <Check className="converter-copy-icon copied" /> : <Copy className="converter-copy-icon" />}
            </button>
          )}
        </div>
        {inputValue && result && (
          <p className="converter-result-text">
            {inputValue} {fromUnitData?.symbol} = {result} {toUnitData?.symbol}
          </p>
        )}
      </div>
    </div>
  );
}

export default ConverterCard;
