import { Trash2, History, ArrowRight } from 'lucide-react';
import { RecentConversion } from '../types/converter';
import { converterConfig } from '../data/converterConfig';
import './RecentConversions.css';

interface RecentConversionsProps {
  conversions: RecentConversion[];
  onClear: () => void;
}

function RecentConversions({ conversions, onClear }: RecentConversionsProps) {
  const getUnitSymbol = (categoryId: string, unitId: string) => {
    const category = converterConfig[categoryId as keyof typeof converterConfig];
    return category?.units.find((u) => u.id === unitId)?.symbol || unitId;
  };

  const formatResult = (value: number) => {
    if (Number.isInteger(value)) return value.toString();
    return value.toFixed(4).replace(/\.?0+$/, '');
  };

  if (conversions.length === 0) {
    return (
      <div className="recent-conversions">
        <div className="recent-conversions-header">
          <History className="recent-conversions-icon" />
          <h3 className="recent-conversions-title">Recent Conversions</h3>
        </div>
        <p className="recent-conversions-empty">No recent conversions yet.</p>
      </div>
    );
  }

  return (
    <div className="recent-conversions">
      <div className="recent-conversions-header">
        <History className="recent-conversions-icon" />
        <h3 className="recent-conversions-title">Recent Conversions</h3>
        <button className="recent-conversions-clear" onClick={onClear} title="Clear all">
          <Trash2 className="recent-conversions-clear-icon" />
        </button>
      </div>
      <div className="recent-conversions-list">
        {conversions.map((conversion) => (
          <div key={conversion.id} className="recent-conversion-item">
            <span className="recent-conversion-category">
              {converterConfig[conversion.category]?.label}
            </span>
            <div className="recent-conversion-values">
              <span className="recent-conversion-from">
                {conversion.inputValue} {getUnitSymbol(conversion.category, conversion.fromUnit)}
              </span>
              <ArrowRight className="recent-conversion-arrow" />
              <span className="recent-conversion-to">
                {formatResult(conversion.result)} {getUnitSymbol(conversion.category, conversion.toUnit)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentConversions;
