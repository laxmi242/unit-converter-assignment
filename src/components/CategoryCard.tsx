import { Link } from 'react-router-dom';
import { Ruler, Weight, Thermometer, Clock, ArrowRight } from 'lucide-react';
import { CategoryConfig } from '../types/converter';
import './CategoryCard.css';

interface CategoryCardProps {
  category: CategoryConfig;
}

const iconMap: Record<string, React.ElementType> = {
  Ruler: Ruler,
  Weight: Weight,
  Thermometer: Thermometer,
  Clock: Clock,
};

function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Ruler;

  return (
    <Link to={`/converter/${category.id}`} className="category-card">
      <div className="category-card-icon-wrapper">
        <Icon className="category-card-icon" />
      </div>
      <div className="category-card-content">
        <h3 className="category-card-title">{category.label}</h3>
        <p className="category-card-description">{category.description}</p>
      </div>
      <ArrowRight className="category-card-arrow" />
    </Link>
  );
}

export default CategoryCard;
