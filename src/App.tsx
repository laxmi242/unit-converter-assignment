import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConverterPage from './pages/ConverterPage';
import { isValidCategory } from './data/converterConfig';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/converter/:category"
        element={<ConverterPageWrapper />}
      />
      <Route path="/converter" element={<Navigate to="/converter/length" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function ConverterPageWrapper() {
  return <ConverterPage />;
}

export function validateCategoryParam(category: string | undefined): string {
  if (!category || !isValidCategory(category)) {
    return 'length';
  }
  return category;
}

export default App;
