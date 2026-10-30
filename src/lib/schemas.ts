import { z } from "zod";

const text = (max = 200) => z.string().trim().max(max);
const base = {
  page: text(200).optional(),
  turnstileToken: z.string().optional(),
  website: z.string().max(0).optional(), // honeypot
};
const email = z.string().trim().email("Enter a valid email address");

export const journeySchema = z.object({
  kind: z.literal("journey"),
  name: text().optional(),
  email: email.optional().or(z.literal("")),
  phone: text(40).min(7, "Phone number is required"),
  projectType: text().optional(),
  genre: text().optional(),
  budget: text().optional(),
  ...base,
});

export const contactSchema = z.object({
  kind: z.literal("contact"),
  name: text().min(2, "Full name is required"),
  email,
  phone: text(40).min(7, "Phone number is required"),
  message: text(3000).min(5, "Please tell us a little about your project"),
  ...base,
});

export const newsletterSchema = z.object({
  kind: z.literal("newsletter"),
  email,
  ...base,
});

export const formSchema = z.discriminatedUnion("kind", [journeySchema, contactSchema, newsletterSchema]);
export type FormPayload = z.infer<typeof formSchema>;
