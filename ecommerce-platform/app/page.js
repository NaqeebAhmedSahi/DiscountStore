// app/page.jsx
import Header from "../app/components/common/Header/Header";
import HeroSlider from "../app/components/common/Slider/HeroSlider";
import FeaturedCategories from "../app/components/common/Categories/FeaturedCategories";
import NewArrivals from "../app/components/common/NewArrivals/NewArrivals";
import TrendingDeals from "../app/components/common/TrendingDeals/TrendingDeals";
import BrandShowcase from "../app/components/common/BrandShowcase/BrandShowcase";
import Newsletter from "../app/components/common/Newsletter/Newsletter";
import Testimonials from "../app/components/common/Testimonials/Testimonials";
import Footer from "../app/components/common/Footer/Footer";







export default function Home() {
  return (
    <div>
      <Header />
      <HeroSlider />
      <FeaturedCategories />
      <NewArrivals />
      <TrendingDeals />
      <BrandShowcase />
      <Newsletter />
      <Testimonials />
      <Footer />







    </div>
  );
}
