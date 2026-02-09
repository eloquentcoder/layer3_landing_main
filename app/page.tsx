import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { FeaturesSection } from "@/components/features-section";
import { PaymentsSection } from "@/components/developer-section";
import { PipelineSection } from "@/components/pipeline-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturesSection />
      <PaymentsSection />
      <PipelineSection />
      <CTASection />
      <Footer />
    </>
  );
}