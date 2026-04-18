export type AssetCategory = "brand" | "story" | "merch" | "trust";

export interface AssetRecord {
  id: string;
  localSrc: string;
  sourceUrl: string;
  alt: string;
  category: AssetCategory;
  placeholderAllowed: boolean;
}

export interface CampaignStatus {
  phaseLabel: string;
  launchGoalUsd: number;
  operationalState: string;
  acceptingApplications: boolean;
  summary: string;
}

export type SupportKind = "donate" | "monthly" | "learn" | "shop";

export interface SupportOption {
  label: string;
  amount?: string;
  description: string;
  href: string;
  external: boolean;
  kind: SupportKind;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface HighlightStat {
  label: string;
  value: string;
  note: string;
}

export interface Pathway {
  title: string;
  description: string;
  href: string;
  eyebrow: string;
}

export interface StoryChapter {
  title: string;
  lead: string;
  paragraphs: string[];
  assetId: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface ConditionCard {
  title: string;
  description: string;
  outcome: string;
  assetId?: string;
}

export interface TrustFact {
  title: string;
  body: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface MerchImage {
  id: string;
  src: string;
  alt: string;
  color: string;
  label: string;
}

export interface MerchProduct {
  slug: string;
  name: string;
  price: string;
  images: MerchImage[];
  colors: string[];
  sizes: string[];
  story: string[];
  care: string[];
  liveHref: string;
  collectionHref: string;
}

export type MilestoneStatus = "current" | "next" | "future";

export interface Milestone {
  title: string;
  status: MilestoneStatus;
  description: string;
  evidenceLabel: string;
}
