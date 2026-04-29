import { Suspense, lazy } from "react";
import SectionFallback from "../components/common/SectionFallback";

const Header = lazy(() => import("../components/Header/Header"));
const Hero = lazy(() => import("../components/Hero/Hero"));
const FeaturedProperties = lazy(() => import("../components/FeaturedProperties/FeaturedProperties"));
const PropertyCategories = lazy(() => import("../components/PropertyCategories/PropertyCategories"));
const WhyChooseUs = lazy(() => import("../components/WhyChooseUs/WhyChooseUs"));
const LatestListings = lazy(() => import("../components/LatestListings/LatestListings"));
const Testimonials = lazy(() => import("../components/Testimonials/Testimonials"));
const CallToAction = lazy(() => import("../components/CallToAction/CallToAction"));
const Blog = lazy(() => import("../components/Blog/Blog"));
const Footer = lazy(() => import("../components/Footer/Footer"));

const HomePage = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Suspense fallback={<SectionFallback compact />}>
        <Header />
      </Suspense>
      <main>
        <Suspense fallback={<SectionFallback />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FeaturedProperties />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <PropertyCategories />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <WhyChooseUs />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <LatestListings />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CallToAction />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Blog />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback compact />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default HomePage;
