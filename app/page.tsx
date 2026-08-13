import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowToOrder } from "@/components/sections/how-to-order";
import { OurStory } from "@/components/sections/our-story";
import { Products } from "@/components/sections/products";
import { SiteHeader } from "@/components/sections/site-header";
import { WhyUs } from "@/components/sections/why-us";

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
