import Hero from "@/components/home/Hero";
import TrustMarquee from "@/components/home/TrustMarquee";
import ServicesSection from "@/components/home/ServicesSection";
import WhySection from "@/components/home/WhySection";
import CampaignsPreview from "@/components/home/CampaignsPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

// Force Next.js to dynamically fetch data and bypass cache if needed, or revalidate
export const revalidate = 60; // Revalidate homepage every 60 seconds

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function fetchApi(path: string) {
  try {
    const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const [settings, services, featuredCampaignsRaw, testimonials] = await Promise.all([
    fetchApi("/api/settings"),
    fetchApi("/api/public/services"),
    fetchApi("/api/campaigns"),
    fetchApi("/api/public/testimonials"),
  ]);

  const defaultHeadline = "Where Brands Meet Real Influence.";
  const defaultSubheading = "We pair data-driven strategy with authentic storytelling to take your brand from just online to absolutely unforgettable.";
  const defaultStats = {
    campaigns: 150,
    brands: 50,
    creators: 500,
    reach: "50000000",
  };
  const defaultLogos = [
    { name: "Amazon", logoUrl: "/brands/amazon.svg" },
    { name: "Paytm", logoUrl: "/brands/paytm.svg" },
    { name: "Sugar", logoUrl: "/brands/sugar.svg" },
    { name: "Myntra", logoUrl: "/brands/myntra.svg" },
    { name: "OnePlus", logoUrl: "/brands/oneplus.svg" },
  ];

  const heroHeadline = settings?.heroHeadline || defaultHeadline;
  const heroSubheading = settings?.heroSubheading || defaultSubheading;
  const stats = settings
    ? {
        campaigns: settings.statCampaigns,
        brands: settings.statBrands,
        creators: settings.statCreators,
        reach: settings.statReach,
      }
    : defaultStats;

  const trustedLogos = settings?.trustedBrandLogos ?? defaultLogos;

  // Only show featured campaigns (take 4)
  const featuredCampaigns = (featuredCampaignsRaw ?? [])
    .filter((c: any) => c.featured)
    .slice(0, 4);


  return (
    <div className="space-y-4">
      {/* 1. Hero Section */}
      <Hero
        headline={heroHeadline}
        subheading={heroSubheading}
        stats={stats}
      />

      {/* 2. Trust Marquee */}
      <TrustMarquee logos={trustedLogos} />

      {/* 3. Services Grid */}
      <ServicesSection services={services} />

      {/* 4. Why Socialties Section */}
      <WhySection />

      {/* 5. Featured Campaigns */}
      <CampaignsPreview campaigns={featuredCampaigns} />

      {/* 6. Testimonials Carousel */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 7. FAQ Accordion */}
      <FAQSection />

      {/* 8. Split CTA Banner & Final Contact Band */}
      <CTASection />
    </div>
  );
}
