import { z } from "zod";

export const portfolioSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  category: z.string().min(1),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  isFeatured: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const teamMemberSchema = z.object({
  name: z.string().min(2).max(100),
  role: z.string().min(2).max(200),
  bio: z.string().max(500).optional(),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

export const serviceSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().min(10).max(1000),
  icon: z.string().min(1),
  items: z.array(z.string()).min(1),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

export const testimonialSchema = z.object({
  clientName: z.string().min(2).max(200),
  company: z.string().min(2).max(200),
  quote: z.string().min(10).max(2000),
  authorName: z.string().min(2).max(100),
  isPublished: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type PortfolioFormData = z.infer<typeof portfolioSchema>;
export type TeamMemberFormData = z.infer<typeof teamMemberSchema>;
export type ServiceFormData = z.infer<typeof serviceSchema>;
export type TestimonialFormData = z.infer<typeof testimonialSchema>;
