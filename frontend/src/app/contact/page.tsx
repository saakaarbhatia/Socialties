"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactInput } from "./_schemas/contact.schema";
import { submitContactMessage } from "./_actions/submit-contact";
import { Send, CheckCircle, AlertTriangle, Phone, Mail, MapPin } from "lucide-react";

const teamContacts = [
  {
    name: "Sanskar Gaba",
    role: "Founder / Strategy Director",
    phone: "+919876543210",
    email: "sanskar@socialties.in",
  },
  {
    name: "Saakaar Bhatia",
    role: "Co-Founder / Creator Relations",
    phone: "+919876543211",
    email: "saakaar@socialties.in",
  },
  {
    name: "Dhruva Bhandari",
    role: "Operations Lead",
    phone: "+919876543212",
    email: "dhruva@socialties.in",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const res = await submitContactMessage(data);
      if (res.success) {
        setSuccess(true);
        reset();
      } else {
        setErrorMsg(res.error || "Failed to submit message");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16">
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <h1 className="text-sm font-semibold tracking-wider text-brand-lime uppercase">
          Contact Us
        </h1>
        <p className="text-4xl sm:text-5xl font-display font-black tracking-tight">
          Let's Start Something Big
        </p>
        <p className="text-sm text-fg-muted leading-relaxed">
          Have questions about campaigns, representation, or operations? Reach out directly to our team leads or send a general inquiry below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Direct Contacts & Map */}
        <div className="lg:col-span-1 space-y-8">
          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b border-border pb-2 text-foreground">
              Direct Contact
            </h2>
            <div className="space-y-4">
              {teamContacts.map((contact) => (
                <div
                  key={contact.name}
                  className="bg-bg-elevated border border-border p-5 rounded-2xl space-y-3 hover:border-brand-lime/20 transition-colors shadow-sm"
                >
                  <div>
                    <h3 className="font-bold text-foreground">{contact.name}</h3>
                    <p className="text-xs text-fg-muted uppercase tracking-wider font-semibold">
                      {contact.role}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1.5 text-xs text-fg-muted">
                    <a
                      href={`tel:${contact.phone}`}
                      className="hover:text-brand-lime transition-colors flex items-center space-x-2"
                    >
                      <Phone size={12} />
                      <span>{contact.phone}</span>
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="hover:text-brand-lime transition-colors flex items-center space-x-2"
                    >
                      <Mail size={12} />
                      <span>{contact.email}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delhi Office Map */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b border-border pb-2 text-foreground">
              Delhi Office Location
            </h2>
            <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden border border-border">
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.4891107577535!2d77.16854127622998!3d28.71985397571866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d01867c4ec2a5%3A0xe543efb1c97a5530!2sAzadpur%2C%20Delhi!5e0!3m2!1sen!2sin!4v1719827000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* General Inquiry Form */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold border-b border-border pb-2 text-foreground">
            General Inquiry
          </h2>

          {success ? (
            <div className="bg-brand-lime/10 border border-brand-lime/30 rounded-3xl p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-brand-lime rounded-full flex items-center justify-center text-black mx-auto">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-black text-foreground">Message Transmitted!</h3>
              <p className="text-sm text-fg-muted max-w-sm mx-auto">
                Thanks for reaching out! We've received your message and will respond to your email shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-2.5 bg-background border border-border text-foreground hover:bg-bg-elevated transition-colors text-xs font-semibold uppercase tracking-wider rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-bg-elevated border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl flex items-center space-x-2 text-sm">
                  <AlertTriangle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Name *
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
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
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Subject
                  </label>
                  <input
                    type="text"
                    {...register("subject")}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                  />
                  {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Message *
                </label>
                <textarea
                  rows={5}
                  {...register("message")}
                  placeholder="How can we help your brand or content channels..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
                {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-lime hover:bg-brand-lime-dark text-black font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-lime/10 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
