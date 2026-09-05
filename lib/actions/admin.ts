"use server";

import { prisma } from "@/lib/prisma";
import { getSupabaseAdmin, BUCKETS } from "@/lib/supabase";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { generateUniqueFilename } from "@/lib/utils";

// Auth guard
async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

// ===== PORTFOLIO ACTIONS =====
export async function createPortfolioProject(formData: FormData) {
  await requireAdmin();
  try {
    const project = await prisma.portfolioProject.create({
      data: {
        title: formData.get("title") as string,
        description: (formData.get("description") as string) || undefined,
        category: formData.get("category") as string,
        status: "DRAFT",
        isFeatured: formData.get("isFeatured") === "true",
        order: parseInt((formData.get("order") as string) || "0"),
      },
    });
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
    return { success: true, id: project.id };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updatePortfolioProject(id: string, formData: FormData) {
  await requireAdmin();
  try {
    await prisma.portfolioProject.update({
      where: { id },
      data: {
        title: formData.get("title") as string,
        description: (formData.get("description") as string) || undefined,
        category: formData.get("category") as string,
        isFeatured: formData.get("isFeatured") === "true",
        order: parseInt((formData.get("order") as string) || "0"),
      },
    });
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function toggleProjectStatus(id: string) {
  await requireAdmin();
  const project = await prisma.portfolioProject.findUnique({ where: { id } });
  if (!project) return { success: false, error: "Not found" };

  await prisma.portfolioProject.update({
    where: { id },
    data: { status: project.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" },
  });
  revalidatePath("/admin/portfolio");
  revalidatePath("/");
  return { success: true };
}

export async function deletePortfolioProject(id: string) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const project = await prisma.portfolioProject.findUnique({
    where: { id },
    include: { media: true },
  });
  if (!project) return { success: false };

  // Delete media from storage
  for (const media of project.media) {
    await supabase.storage.from(BUCKETS.PORTFOLIO).remove([media.storagePath]);
  }

  await prisma.portfolioProject.delete({ where: { id } });
  revalidatePath("/admin/portfolio");
  revalidatePath("/");
  return { success: true };
}

export async function uploadPortfolioMedia(
  projectId: string,
  formData: FormData
) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const file = formData.get("file") as File;
  if (!file) return { success: false, error: "No file provided" };

  const isVideo = file.type.startsWith("video/");
  const isImage = file.type.startsWith("image/");
  if (!isVideo && !isImage)
    return { success: false, error: "Invalid file type" };

  const uniqueName = generateUniqueFilename(file.name);
  const storagePath = `${projectId}/${uniqueName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, error } = await supabase.storage
    .from(BUCKETS.PORTFOLIO)
    .upload(storagePath, buffer, { contentType: file.type });

  if (error) return { success: false, error: "Upload failed" };

  const { data: urlData } = supabase.storage
    .from(BUCKETS.PORTFOLIO)
    .getPublicUrl(data.path);

  const media = await prisma.media.create({
    data: {
      url: urlData.publicUrl,
      storagePath: data.path,
      filename: file.name,
      mimeType: file.type,
      type: isVideo ? "VIDEO" : "IMAGE",
      size: file.size,
      projectId,
    },
  });

  // Set as cover if first image/video
  const project = await prisma.portfolioProject.findUnique({
    where: { id: projectId },
  });
  if (!project?.coverUrl) {
    await prisma.portfolioProject.update({
      where: { id: projectId },
      data: { coverUrl: urlData.publicUrl, coverPath: data.path },
    });
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/");
  return { success: true, media };
}

export async function deleteMedia(mediaId: string) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const media = await prisma.media.findUnique({ where: { id: mediaId } });
  if (!media) return { success: false };

  await supabase.storage.from(BUCKETS.PORTFOLIO).remove([media.storagePath]);
  await prisma.media.delete({ where: { id: mediaId } });
  revalidatePath("/admin/portfolio");
  return { success: true };
}

// ===== TEAM ACTIONS =====
export async function createTeamMember(formData: FormData) {
  await requireAdmin();
  const member = await prisma.teamMember.create({
    data: {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      bio: (formData.get("bio") as string) || undefined,
      order: parseInt((formData.get("order") as string) || "0"),
      isVisible: formData.get("isVisible") !== "false",
    },
  });
  revalidatePath("/admin/team");
  revalidatePath("/");
  return { success: true, id: member.id };
}

export async function updateTeamMember(id: string, formData: FormData) {
  await requireAdmin();

  // Build update object only from provided fields
  const updateData: Record<string, unknown> = {};
  const name = formData.get("name") as string | null;
  const role = formData.get("role") as string | null;
  const bio = formData.get("bio") as string | null;
  const order = formData.get("order") as string | null;
  const isVisibleRaw = formData.get("isVisible") as string | null;

  if (name) updateData.name = name;
  if (role) updateData.role = role;
  if (bio !== null) updateData.bio = bio || undefined;
  if (order !== null) updateData.order = parseInt(order || "0");
  // isVisible: "true" => true, anything else (including null if unchecked) => false
  // But only update if the field was explicitly passed
  if (isVisibleRaw !== undefined) {
    updateData.isVisible = isVisibleRaw === "true" || isVisibleRaw === "on";
  }

  await prisma.teamMember.update({ where: { id }, data: updateData });
  revalidatePath("/admin/team");
  revalidatePath("/");
  return { success: true };
}

export async function uploadTeamPhoto(memberId: string, formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const file = formData.get("photo") as File;
  if (!file) return { success: false, error: "No file" };

  const uniqueName = generateUniqueFilename(file.name);
  const storagePath = `${memberId}/${uniqueName}`;
  const arrayBuffer = await file.arrayBuffer();

  const { data, error } = await supabase.storage
    .from(BUCKETS.TEAM)
    .upload(storagePath, Buffer.from(arrayBuffer), {
      contentType: file.type,
    });
  if (error) return { success: false, error: "Upload failed" };

  const { data: urlData } = supabase.storage
    .from(BUCKETS.TEAM)
    .getPublicUrl(data.path);

  await prisma.teamMember.update({
    where: { id: memberId },
    data: { photoUrl: urlData.publicUrl, photoPath: data.path },
  });
  revalidatePath("/admin/team");
  revalidatePath("/");
  return { success: true, url: urlData.publicUrl };
}

export async function deleteTeamMember(id: string) {
  await requireAdmin();
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/admin/team");
  revalidatePath("/");
  return { success: true };
}

// ===== TESTIMONIAL ACTIONS =====
export async function createTestimonial(formData: FormData) {
  await requireAdmin();
  await prisma.testimonial.create({
    data: {
      clientName: formData.get("clientName") as string,
      company: formData.get("company") as string,
      quote: formData.get("quote") as string,
      authorName: formData.get("authorName") as string,
      isPublished: formData.get("isPublished") !== "false",
      order: parseInt((formData.get("order") as string) || "0"),
    },
  });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.testimonial.update({
    where: { id },
    data: {
      clientName: formData.get("clientName") as string,
      company: formData.get("company") as string,
      quote: formData.get("quote") as string,
      authorName: formData.get("authorName") as string,
      isPublished: formData.get("isPublished") !== "false",
      order: parseInt((formData.get("order") as string) || "0"),
    },
  });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

// ===== COMMENT ACTIONS =====
export async function moderateComment(
  id: string,
  status: "APPROVED" | "REJECTED"
) {
  await requireAdmin();
  await prisma.comment.update({ where: { id }, data: { status } });
  revalidatePath("/admin/comments");
  revalidatePath("/");
  return { success: true };
}

export async function deleteComment(id: string) {
  await requireAdmin();
  await prisma.comment.delete({ where: { id } });
  revalidatePath("/admin/comments");
  return { success: true };
}

// ===== MESSAGE ACTIONS =====
export async function updateMessageStatus(
  id: string,
  status: "READ" | "REPLIED" | "ARCHIVED"
) {
  await requireAdmin();
  await prisma.contactMessage.update({ where: { id }, data: { status } });
  revalidatePath("/admin/messages");
  return { success: true };
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const message = await prisma.contactMessage.findUnique({ where: { id } });

  if (message?.documentPath) {
    await supabase.storage
      .from(BUCKETS.CONTACT_DOCUMENTS)
      .remove([message.documentPath]);
  }

  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
  return { success: true };
}

export async function getDocumentSignedUrl(
  documentPath: string
): Promise<string | null> {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.storage
    .from(BUCKETS.CONTACT_DOCUMENTS)
    .createSignedUrl(documentPath, 3600); // 1 hour
  return data?.signedUrl || null;
}

// ===== SERVICE ACTIONS =====
export async function createService(formData: FormData) {
  await requireAdmin();
  const itemsRaw = formData.get("items") as string;
  const items = itemsRaw ? itemsRaw.split("\n").filter(Boolean) : [];

  await prisma.service.create({
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string,
      items,
      order: parseInt((formData.get("order") as string) || "0"),
      isVisible: formData.get("isVisible") !== "false",
    },
  });
  revalidatePath("/admin/services");
  revalidatePath("/");
  return { success: true };
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();
  const itemsRaw = formData.get("items") as string;
  const items = itemsRaw ? itemsRaw.split("\n").filter(Boolean) : [];

  await prisma.service.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string,
      items,
      order: parseInt((formData.get("order") as string) || "0"),
      isVisible: formData.get("isVisible") !== "false",
    },
  });
  revalidatePath("/admin/services");
  revalidatePath("/");
  return { success: true };
}

export async function deleteService(id: string) {
  await requireAdmin();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/");
  return { success: true };
}

// ===== SETTINGS ACTIONS =====
export async function updateSiteSettings(formData: FormData) {
  await requireAdmin();
  const keys = [
    "company_name", "tagline", "phone_1", "phone_2",
    "email", "address", "founded", "mission", "vision",
  ];
  for (const key of keys) {
    const value = formData.get(key) as string;
    if (value !== null) {
      await prisma.siteSettings.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
  }
  revalidatePath("/");
  return { success: true };
}

export async function changeAdminPassword(formData: FormData) {
  const session = await requireAdmin();
  const bcrypt = await import("bcryptjs");
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!newPassword || newPassword.length < 8) {
    return { success: false, error: "Password must be at least 8 characters" };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });
  if (!user) return { success: false, error: "User not found" };

  const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isValid) return { success: false, error: "Current password is incorrect" };

  const newHash = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: newHash },
  });

  return { success: true };
}

// ===== TOGGLE TEAM VISIBILITY =====
export async function toggleTeamVisibility(id: string) {
  await requireAdmin();
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) return { success: false };
  await prisma.teamMember.update({
    where: { id },
    data: { isVisible: !member.isVisible },
  });
  revalidatePath("/admin/team");
  revalidatePath("/");
  return { success: true };
}
