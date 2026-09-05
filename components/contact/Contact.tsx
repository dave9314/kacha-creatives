"use client";

import { useState, useRef, useTransition } from "react";
import { submitContact } from "@/lib/actions/contact";
import {
  Upload,
  X,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/lib/utils";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default function Contact() {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileSelect = (selected: File) => {
    setFileError("");

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setFileError("Invalid file type. Allowed: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, JPG, PNG");
      return;
    }

    if (selected.size > MAX_SIZE) {
      setFileError("File must be under 10MB");
      return;
    }

    setFile(selected);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFileSelect(dropped);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFileSelect(selected);
  };

  const removeFile = () => {
    setFile(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    if (file) {
      formData.set("document", file);
    }

    startTransition(async () => {
      // Simulate progress
      setUploadProgress(10);
      const timer = setInterval(() => {
        setUploadProgress((p) => (p < 80 ? p + 10 : p));
      }, 200);

      const result = await submitContact(formData);
      clearInterval(timer);
      setUploadProgress(100);

      if (result.success) {
        setSuccess(true);
        formRef.current?.reset();
        setFile(null);
        setUploadProgress(0);
      } else {
        setError(result.error || "Something went wrong");
        setUploadProgress(0);
      }
    });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-1/2 h-2/3 bg-gradient-to-tr from-brand-amber/4 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-brand-amber" />
            <span className="text-brand-amber text-xs tracking-[0.4em] font-semibold uppercase">
              Get In Touch
            </span>
            <div className="h-[1px] w-8 bg-brand-amber" />
          </div>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4">
            GET IN TOUCH
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Let's grow your brand through creative digital storytelling.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-display font-bold text-white text-2xl mb-2">
                Start a Conversation
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Whether you have a project in mind, want to explore our services, or just
                want to say hello — we'd love to hear from you.
              </p>
            </div>

            <div className="space-y-5">
              {/* Phone 1 */}
              <a
                href="tel:+251920766374"
                className="flex items-start gap-4 group"
                aria-label="Call +2519 2076 6374"
              >
                <div className="p-3 bg-brand-amber/10 group-hover:bg-brand-amber transition-colors flex-shrink-0">
                  <Phone className="w-4 h-4 text-brand-amber group-hover:text-brand-dark transition-colors" />
                </div>
                <div>
                  <div className="text-white/40 text-xs mb-1">Phone</div>
                  <div className="text-white group-hover:text-brand-amber transition-colors text-sm font-medium">
                    +2519 2076 6374
                  </div>
                  <div className="text-white group-hover:text-brand-amber transition-colors text-sm font-medium mt-0.5">
                    <a href="tel:+251916451065">+2519 1645 1065</a>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:biniyamwondem2006@gmail.com"
                className="flex items-start gap-4 group"
                aria-label="Email biniyamwondem2006@gmail.com"
              >
                <div className="p-3 bg-brand-amber/10 group-hover:bg-brand-amber transition-colors flex-shrink-0">
                  <Mail className="w-4 h-4 text-brand-amber group-hover:text-brand-dark transition-colors" />
                </div>
                <div>
                  <div className="text-white/40 text-xs mb-1">Email</div>
                  <div className="text-white group-hover:text-brand-amber transition-colors text-sm font-medium break-all">
                    biniyamwondem2006@gmail.com
                  </div>
                </div>
              </a>

              {/* Address */}
              <a
                href="https://www.google.com/maps/search/Addis+Ababa,+Ethiopia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
                aria-label="View Addis Ababa, Ethiopia on map"
              >
                <div className="p-3 bg-brand-amber/10 group-hover:bg-brand-amber transition-colors flex-shrink-0">
                  <MapPin className="w-4 h-4 text-brand-amber group-hover:text-brand-dark transition-colors" />
                </div>
                <div>
                  <div className="text-white/40 text-xs mb-1">Location</div>
                  <div className="text-white group-hover:text-brand-amber transition-colors text-sm font-medium">
                    Addis Ababa, Ethiopia
                  </div>
                </div>
              </a>
            </div>

            {/* Subject ideas */}
            <div className="glass-dark p-5">
              <p className="text-white/40 text-xs mb-3 uppercase tracking-wide">
                Common Inquiries
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Branding Project",
                  "Social Media",
                  "Video Production",
                  "Graphic Design",
                  "Digital Marketing",
                  "Partnership",
                  "General Inquiry",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-white/5 text-white/40 text-xs hover:bg-brand-amber/10 hover:text-brand-amber transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {success ? (
              <div className="glass-dark p-12 text-center h-full flex flex-col items-center justify-center border-brand-amber/20">
                <CheckCircle className="w-16 h-16 text-brand-amber mx-auto mb-6" />
                <h3 className="font-display font-bold text-white text-3xl mb-3">
                  Thank You!
                </h3>
                <p className="text-white/60 text-lg max-w-md">
                  Your message has been received. The Kacha Creatives team will review
                  your request and get back to you.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-8 text-brand-amber text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Name + Email row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/60 text-sm mb-2" htmlFor="c-name">
                      Your Name <span className="text-brand-amber">*</span>
                    </label>
                    <input
                      id="c-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="w-full bg-brand-charcoal border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors placeholder:text-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2" htmlFor="c-email">
                      Email Address <span className="text-brand-amber">*</span>
                    </label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full bg-brand-charcoal border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors placeholder:text-white/20"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white/60 text-sm mb-2" htmlFor="c-phone">
                    Phone Number{" "}
                    <span className="text-white/30 text-xs">(Optional)</span>
                  </label>
                  <input
                    id="c-phone"
                    name="phone"
                    type="tel"
                    placeholder="+251..."
                    className="w-full bg-brand-charcoal border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors placeholder:text-white/20"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-white/60 text-sm mb-2" htmlFor="c-subject">
                    Subject / Introduction <span className="text-brand-amber">*</span>
                  </label>
                  <input
                    id="c-subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="What would you like to discuss?"
                    className="w-full bg-brand-charcoal border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors placeholder:text-white/20"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white/60 text-sm mb-2" htmlFor="c-desc">
                    Tell Us About Your Project <span className="text-brand-amber">*</span>
                  </label>
                  <textarea
                    id="c-desc"
                    name="description"
                    required
                    rows={5}
                    placeholder="Tell us about your project, goals, requirements, timeline, or anything else you'd like us to know..."
                    className="w-full bg-brand-charcoal border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors placeholder:text-white/20 resize-none"
                  />
                </div>

                {/* Document upload */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    Attach a Document{" "}
                    <span className="text-white/30 text-xs">(Optional)</span>
                  </label>

                  {file ? (
                    <div className="flex items-center gap-3 p-4 bg-brand-charcoal border border-brand-amber/30">
                      <FileText className="w-5 h-5 text-brand-amber flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">{file.name}</p>
                        <p className="text-white/40 text-xs">
                          {file.type.split("/")[1]?.toUpperCase()} •{" "}
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-white/40 hover:text-red-400 transition-colors"
                        aria-label="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      className={cn(
                        "border-2 border-dashed p-8 text-center transition-all cursor-pointer",
                        dragOver
                          ? "border-brand-amber bg-brand-amber/5"
                          : "border-white/10 hover:border-white/20"
                      )}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-6 h-6 text-white/30 mx-auto mb-3" />
                      <p className="text-white/50 text-sm">
                        Drag & drop your file here or{" "}
                        <span className="text-brand-amber">Choose File</span>
                      </p>
                      <p className="text-white/20 text-xs mt-1">
                        PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, JPG, PNG — Max 10MB
                      </p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="Upload document"
                  />

                  {fileError && (
                    <p className="text-red-400 text-xs mt-2">{fileError}</p>
                  )}
                </div>

                {/* Upload progress */}
                {isPending && uploadProgress > 0 && (
                  <div>
                    <div className="h-1 bg-white/10">
                      <div
                        className="h-full bg-brand-amber transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Global error */}
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-brand-amber text-brand-dark font-bold text-sm py-4 hover:bg-brand-gold transition-all duration-300 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  {isPending ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    "SEND MESSAGE"
                  )}
                </button>

                <p className="text-white/20 text-xs text-center">
                  No account required. We'll respond within 1-2 business days.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
