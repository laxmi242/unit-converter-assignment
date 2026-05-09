import { ArrowRight } from 'lucide-react';
import { CategoryConfig } from '../types/converter';
import { convert } from '../utils/conversion';
import './QuickExamples.css';

interface QuickExamplesProps {
  config: CategoryConfig;
}

function QuickExamples({ config }: QuickExamplesProps) {
  const getUnitSymbol = (unitId: string) => {
    return config.units.find((u) => u.id === unitId)?.symbol || unitId;
  };

  return (
    <div className="quick-examples">
      <h3 className="quick-examples-title">Quick Examples</h3>
      <div className="quick-examples-list">
        {config.examples.map((example, index) => {
          const result = convert(example.value, example.from, example.to, config);
          return (
            <div key={index} className="quick-example-item">
              <span className="quick-example-from">
                {example.value} {getUnitSymbol(example.from)}
              </span>
              <ArrowRight className="quick-example-arrow" />
              <span className="quick-example-to">
                {result.formatted} {getUnitSymbol(example.to)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuickExamples;
