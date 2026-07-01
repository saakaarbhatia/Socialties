"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandLeadSchema, BrandLeadInput } from "./_schemas/brand-lead.schema";
import { submitBrandLead } from "./_actions/submit-brand-lead";
import { Send, CheckCircle, AlertTriangle } from "lucide-react";

const budgetRanges = [
  "Under ₹1 Lakh",
  "₹1 Lakh - ₹5 Lakhs",
  "₹5 Lakhs - ₹20 Lakhs",
  "₹20 Lakhs+",
  "Custom/Not Sure",
];

const objectives = [
  "Brand Awareness",
  "Product Launch",
  "Sales / Conversions",
  "App Installs",
  "Event Promotion",
  "Ambassador Program",
];

const platforms = [
  "Instagram",
  "YouTube",
  "Facebook",
  "LinkedIn",
  "Twitter / X",
  "Other",
];

export default function BrandsPage() {
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
    resolver: zodResolver(brandLeadSchema),
    defaultValues: {
      campaignObjectives: [],
      platforms: [],
    },
  });

  const selectedObjectives = watch("campaignObjectives");
  const selectedPlatforms = watch("platforms");

  const toggleObjective = (val: string) => {
    const current = [...selectedObjectives];
    const index = current.indexOf(val);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(val);
    }
    setValue("campaignObjectives", current, { shouldValidate: true });
  };

  const togglePlatform = (val: string) => {
    const current = [...selectedPlatforms];
    const index = current.indexOf(val);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(val);
    }
    setValue("platforms", current, { shouldValidate: true });
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const res = await submitBrandLead(data);
      if (res.success) {
        setSuccess(true);
      } else {
        setErrorMsg(res.error || "Failed to submit lead");
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
          For Brands
        </h1>
        <p className="text-4xl sm:text-5xl font-display font-black tracking-tight">
          Partner With Vetted Creators
        </p>
        <p className="text-sm text-fg-muted max-w-lg mx-auto leading-relaxed">
          Tell us about your campaign objectives. We will get back to you with custom shortlist proposals and conversion-driven strategy briefs.
        </p>
      </div>

      {success ? (
        <div className="bg-brand-lime/10 border border-brand-lime/30 rounded-3xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-brand-lime rounded-full flex items-center justify-center text-black mx-auto">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-black text-foreground">Submission Successful!</h2>
          <p className="text-sm text-fg-muted leading-relaxed max-w-md mx-auto">
            Thank you for reaching out! A dedicated campaign manager from the Socialties ops team will contact you within 24 hours.
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
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Company Name *
              </label>
              <input
                type="text"
                {...register("companyName")}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
              />
              {errors.companyName && (
                <p className="text-xs text-red-500">{errors.companyName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Website
              </label>
              <input
                type="text"
                {...register("website")}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
              />
              {errors.website && (
                <p className="text-xs text-red-500">{errors.website.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Contact Person *
              </label>
              <input
                type="text"
                {...register("contactPerson")}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
              />
              {errors.contactPerson && (
                <p className="text-xs text-red-500">{errors.contactPerson.message}</p>
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

            <div className="space-y-2 col-span-full">
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
          </div>

          {/* Budget tier */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Estimated Campaign Budget *
            </label>
            <div className="flex flex-wrap gap-3">
              {budgetRanges.map((range) => (
                <label
                  key={range}
                  className={`cursor-pointer px-4 py-2 border rounded-xl text-xs font-semibold uppercase tracking-wider transition-all select-none ${
                    watch("campaignBudget") === range
                      ? "bg-brand-lime border-brand-lime text-black"
                      : "bg-background border-border text-foreground hover:border-brand-lime/40"
                  }`}
                >
                  <input
                    type="radio"
                    value={range}
                    {...register("campaignBudget")}
                    className="hidden"
                  />
                  {range}
                </label>
              ))}
            </div>
            {errors.campaignBudget && (
              <p className="text-xs text-red-500">{errors.campaignBudget.message}</p>
            )}
          </div>

          {/* Objectives (Multi-select) */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Campaign Objectives *
            </label>
            <div className="flex flex-wrap gap-3">
              {objectives.map((obj) => {
                const active = selectedObjectives.includes(obj);
                return (
                  <button
                    type="button"
                    key={obj}
                    onClick={() => toggleObjective(obj)}
                    className={`px-4 py-2 border rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      active
                        ? "bg-brand-lime border-brand-lime text-black"
                        : "bg-background border-border text-foreground hover:border-brand-lime/40"
                    }`}
                  >
                    {obj}
                  </button>
                );
              })}
            </div>
            {errors.campaignObjectives && (
              <p className="text-xs text-red-500">{errors.campaignObjectives.message}</p>
            )}
          </div>

          {/* Target Platforms */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Target Platforms *
            </label>
            <div className="flex flex-wrap gap-3">
              {platforms.map((plat) => {
                const active = selectedPlatforms.includes(plat);
                return (
                  <button
                    type="button"
                    key={plat}
                    onClick={() => togglePlatform(plat)}
                    className={`px-4 py-2 border rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      active
                        ? "bg-brand-lime border-brand-lime text-black"
                        : "bg-background border-border text-foreground hover:border-brand-lime/40"
                    }`}
                  >
                    {plat}
                  </button>
                );
              })}
            </div>
            {errors.platforms && (
              <p className="text-xs text-red-500">{errors.platforms.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Brief Campaign Description *
            </label>
            <textarea
              rows={4}
              {...register("description")}
              placeholder="Describe your goals, target audience, and expected timelines..."
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description.message}</p>
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
                  <span>Send Campaign Brief</span>
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
