import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { TeamPhoto } from "@/components/shared/team-photo";
import { aboutUs, type TeamMember } from "@/lib/config/about-us";
import { isTodo } from "@/lib/utils";

/**
 * "The family behind the farm" — the team rendered as a wall of staff ID
 * tickets: portrait (or monogram placeholder) in a hard frame with the role
 * tag pinned to the corner, then name, role, bio, credentials and any
 * external venture, each separated by dashed ticket rules.
 */
export function Team() {
  const { team, sections } = aboutUs;

  return (
    <section className="scroll-mt-20 bg-background py-16 sm:py-24">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow={sections.team.eyebrow}
            title={sections.team.heading}
            description={sections.team.sub}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {team.map((member, index) => (
            <Reveal key={member.id} delay={index * 0.05} className="h-full">
              <TeamTicket member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamTicket({ member }: { member: TeamMember }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-foreground/20 bg-card shadow-[4px_4px_0_0_rgba(31,70,48,0.1)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(31,70,48,0.14)] sm:flex-row">
      {/* portrait */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border-foreground/20 border-b sm:aspect-auto sm:w-44 sm:self-stretch sm:border-r sm:border-b-0">
        <TeamPhoto member={member} className="absolute inset-0" />
        <span className="absolute top-3 left-3 bg-accent px-2 py-1 font-medium font-mono text-[0.6rem] text-accent-foreground uppercase tracking-[0.15em]">
          {member.roleTag}
        </span>
      </div>

      {/* details */}
      <div className="flex flex-1 flex-col p-5">
        <div>
          <h3 className="font-bold font-display text-xl tracking-tight">
            {member.name}
          </h3>
          <p className="mt-0.5 font-medium font-mono text-[0.7rem] text-rust uppercase tracking-[0.15em]">
            {member.role}
          </p>
        </div>

        <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
          {member.bio}
        </p>

        <div className="mt-auto pt-4">
          {member.credentials.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {member.credentials.map((credential) => (
                <li
                  key={credential}
                  className="border border-foreground/20 bg-muted px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground uppercase tracking-wide"
                >
                  {credential}
                </li>
              ))}
            </ul>
          )}

          {member.externalVenture && (
            <div className="mt-3 border-foreground/15 border-t border-dashed pt-3">
              {isTodo(member.externalVenture.url) ? (
                <p className="flex items-center gap-2 font-mono text-[0.7rem] text-muted-foreground uppercase tracking-wide">
                  {member.externalVenture.name} ·{" "}
                  {member.externalVenture.description}
                </p>
              ) : (
                <a
                  href={member.externalVenture.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-primary uppercase tracking-wide underline-offset-4 hover:underline"
                >
                  {member.externalVenture.name} ·{" "}
                  {member.externalVenture.description}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
