import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import ConverterCard from '../components/ConverterCard';
import QuickExamples from '../components/QuickExamples';
import RecentConversions from '../components/RecentConversions';
import { converterConfig, isValidCategory } from '../data/converterConfig';
import { useRecentConversions } from '../hooks/useRecentConversions';
import { CategoryId } from '../types/converter';
import './ConverterPage.css';

function ConverterPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { recentConversions, addConversion, clearRecent } = useRecentConversions();

  useEffect(() => {
    if (!category || !isValidCategory(category)) {
      navigate('/converter/length', { replace: true });
    }
  }, [category, navigate]);

  const validCategory = category && isValidCategory(category) ? category : 'length';
  const config = converterConfig[validCategory];

  const handleConversion = useCallback(
    (
      cat: CategoryId,
      inputValue: number,
      fromUnit: string,
      toUnit: string,
      result: number
    ) => {
      // Only add if units are different (same unit conversion is trivial)
      if (fromUnit !== toUnit) {
        addConversion(cat, inputValue, fromUnit, toUnit, result);
      }
    },
    [addConversion]
  );

  return (
    <div className="converter-page">
      <Header />
      <div className="converter-layout">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="converter-main">
          <div className="converter-content">
            <ConverterCard config={config} onConversion={handleConversion} />
            <div className="converter-sidebar-panels">
              <QuickExamples config={config} />
              <RecentConversions
                conversions={recentConversions}
                onClear={clearRecent}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ConverterPage;
