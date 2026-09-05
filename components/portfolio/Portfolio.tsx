"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Expand, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Media {
  id: string;
  url: string;
  type: "IMAGE" | "VIDEO" | "DOCUMENT";
  filename: string;
}

interface Project {
  id: string;
  title: string;
  description: string | null;
  category: string;
  coverUrl: string | null;
  isFeatured: boolean;
  media: Media[];
}

interface PortfolioProps {
  projects: Project[];
}

const ALL_CATEGORY = "All";

export default function Portfolio({ projects }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxProjectId, setLightboxProjectId] = useState<string | null>(null);

  const categories = [
    ALL_CATEGORY,
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const filtered =
    activeCategory === ALL_CATEGORY
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const featured = filtered.filter((p) => p.isFeatured);
  const regular = filtered.filter((p) => !p.isFeatured);

  const openLightbox = (projectId: string, mediaIndex: number) => {
    setLightboxProjectId(projectId);
    setLightboxIndex(mediaIndex);
  };

  const closeLightbox = () => {
    setLightboxProjectId(null);
    setLightboxIndex(null);
  };

  const lightboxProject = projects.find((p) => p.id === lightboxProjectId);
  const lightboxMedia = lightboxProject?.media || [];

  const prevMedia = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + lightboxMedia.length) % lightboxMedia.length
    );
  };

  const nextMedia = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % lightboxMedia.length);
  };

  if (projects.length === 0) {
    return (
      <section id="portfolio" className="py-24 lg:py-32 bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-brand-amber" />
            <span className="text-brand-amber text-xs tracking-[0.4em] font-semibold uppercase">
              Our Portfolio
            </span>
            <div className="h-[1px] w-8 bg-brand-amber" />
          </div>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4">
            Selected <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/40 mt-8">
            Portfolio projects will appear here once published.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-brand-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-brand-amber" />
              <span className="text-brand-amber text-xs tracking-[0.4em] font-semibold uppercase">
                Our Portfolio
              </span>
            </div>
            <h2 className="font-display font-bold text-white text-4xl sm:text-5xl">
              Selected <span className="gradient-text">Projects</span>
            </h2>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-1.5 text-xs font-semibold transition-all duration-300",
                  activeCategory === cat
                    ? "bg-brand-amber text-brand-dark"
                    : "border border-white/20 text-white/50 hover:border-white/40 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured projects */}
        {featured.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {featured.slice(0, 2).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                large
                onMediaClick={(index) => openLightbox(project.id, index)}
              />
            ))}
          </div>
        )}

        {/* Regular grid — masonry-style */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {regular.map((project) => (
            <div key={project.id} className="break-inside-avoid">
              <ProjectCard
                project={project}
                onMediaClick={(index) => openLightbox(project.id, index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && lightboxProject && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/60 hover:text-white p-2"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevMedia();
            }}
            className="absolute left-4 text-white/60 hover:text-white p-2"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div
            className="max-w-4xl max-h-[80vh] w-full mx-12"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxMedia[lightboxIndex]?.type === "VIDEO" ? (
              <video
                src={lightboxMedia[lightboxIndex].url}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="relative w-full h-[60vh]">
                <Image
                  src={lightboxMedia[lightboxIndex]?.url || ""}
                  alt={lightboxMedia[lightboxIndex]?.filename || ""}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="text-center mt-4">
              <h3 className="text-white font-display font-semibold text-xl">
                {lightboxProject.title}
              </h3>
              {lightboxProject.description && (
                <p className="text-white/50 text-sm mt-1">
                  {lightboxProject.description}
                </p>
              )}
              <p className="text-white/30 text-xs mt-2">
                {lightboxIndex + 1} / {lightboxMedia.length}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextMedia();
            }}
            className="absolute right-4 text-white/60 hover:text-white p-2"
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  );
}

function ProjectCard({
  project,
  large = false,
  onMediaClick,
}: {
  project: Project;
  large?: boolean;
  onMediaClick: (index: number) => void;
}) {
  const coverMedia = project.media[0];
  const isVideo =
    coverMedia?.type === "VIDEO" ||
    project.coverUrl?.includes("video") ||
    false;

  return (
    <div className="group relative bg-brand-dark overflow-hidden cursor-pointer">
      {/* Media */}
      <div
        className={cn(
          "relative overflow-hidden bg-brand-muted",
          large ? "aspect-[4/3]" : "aspect-[4/3]"
        )}
        onClick={() => coverMedia && onMediaClick(0)}
      >
        {project.coverUrl ? (
          <>
            {isVideo ? (
              <video
                src={project.coverUrl}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <Image
                src={project.coverUrl}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-muted">
            <span className="text-white/20 text-sm">No media</span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play icon for videos */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-brand-amber/80 rounded-full flex items-center justify-center group-hover:bg-brand-amber group-hover:scale-110 transition-all">
              <Play className="w-5 h-5 text-brand-dark ml-0.5" />
            </div>
          </div>
        )}

        {/* Actions on hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="p-2 bg-black/60 text-white hover:bg-brand-amber hover:text-brand-dark transition-colors">
            <Expand className="w-4 h-4" />
          </div>
        </div>

        {/* Category tag */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-2 py-1 bg-brand-amber text-brand-dark text-xs font-semibold">
            {project.category}
          </span>
        </div>

        {/* Media count */}
        {project.media.length > 1 && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-1 bg-black/60 text-white/70 text-xs">
              +{project.media.length - 1}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 border-t border-white/5">
        <h3 className="font-display font-semibold text-white text-base group-hover:text-brand-amber transition-colors">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-white/40 text-xs mt-1 line-clamp-2">
            {project.description}
          </p>
        )}
      </div>
    </div>
  );
}
