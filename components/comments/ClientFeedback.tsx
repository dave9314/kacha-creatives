"use client";

import { useState, useTransition } from "react";
import { submitComment } from "@/lib/actions/contact";
import { Star, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

interface Comment {
  id: string;
  name: string;
  comment: string;
  rating: number | null;
  createdAt: Date;
}

interface ClientFeedbackProps {
  approvedComments: Comment[];
}

export default function ClientFeedback({ approvedComments }: ClientFeedbackProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (rating > 0) formData.set("rating", rating.toString());

    startTransition(async () => {
      const result = await submitComment(formData);
      if (result.success) {
        setSuccess(true);
        form.reset();
        setRating(0);
      } else {
        setError(result.error || "Something went wrong");
      }
    });
  };

  return (
    <section id="feedback" className="py-24 lg:py-32 bg-brand-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-brand-amber" />
            <span className="text-brand-amber text-xs tracking-[0.4em] font-semibold uppercase">
              Client Feedback
            </span>
            <div className="h-[1px] w-8 bg-brand-amber" />
          </div>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4">
            Tell Us What You{" "}
            <span className="gradient-text">Think</span>
          </h2>
          <p className="text-white/50">
            Share your experience — no account needed.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Feedback form */}
          <div>
            <h3 className="font-display font-semibold text-white text-xl mb-6">
              Leave Your Feedback
            </h3>

            {success ? (
              <div className="glass-dark p-8 text-center border-brand-amber/20">
                <CheckCircle className="w-12 h-12 text-brand-amber mx-auto mb-4" />
                <h4 className="font-display font-bold text-white text-xl mb-2">
                  Thank You!
                </h4>
                <p className="text-white/50">
                  Your feedback has been submitted and is pending review.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 text-brand-amber text-sm hover:underline"
                >
                  Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label className="block text-white/60 text-sm mb-2" htmlFor="fb-name">
                    Your Name <span className="text-brand-amber">*</span>
                  </label>
                  <input
                    id="fb-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors placeholder:text-white/20"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2" htmlFor="fb-email">
                    Email Address <span className="text-brand-amber">*</span>
                  </label>
                  <input
                    id="fb-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors placeholder:text-white/20"
                  />
                </div>

                {/* Star rating */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    Rating (Optional)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={cn(
                            "w-6 h-6 transition-colors",
                            star <= (hoverRating || rating)
                              ? "text-brand-amber fill-brand-amber"
                              : "text-white/20"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2" htmlFor="fb-comment">
                    Your Comment <span className="text-brand-amber">*</span>
                  </label>
                  <textarea
                    id="fb-comment"
                    name="comment"
                    required
                    rows={4}
                    placeholder="Share your experience..."
                    className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors placeholder:text-white/20 resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-brand-amber text-brand-dark font-bold text-sm py-3 hover:bg-brand-gold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "SUBMIT FEEDBACK"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Approved comments */}
          <div>
            <h3 className="font-display font-semibold text-white text-xl mb-6">
              Community Feedback
            </h3>

            {approvedComments.length === 0 ? (
              <div className="glass-dark p-8 text-center">
                <p className="text-white/30 text-sm">
                  No comments yet. Be the first to share your experience!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {approvedComments.map((comment) => (
                  <div key={comment.id} className="glass-dark p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-semibold text-white text-sm">
                        {comment.name}
                      </span>
                      {comment.rating && (
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-3 h-3",
                                i < comment.rating!
                                  ? "text-brand-amber fill-brand-amber"
                                  : "text-white/10"
                              )}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {comment.comment}
                    </p>
                    <p className="text-white/20 text-xs mt-3">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
