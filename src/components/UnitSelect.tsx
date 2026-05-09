import { Unit } from '../types/converter';
import './UnitSelect.css';

interface UnitSelectProps {
  units: Unit[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

function UnitSelect({ units, value, onChange, label }: UnitSelectProps) {
  return (
    <div className="unit-select-wrapper">
      <label className="unit-select-label">{label}</label>
      <select
        className="unit-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {units.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.label} ({unit.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}

export default UnitSelect;
