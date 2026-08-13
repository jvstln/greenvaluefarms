import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { Products } from "@/components/sections/products";
import { WhyUs } from "@/components/sections/why-us";
import { HowToOrder } from "@/components/sections/how-to-order";
import { OurStory } from "@/components/sections/our-story";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="content">
        <Hero />
        <Products />
        <WhyUs />
        <HowToOrder />
        <OurStory />
        <Faq />
      </main>
      <Footer />
    </>
  );
}