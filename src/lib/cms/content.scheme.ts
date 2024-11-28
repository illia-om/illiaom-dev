import { z } from "zod";

const technology = z.object({
  name: z.string(),
  isHighlighted: z.boolean().default(false),
});

const company = z.object({
  name: z.string(),
  website: z.string().url(),
  logo: z.string(),
  description: z.string(),
  location: z.string(),
});

const roleEntity = z.object({
  roleTitle: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  technologies: z.array(technology).min(1),
  achievements: z.array(z.string()).min(1),
});

const experienceEntity = z.object({
  company,
  roles: z.array(roleEntity).min(1),
});

const contactInformation = z.object({
  email: z.string(),
  phone: z.string().nullable(),
  address: z.string(),
});

const educationEntity = z.object({
  institutionName: z.string(),
  educationType: z.string(),
  fieldOfStudy: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const cvContent = z.object({
  name: z.string(),
  jobTitle: z.string(),
  contactInformation,
  summary: z.array(z.string()).min(1),
  technologies: z.array(technology).min(1),
  experience: z.array(experienceEntity).min(1),
  education: z.array(educationEntity).min(1),
});

export type Technology = z.infer<typeof technology>;
export type RoleEntity = z.infer<typeof roleEntity>;
export type ExperienceEntity = z.infer<typeof experienceEntity>;
export type CvContent = z.infer<typeof cvContent>;
