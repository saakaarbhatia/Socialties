/**
 * Shared enums mirroring Prisma schema — used on the frontend
 * so we don't need @prisma/client's generated types in the Next.js bundle.
 */

export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "REJECTED";
export const LeadStatus = {
  NEW: "NEW" as LeadStatus,
  CONTACTED: "CONTACTED" as LeadStatus,
  QUALIFIED: "QUALIFIED" as LeadStatus,
  CONVERTED: "CONVERTED" as LeadStatus,
  REJECTED: "REJECTED" as LeadStatus,
};

export type ApplicationStatus = "PENDING" | "REVIEWING" | "APPROVED" | "REJECTED";
export const ApplicationStatus = {
  PENDING: "PENDING" as ApplicationStatus,
  REVIEWING: "REVIEWING" as ApplicationStatus,
  APPROVED: "APPROVED" as ApplicationStatus,
  REJECTED: "REJECTED" as ApplicationStatus,
};

export type CampaignType = "INFLUENCER" | "DIGITAL_ADS" | "CONTENT" | "PHOTOGRAPHY" | "WEB_DEV" | "APP_DEV";
export const CampaignType = {
  INFLUENCER: "INFLUENCER" as CampaignType,
  DIGITAL_ADS: "DIGITAL_ADS" as CampaignType,
  CONTENT: "CONTENT" as CampaignType,
  PHOTOGRAPHY: "PHOTOGRAPHY" as CampaignType,
  WEB_DEV: "WEB_DEV" as CampaignType,
  APP_DEV: "APP_DEV" as CampaignType,
};

export type CampaignStatus = "DRAFT" | "LIVE" | "COMPLETED" | "ARCHIVED";
export const CampaignStatus = {
  DRAFT: "DRAFT" as CampaignStatus,
  LIVE: "LIVE" as CampaignStatus,
  COMPLETED: "COMPLETED" as CampaignStatus,
  ARCHIVED: "ARCHIVED" as CampaignStatus,
};
