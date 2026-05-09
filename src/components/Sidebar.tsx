import { Link, useLocation } from 'react-router-dom';
import { Ruler, Weight, Thermometer, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { categoryOrder, converterConfig } from '../data/converterConfig';
import { CategoryId } from '../types/converter';
import './Sidebar.css';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Ruler: Ruler,
  Weight: Weight,
  Thermometer: Thermometer,
  Clock: Clock,
};

function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const currentCategory = location.pathname.split('/').pop() as CategoryId;

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && <span className="sidebar-title">Categories</span>}
        <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      <nav className="sidebar-nav">
        {categoryOrder.map((categoryId) => {
          const category = converterConfig[categoryId];
          const Icon = iconMap[category.icon] || Ruler;
          const isActive = currentCategory === categoryId;

          return (
            <Link
              key={categoryId}
              to={`/converter/${categoryId}`}
              className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
              title={isCollapsed ? category.label : undefined}
            >
              <Icon className="sidebar-link-icon" />
              {!isCollapsed && <span className="sidebar-link-label">{category.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
