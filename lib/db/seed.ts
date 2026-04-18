import "server-only";

import { adminDb } from "./firebase-admin";

const SEED_CASES = [
  {
    slug: "wolf",
    name: "Wolf",
    breed: "Mixed breed",
    age: "4 years old",
    summary:
      "The dog who started it all. Given a 0–10% chance of survival, Wolf's fight revealed the need for an access to care lifeline.",
    heroImage: "/assets/story/wolf-hero-1.jpg",
    gallery: ["/assets/story/wolf-hero-2.jpg"],
    goalUsd: 13000,
    raisedUsd: 13000,
    status: "completed",
    featured: true,
    donationLink: "",
    veterinaryPartner: "Emergency specialty hospital partner (placeholder)",
    updates: [
      {
        date: "2025-01-01",
        title: "Wolf's story inspires The Wolf Project",
        body: "Wolf survived emergency surgery and is now thriving. His journey became the founding story of The Wolf Project — an access to care lifeline for families facing the same impossible decisions.",
      },
      {
        date: "2026-04-18",
        title: "Founding story archived for transparency",
        body: "Wolf's case remains the benchmark for how The Wolf Project talks about access to care, urgency, and what it takes to stand behind a yes.",
      },
    ],
    story: "",
    createdAt: "2025-01-01",
  },
  {
    slug: "luna",
    name: "Luna",
    breed: "Labrador retriever mix",
    age: "6 years old",
    summary:
      "Luna needs urgent abdominal surgery after an obstruction was discovered. Her family moved fast, but the estimate landed before treatment could begin.",
    heroImage: "/assets/story/wolf-hero-2.jpg",
    gallery: ["/assets/story/wolf-hero-1.jpg"],
    goalUsd: 6500,
    raisedUsd: 2750,
    status: "active",
    featured: true,
    donationLink: "",
    veterinaryPartner: "Gulf Coast Emergency Veterinary Hospital",
    updates: [
      {
        date: "2026-04-14",
        title: "Imaging confirmed a blockage",
        body: "Luna was admitted after repeated vomiting and escalating abdominal pain. Imaging confirmed a blockage and the team recommended surgery.",
      },
      {
        date: "2026-04-17",
        title: "The first half of Luna's goal is in reach",
        body: "Supporters helped Luna's family clear the first major deposit. The next stretch will cover monitoring, medications, and follow-up care.",
      },
    ],
    story: "",
    createdAt: "2026-04-14",
  },
  {
    slug: "juniper",
    name: "Juniper",
    breed: "Border collie mix",
    age: "5 years old",
    summary:
      "Juniper is in treatment after emergency surgery. She is stable, but her case still needs support for hospitalization and discharge care.",
    heroImage: "/assets/story/wolf-hero-2.jpg",
    gallery: ["/assets/story/wolf-hero-1.jpg"],
    goalUsd: 9200,
    raisedUsd: 6100,
    status: "in-treatment",
    featured: true,
    donationLink: "",
    veterinaryPartner: "Atlantic Veterinary Referral Center",
    updates: [
      {
        date: "2026-04-08",
        title: "Juniper went into surgery overnight",
        body: "The hospital moved forward after the first portion of the deposit was secured and the family approved the procedure.",
      },
      {
        date: "2026-04-18",
        title: "Recovery is underway, but support is still needed",
        body: "Juniper is stable and responding well. The remaining goal will help cover hospitalization, medications, and her transition back home.",
      },
    ],
    story: "",
    createdAt: "2026-04-08",
  },
  {
    slug: "scout",
    name: "Scout",
    breed: "German shepherd mix",
    age: "3 years old",
    summary:
      "Scout's emergency hospitalization is fully funded, and the focus has shifted to recovery, medications, and getting him home safely.",
    heroImage: "/assets/story/wolf-hero-1.jpg",
    gallery: [],
    goalUsd: 4800,
    raisedUsd: 4800,
    status: "funded",
    featured: false,
    donationLink: "",
    veterinaryPartner: "Riverbend Specialty and Emergency",
    updates: [
      {
        date: "2026-04-10",
        title: "Scout was admitted for severe dehydration and GI distress",
        body: "The care team moved quickly to stabilize Scout and rule out surgical complications.",
      },
      {
        date: "2026-04-16",
        title: "Scout's goal is fully funded",
        body: "The initial hospitalization and immediate follow-up are covered. The next phase is monitoring his recovery and discharge plan.",
      },
    ],
    story: "",
    createdAt: "2026-04-10",
  },
  {
    slug: "remy",
    name: "Remy",
    breed: "Pit bull terrier mix",
    age: "8 years old",
    summary:
      "Remy's case is remembered here with care and transparency. Not every case can end the way families hope, and that truth matters too.",
    heroImage: "",
    gallery: [],
    goalUsd: 3000,
    raisedUsd: 1200,
    status: "memorial",
    featured: false,
    donationLink: "",
    veterinaryPartner: "Community Emergency Animal Hospital",
    updates: [
      {
        date: "2026-03-28",
        title: "Remy was admitted in critical condition",
        body: "Remy's family moved quickly and the care team evaluated every available option, but the medical reality was severe from the start.",
      },
      {
        date: "2026-03-29",
        title: "Remy is remembered with honesty and love",
        body: "This memorial entry exists to reflect the full emotional truth of the work. Transparency includes grief, not just the wins.",
      },
    ],
    story: "",
    createdAt: "2026-03-28",
  },
];

const SEED_POSTS = [
  {
    slug: "how-one-dog-changed-everything",
    title: "How One Dog Changed Everything",
    excerpt:
      "Wolf was given a 0–10% chance of survival. His fight revealed a crisis that affects millions — and became the spark for The Wolf Project.",
    category: "community-updates",
    featuredImage: null,
    author: "The Wolf Project",
    publishedAt: "2026-04-18",
    featured: true,
    body: "Wolf was given a 0–10% chance of survival. His fight revealed a crisis that affects millions of pet families.\n\nThis is the story of how one emergency changed everything.",
  },
  {
    slug: "what-is-emergency-veterinary-care",
    title: "What Is Emergency Veterinary Care — And Who Can't Afford It?",
    excerpt:
      "Emergency vet visits average $1,000–$5,000 and many families face impossible choices. Here's what the access-to-care crisis looks like.",
    category: "emergency-care",
    featuredImage: null,
    author: "The Wolf Project",
    publishedAt: "2026-04-15",
    featured: false,
    body: "Emergency vet visits average $1,000–$5,000. For many families, that number is the difference between treatment and goodbye.",
  },
  {
    slug: "5-signs-your-dog-needs-emergency-care",
    title: "5 Signs Your Dog Needs Emergency Veterinary Care",
    excerpt:
      "Not every symptom is an emergency — but some are. Learn which warning signs mean you should get to a vet immediately.",
    category: "vet-resources",
    featuredImage: null,
    author: "The Wolf Project",
    publishedAt: "2026-04-10",
    featured: false,
    body: "Not every symptom is an emergency — but some are. Here are five signs you should get to a vet immediately.",
  },
  {
    slug: "why-case-updates-matter-to-supporters",
    title: "Why Case Updates Matter to Supporters",
    excerpt:
      "Case updates build trust, reduce confusion, and help supporters understand what progress really looks like in emergency care.",
    category: "case-updates",
    featuredImage: null,
    author: "The Wolf Project",
    publishedAt: "2026-04-16",
    featured: false,
    body: "Case updates build trust, reduce confusion, and help supporters understand what progress really looks like.",
  },
  {
    slug: "recovery-after-an-emergency-vet-visit",
    title: "Recovery After an Emergency Vet Visit",
    excerpt:
      "Emergency care doesn't end at discharge. Here's how families can prepare for the first week home after a crisis.",
    category: "preventative-care",
    featuredImage: null,
    author: "The Wolf Project",
    publishedAt: "2026-04-17",
    featured: false,
    body: "Emergency care doesn't end at discharge. Here's how families can prepare for the first week home.",
  },
];

const SEED_SINGLETONS: Record<string, Record<string, unknown>> = {
  donationProgress: {
    goalUsd: 40000,
    raisedUsd: 28650,
    lastUpdated: "2026-04-18",
    source: "manual",
    apiProvider: "",
    apiKey: "",
  },
  applicationConfig: {
    accepting: false,
    message:
      "The Access to Care Lifeline is not yet accepting applications. We are actively building the funding, structure, and partnerships needed to support emergency cases responsibly. Sign up below to be notified when applications open.",
    formUrl: "",
  },
  siteSettings: {
    phaseLabel: "Phase 1 — Building the Lifeline",
    operationalState:
      "The Access to Care Lifeline is not yet fully operational. We are building responsibly so that when we say yes, we can fully stand behind it.",
    summary:
      "We are actively building the funding, structure, and partnerships needed to support emergency cases responsibly and sustainably.",
    fundAllocation: [
      {
        category: "Emergency Veterinary Care",
        description:
          "Diagnostics, procedures, surgery, hospitalization, medications, and follow-up care for approved cases.",
        percentage: 85,
      },
      {
        category: "Operations & Partnerships",
        description:
          "Veterinary network development, case management systems, and operational infrastructure.",
        percentage: 10,
      },
      {
        category: "Education & Outreach",
        description:
          "Community resources, prevention education, and awareness campaigns.",
        percentage: 5,
      },
    ],
  },
};

export async function seedAll() {
  const batch = adminDb.batch();

  // Delete existing docs
  const [caseSnap, postSnap, singleSnap] = await Promise.all([
    adminDb.collection("cases").get(),
    adminDb.collection("posts").get(),
    adminDb.collection("singletons").get(),
  ]);
  for (const doc of [...caseSnap.docs, ...postSnap.docs, ...singleSnap.docs]) {
    batch.delete(doc.ref);
  }

  // Seed cases
  for (const c of SEED_CASES) {
    const { slug, ...data } = c;
    batch.set(adminDb.collection("cases").doc(slug), data);
  }

  // Seed posts
  for (const p of SEED_POSTS) {
    const { slug, ...data } = p;
    batch.set(adminDb.collection("posts").doc(slug), data);
  }

  // Seed singletons
  for (const [key, data] of Object.entries(SEED_SINGLETONS)) {
    batch.set(adminDb.collection("singletons").doc(key), data);
  }

  await batch.commit();
}
