"use client";

import { useState } from "react";
import { updateApplicationStatus } from "@/app/admin/(protected)/creator-applications/_actions/update-app";
import { X, Check, Eye } from "lucide-react";
import { ApplicationStatus } from "@prisma/client";

interface CreatorApplication {
  id: string;
  fullName: string;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  followers: number | null;
  category: string;
  phone: string;
  email: string;
  city: string;
  languages: string[];
  contentTypes: string[];
  engagementRate: number | null;
  averageViews: number | null;
  message: string | null;
  status: ApplicationStatus;
  createdAt: Date;
}

interface CreatorApplicationsClientProps {
  initialApps: CreatorApplication[];
}

export default function CreatorApplicationsClient({ initialApps }: CreatorApplicationsClientProps) {
  const [apps, setApps] = useState(initialApps);
  const [selectedApp, setSelectedApp] = useState<CreatorApplication | null>(null);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (id: string, newStatus: ApplicationStatus) => {
    setUpdating(true);
    try {
      const res = await updateApplicationStatus(id, newStatus);
      if (res.success) {
        setApps((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-bg-elevated border border-border rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-background border-b border-border text-fg-muted uppercase tracking-wider font-semibold text-xs">
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Followers</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10">
            {apps.map((app) => (
              <tr
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className="hover:bg-background/50 cursor-pointer transition-colors"
              >
                <td className="p-4 font-bold text-foreground">{app.fullName}</td>
                <td className="p-4">{app.category}</td>
                <td className="p-4">{app.followers?.toLocaleString() || 0}</td>
                <td className="p-4">
                  <span className="text-xs px-2.5 py-1 bg-green-500/10 text-green-500 font-bold uppercase rounded-lg">
                    {app.status}
                  </span>
                </td>
                <td className="p-4 text-xs text-fg-muted">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details drawer modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/55 backdrop-blur-xs">
          <div className="bg-bg-elevated border-l border-border h-full max-w-lg w-full p-8 flex flex-col justify-between overflow-y-auto space-y-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-6 right-6 p-2 text-fg-muted hover:text-foreground rounded-full border border-border hover:bg-background transition-colors"
            >
              <X size={16} />
            </button>

            <div className="space-y-6 pt-8">
              <div>
                <h3 className="text-2xl font-black text-foreground">{selectedApp.fullName}</h3>
                <span className="text-xs text-brand-lime uppercase tracking-wider font-bold">
                  {selectedApp.category}
                </span>
              </div>

              {/* Status Action Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted block">
                  Action Status
                </label>
                <div className="flex gap-4">
                  <button
                    disabled={updating || selectedApp.status === "APPROVED"}
                    onClick={() => handleStatusChange(selectedApp.id, "APPROVED")}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    Approve Application
                  </button>
                  <button
                    disabled={updating || selectedApp.status === "REJECTED"}
                    onClick={() => handleStatusChange(selectedApp.id, "REJECTED")}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    Reject Application
                  </button>
                </div>
              </div>

              {/* Channel profiles */}
              <div className="space-y-2 border-t border-border/10 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                  Content Channels
                </h4>
                <div className="space-y-1 text-xs">
                  {selectedApp.instagramUrl && (
                    <p>
                      Instagram:{" "}
                      <a
                        href={selectedApp.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-lime hover:underline"
                      >
                        {selectedApp.instagramUrl}
                      </a>
                    </p>
                  )}
                  {selectedApp.youtubeUrl && (
                    <p>
                      YouTube:{" "}
                      <a
                        href={selectedApp.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-lime hover:underline"
                      >
                        {selectedApp.youtubeUrl}
                      </a>
                    </p>
                  )}
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-3 border-t border-border/10 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                  Creator Metrics
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-fg-muted block">Followers</span>
                    <span className="font-semibold">{selectedApp.followers?.toLocaleString() || 0}</span>
                  </div>
                  {selectedApp.engagementRate && (
                    <div>
                      <span className="text-fg-muted block">Engagement Rate</span>
                      <span className="font-semibold">{selectedApp.engagementRate}%</span>
                    </div>
                  )}
                  {selectedApp.averageViews && (
                    <div>
                      <span className="text-fg-muted block">Average Views</span>
                      <span className="font-semibold">{selectedApp.averageViews.toLocaleString()}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-fg-muted block">City</span>
                    <span className="font-semibold">{selectedApp.city}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-fg-muted block mb-1">Languages</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedApp.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-0.5 bg-background border border-border text-foreground text-[10px] font-semibold uppercase rounded-md"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-fg-muted block mb-1">Formats</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedApp.contentTypes.map((format) => (
                      <span
                        key={format}
                        className="px-2 py-0.5 bg-brand-lime/10 border border-brand-lime/20 text-brand-lime text-[10px] font-bold uppercase rounded-md"
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cover intro message */}
              {selectedApp.message && (
                <div className="space-y-2 border-t border-border/10 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                    Intro Message
                  </h4>
                  <p className="text-sm text-fg-muted leading-relaxed whitespace-pre-wrap">
                    {selectedApp.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
