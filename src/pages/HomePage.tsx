import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';
import FeatureCard from '../components/FeatureCard';
import { categoryOrder, converterConfig } from '../data/converterConfig';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <main className="home-main">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Convert Units Instantly</h1>
            <p className="hero-subtitle">
              Choose a category and start converting quickly and accurately.
            </p>
          </div>
        </section>

        <section className="categories-section">
          <div className="section-container">
            <h2 className="section-title">Categories</h2>
            <div className="categories-grid">
              {categoryOrder.map((categoryId) => (
                <CategoryCard
                  key={categoryId}
                  category={converterConfig[categoryId]}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="section-container">
            <h2 className="section-title">Why UnitConvert?</h2>
            <div className="features-grid">
              <FeatureCard
                icon="zap"
                title="Real-time Conversion"
                description="See results instantly as you type. No waiting, no refreshing."
              />
              <FeatureCard
                icon="palette"
                title="Clean Interface"
                description="Beautiful, intuitive design that makes converting units a breeze."
              />
              <FeatureCard
                icon="target"
                title="Accurate Results"
                description="Precise calculations you can trust for all your conversion needs."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
