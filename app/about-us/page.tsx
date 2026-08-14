import type { Metadata } from "next";
import { CompanyRecord } from "@/components/sections/about/company-record";
import { Milestones } from "@/components/sections/about/milestones";
import { StoryNarrative } from "@/components/sections/about/story-narrative";
import { Team } from "@/components/sections/about/team";
import { Values } from "@/components/sections/about/values";
import { Footer } from "@/components/sections/footer";
import { OurStory } from "@/components/sections/our-story";
import { SiteHeader } from "@/components/sections/site-header";
import { aboutUs } from "@/lib/config/about-us";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `${aboutUs.sectionLabel} — ${siteConfig.business.name}`,
  description: aboutUs.summary,
};

export default function AboutUsPage() {
  return (
    <>
      <SiteHeader />
      <main id="content">
        <CompanyRecord />
        <OurStory showStoryLink={false} />
        <StoryNarrative />
        <Values />
        <Milestones />
        <Team />
      </main>
      <Footer />
    </>
  );
}
