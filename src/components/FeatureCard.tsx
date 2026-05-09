import { Zap, Palette, Target } from 'lucide-react';
import './FeatureCard.css';

interface FeatureCardProps {
  icon: 'zap' | 'palette' | 'target';
  title: string;
  description: string;
}

const iconMap = {
  zap: Zap,
  palette: Palette,
  target: Target,
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const Icon = iconMap[icon];

  return (
    <div className="feature-card">
      <div className="feature-card-icon-wrapper">
        <Icon className="feature-card-icon" />
      </div>
      <h4 className="feature-card-title">{title}</h4>
      <p className="feature-card-description">{description}</p>
    </div>
  );
}

export default FeatureCard;
