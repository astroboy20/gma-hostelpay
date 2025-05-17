import { Header } from "@/components/header/header";
import { HeroSection } from "./home-container/hero-section";
import { Features } from "./home-container/features";
import { HowItWorks } from "./home-container/how-it-works";
import { Testimonials } from "./home-container/testimonials";
import { ContactUs } from "./home-container/contact-us";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Features />
        <HowItWorks />
        <Testimonials />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}
