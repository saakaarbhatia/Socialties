"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { creatorApplicationSchema, CreatorApplicationInput } from "./_schemas/creator-application.schema";
import { submitCreatorApplication } from "./_actions/submit-creator-application";
import { Send, CheckCircle, AlertTriangle } from "lucide-react";

const categories = [
  "Fashion",
  "Beauty",
  "Tech",
  "Food",
  "Travel",
  "Fitness",
  "Comedy",
  "Lifestyle",
  "Finance",
  "Parenting",
  "Other",
];

const languagesList = [
  "English",
  "Hindi",
  "Punjabi",
  "Bengali",
  "Marathi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Other",
];

const contentFormats = [
  "Reels",
  "Static Posts",
  "Stories",
  "YouTube Long-form",
  "YouTube Shorts",
  "Blogs",
];

export default function CreatorsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(creatorApplicationSchema),
    defaultValues: {
      languages: [],
      contentTypes: [],
    },
  });

  const selectedLanguages = watch("languages");
  const selectedFormats = watch("contentTypes");

  const toggleLanguage = (val: string) => {
    const current = [...selectedLanguages];
    const index = current.indexOf(val);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(val);
    }
    setValue("languages", current, { shouldValidate: true });
  };

  const toggleFormat = (val: string) => {
    const current = [...selectedFormats];
    const index = current.indexOf(val);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(val);
    }
    setValue("contentTypes", current, { shouldValidate: true });
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const res = await submitCreatorApplication(data);
      if (res.success) {
        setSuccess(true);
      } else {
        setErrorMsg(res.error || "Failed to submit application");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 px-6 max-w-3xl mx-auto space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="text-sm font-semibold tracking-wider text-brand-lime uppercase">
          For Creators
        </h1>
        <p className="text-4xl sm:text-5xl font-display font-black tracking-tight">
          Turn Influence Into Income
        </p>
        <p className="text-sm text-fg-muted max-w-lg mx-auto leading-relaxed">
          Join our verified creator roster to unlock premium opportunities and long-term brand ambassador programs with leading startups and enterprises.
        </p>
      </div>

      {success ? (
        <div className="bg-brand-lime/10 border border-brand-lime/30 rounded-3xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-brand-lime rounded-full flex items-center justify-center text-black mx-auto">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-black text-foreground">Application Received!</h2>
          <p className="text-sm text-fg-muted leading-relaxed max-w-md mx-auto">
            Awesome! Your profile has been queued for vetting. Our creator relations team will review your channels and email you details within 3-5 business days.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-bg-elevated border border-border p-8 rounded-3xl shadow-sm">
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl flex items-center space-x-2 text-sm">
              <AlertTriangle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Grid of basic fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-full">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Full Name *
              </label>
              <input
                type="text"
                {...register("fullName")}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
              />
              {errors.fullName && (
                <p className="text-xs text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Instagram URL *
              </label>
              <input
                type="text"
                {...register("instagramUrl")}
                placeholder="https://instagram.com/yourhandle"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
              />
              {errors.instagramUrl && (
                <p className="text-xs text-red-500">{errors.instagramUrl.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                YouTube Channel URL
              </label>
              <input
                type="text"
                {...register("youtubeUrl")}
                placeholder="https://youtube.com/@yourchannel"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
              />
              {errors.youtubeUrl && (
                <p className="text-xs text-red-500">{errors.youtubeUrl.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Total Followers (All Handles) *
              </label>
              <input
                type="number"
                {...register("followers")}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
              />
              {errors.followers && (
                <p className="text-xs text-red-500">{errors.followers.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Primary Content Niche *
              </label>
              <select
                {...register("category")}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
              >
                <option value="">Select Niche</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Phone Number *
              </label>
              <input
                type="tel"
                {...register("phone")}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Email Address *
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                City / Location *
              </label>
              <input
                type="text"
                {...register("city")}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
              />
              {errors.city && (
                <p className="text-xs text-red-500">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Average Views
              </label>
              <input
                type="number"
                {...register("averageViews")}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
              />
              {errors.averageViews && (
                <p className="text-xs text-red-500">{errors.averageViews.message}</p>
              )}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Languages You Create Content In *
            </label>
            <div className="flex flex-wrap gap-3">
              {languagesList.map((lang) => {
                const active = selectedLanguages.includes(lang);
                return (
                  <button
                    type="button"
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className={`px-4 py-2 border rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      active
                        ? "bg-brand-lime border-brand-lime text-black"
                        : "bg-background border-border text-foreground hover:border-brand-lime/40"
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
            {errors.languages && (
              <p className="text-xs text-red-500">{errors.languages.message}</p>
            )}
          </div>

          {/* Formats */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Content Formats *
            </label>
            <div className="flex flex-wrap gap-3">
              {contentFormats.map((format) => {
                const active = selectedFormats.includes(format);
                return (
                  <button
                    type="button"
                    key={format}
                    onClick={() => toggleFormat(format)}
                    className={`px-4 py-2 border rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      active
                        ? "bg-brand-lime border-brand-lime text-black"
                        : "bg-background border-border text-foreground hover:border-brand-lime/40"
                    }`}
                  >
                    {format}
                  </button>
                );
              })}
            </div>
            {errors.contentTypes && (
              <p className="text-xs text-red-500">{errors.contentTypes.message}</p>
            )}
          </div>

          {/* Message / Bio info */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Introduce Yourself / Channels Summary
            </label>
            <textarea
              rows={4}
              {...register("message")}
              placeholder="Tell us about your audience demographics, brands you've worked with, or anything else..."
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
            />
            {errors.message && (
              <p className="text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-lime hover:bg-brand-lime-dark text-black font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-lime/10 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>Apply For Representation</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
