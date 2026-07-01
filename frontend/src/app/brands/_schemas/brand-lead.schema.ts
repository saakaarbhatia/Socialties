import { z } from "zod";

export const brandLeadSchema = z.object({
  companyName: z.string().min(2, "Company Name is required"),
  website: z.string().url("Please enter a valid website URL").or(z.literal("")),
  contactPerson: z.string().min(2, "Contact Person name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  campaignBudget: z.string().min(1, "Campaign Budget range is required"),
  campaignObjectives: z.array(z.string()).min(1, "Select at least one campaign objective"),
  targetAudience: z.string().optional(),
  platforms: z.array(z.string()).min(1, "Select at least one target platform"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  timeline: z.string().optional(),
  fileUrl: z.string().optional(),
});

export type BrandLeadInput = z.infer<typeof brandLeadSchema>;
