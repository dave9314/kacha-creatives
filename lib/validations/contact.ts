import { z } from "zod";

const ALLOWED_DOC_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "image/jpg",
];

const ALLOWED_DOC_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
  ".xls",
  ".xlsx",
  ".jpg",
  ".jpeg",
  ".png",
];

const MAX_DOC_SIZE = 10 * 1024 * 1024; // 10MB

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  description: z
    .string()
    .min(20, "Please provide more detail about your project (min 20 characters)")
    .max(5000),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export const commentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(1000),
  rating: z.number().min(1).max(5).optional(),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type CommentFormData = z.infer<typeof commentSchema>;

export function validateDocument(file: {
  name: string;
  type: string;
  size: number;
}): string | null {
  const ext = "." + file.name.split(".").pop()?.toLowerCase();

  if (!ALLOWED_DOC_EXTENSIONS.includes(ext)) {
    return `File type not allowed. Allowed types: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, JPG, PNG`;
  }

  if (!ALLOWED_DOC_TYPES.includes(file.type)) {
    return `Invalid file format`;
  }

  if (file.size > MAX_DOC_SIZE) {
    return `File size must be under 10MB`;
  }

  return null;
}
