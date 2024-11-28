import { Badge } from "@/components/ui/badge";
import { loadStaticContent } from "@/lib/cms/content.data";
import {
  type ExperienceEntity,
  type RoleEntity,
  type Technology,
} from "@/lib/cms/content.scheme";
import { dateToMYString, durationString, parseDMYIntoDate } from "@/lib/dates";
import { ReactElement } from "react";

export default function CvPage() {
  const content = loadStaticContent();

  return (
    <>
      <header>
        <hgroup>
          <h1 className="text-2xl font-bold">{content.name}</h1>
          <p className="text-base">{content.jobTitle}</p>
        </hgroup>
      </header>
      <main>
        <CvSection heading="Profile">
          <div className="flex flex-col gap-2 mt-2">
            {content.summary.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </CvSection>
        <CvSection heading="Technologies">
          <TechnologiesList content={content.technologies} />
        </CvSection>
        <CvSection heading="Experience">
          <div>
            {content.experience.map((experienceEntity, i) => (
              <ExperienceEntity key={i} content={experienceEntity} />
            ))}
          </div>
        </CvSection>
      </main>
    </>
  );
}

function CvSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactElement;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold">{heading}</h2>
      {children}
    </section>
  );
}

function TechnologiesList({ content }: { content: Array<Technology> }) {
  return (
    <div className="flex gap-2 flex-wrap mt-2">
      {content.map((technology, i) => (
        <Badge
          key={i}
          variant={technology.isHighlighted ? "default" : "secondary"}
        >
          {technology.name}
        </Badge>
      ))}
    </div>
  );
}

function ExperienceEntity({ content }: { content: ExperienceEntity }) {
  return (
    <div className="flex flex-col gap-3 mt-6">
      <hgroup className="flex flex-col gap-0.5">
        <h3 className="font-bold underline">
          <a href={content.company.website} target="_blank">
            {content.company.name}
          </a>
        </h3>
        <p className="text-sm text-muted-foreground">
          {content.company.description}
        </p>
        <p className="text-sm text-muted-foreground">
          {content.company.location}
        </p>
      </hgroup>
      {content.roles.map((role, i) => (
        <RoleEntity key={`${content.company.name}-${i}`} content={role} />
      ))}
    </div>
  );
}

function RoleEntity({ content }: { content: RoleEntity }) {
  return (
    <div>
      <hgroup className="flex justify-between">
        <h4 className="font-bold">{content.roleTitle}</h4>
        <DateRange
          startDate={content.startDate}
          endDate={content.endDate}
          className="text-sm text-muted-foreground"
        />
      </hgroup>
      <TechnologiesList content={content.technologies} />
      <ul className="flex flex-col list-disc list-inside gap-1 mt-1">
        {content.achievements.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

type DateRangeProps = React.HTMLAttributes<HTMLParagraphElement> &
  Pick<RoleEntity, "startDate" | "endDate">;

function DateRange({ startDate, endDate, ...props }: DateRangeProps) {
  const startDateString = dateToMYString(parseDMYIntoDate(startDate));
  const endDateString = endDate
    ? dateToMYString(parseDMYIntoDate(endDate))
    : "Present";

  const rangeDurationString = durationString(
    parseDMYIntoDate(startDate),
    endDate ? parseDMYIntoDate(endDate) : new Date()
  );

  return (
    <p
      {...props}
    >{`${startDateString} - ${endDateString} (${rangeDurationString})`}</p>
  );
}
