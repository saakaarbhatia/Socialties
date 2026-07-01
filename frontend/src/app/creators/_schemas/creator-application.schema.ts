import { z } from "zod";

export const creatorApplicationSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  instagramUrl: z.string().url("Please enter a valid Instagram profile URL").or(z.literal("")),
  youtubeUrl: z.string().url("Please enter a valid YouTube channel URL").or(z.literal("")),
  followers: z.coerce.number().min(0, "Followers count must be positive").optional(),
  category: z.string().min(1, "Please select a content category"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  city: z.string().min(2, "City is required"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  contentTypes: z.array(z.string()).min(1, "Select at least one content format"),
  engagementRate: z.coerce.number().min(0).max(100).optional(),
  averageViews: z.coerce.number().min(0).optional(),
  message: z.string().optional(),
  mediaKitUrl: z.string().optional(),
  profilePhotoUrl: z.string().optional(),
});

export type CreatorApplicationInput = z.infer<typeof creatorApplicationSchema>;
