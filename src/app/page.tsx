import { Header } from "@/components/header/header";
import { HeroSection } from "./home-container/hero-section";
import { Features } from "./home-container/features";
import { HowItWorks } from "./home-container/how-it-works";
import { Testimonials } from "./home-container/testimonials";
import { ContactUs } from "./home-container/contact-us";
import { Footer } from "@/components/footer";
import { CampusMap } from "@/components/campus-map";

export default function LandingPage() {
  const mapLocations = [
    {
      id: "1",
      name: "Alpha Hostel",
      type: "hostel" as const,
      position: { x: 20, y: 30 },
      description: "Affordable student housing with modern facilities.",
    },
    {
      id: "2",
      name: "Admin Block",
      type: "facility" as const,
      position: { x: 60, y: 50 },
      description: "Administrative offices and records center.",
    },
    {
      id: "3",
      name: "Library Complex",
      type: "landmark" as const,
      position: { x: 80, y: 20 },
      description: "A quiet place for study and research.",
    },
  ]



  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CampusMap locations={mapLocations} />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}
