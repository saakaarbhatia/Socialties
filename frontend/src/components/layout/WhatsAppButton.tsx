"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg shadow-green-500/25 transition-transform hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse animation rings */}
      <span className="absolute inset-0 rounded-full bg-green-500/40 animate-ping group-hover:animate-none -z-10" />
      <MessageCircle size={24} className="fill-current" />
    </a>
  );
}
