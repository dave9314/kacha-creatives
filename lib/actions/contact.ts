"use server";

import { prisma } from "@/lib/prisma";
import { getSupabaseAdmin, BUCKETS } from "@/lib/supabase";
import { contactSchema, validateDocument } from "@/lib/validations/contact";
import { checkRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { generateUniqueFilename } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function submitContact(formData: FormData) {
  try {
    // Get IP for rate limiting
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "unknown";

    // Rate limiting: 5 submissions per 10 minutes per IP
    const rateCheck = checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return {
        success: false,
        error: "Too many submissions. Please wait a few minutes and try again.",
      };
    }

    // Extract form fields
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      subject: formData.get("subject") as string,
      description: formData.get("description") as string,
      honeypot: (formData.get("website") as string) || "",
    };

    // Check honeypot
    if (rawData.honeypot) {
      return { success: false, error: "Spam detected." };
    }

    // Validate
    const parsed = contactSchema.safeParse(rawData);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      return { success: false, error: firstError.message };
    }

    const { name, email, phone, subject, description } = parsed.data;

    // Handle optional document upload
    let documentUrl: string | undefined;
    let documentPath: string | undefined;
    let documentName: string | undefined;
    let documentType: string | undefined;
    let documentSize: number | undefined;

    const docFile = formData.get("document") as File | null;

    if (docFile && docFile.size > 0) {
      // Validate document
      const docError = validateDocument({
        name: docFile.name,
        type: docFile.type,
        size: docFile.size,
      });

      if (docError) {
        return { success: false, error: docError };
      }

      // Upload to Supabase - private bucket, server-side only
      const supabase = getSupabaseAdmin();
      const uniqueFilename = generateUniqueFilename(docFile.name);
      const requestId = `req-${Date.now()}`;
      const storagePath = `${requestId}/${uniqueFilename}`;

      const arrayBuffer = await docFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKETS.CONTACT_DOCUMENTS)
        .upload(storagePath, buffer, {
          contentType: docFile.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Document upload error:", uploadError);
        return {
          success: false,
          error: "Failed to upload document. Please try again.",
        };
      }

      // Get signed URL (not public)
      documentPath = uploadData.path;
      documentName = docFile.name;
      documentType = docFile.type;
      documentSize = docFile.size;
      // Store path; signed URLs generated on admin access
      documentUrl = `private:${uploadData.path}`;
    }

    // Save to database
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        subject,
        description,
        documentUrl,
        documentPath,
        documentName,
        documentType,
        documentSize,
        status: "NEW",
      },
    });

    revalidatePath("/admin/messages");

    return { success: true };
  } catch (error) {
    console.error("Contact submission error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}

export async function submitComment(formData: FormData) {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    // Rate limiting: 3 per 5 minutes
    const rateCheck = checkRateLimit(`comment:${ip}`, 3, 5 * 60 * 1000);
    if (!rateCheck.allowed) {
      return {
        success: false,
        error: "Too many submissions. Please wait a few minutes.",
      };
    }

    const honeypot = formData.get("website") as string;
    if (honeypot) return { success: false, error: "Spam detected." };

    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      comment: formData.get("comment") as string,
      rating: formData.get("rating")
        ? parseInt(formData.get("rating") as string)
        : undefined,
      honeypot: honeypot || "",
    };

    const { commentSchema } = await import("@/lib/validations/contact");
    const parsed = commentSchema.safeParse(rawData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0].message };
    }

    await prisma.comment.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        comment: parsed.data.comment,
        rating: parsed.data.rating,
        status: "PENDING",
      },
    });

    revalidatePath("/admin/comments");

    return { success: true };
  } catch (error) {
    console.error("Comment submission error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
