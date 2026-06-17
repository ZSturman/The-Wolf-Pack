import type { DogCase } from "@/types/site";

export const reviewCases: DogCase[] = [
  {
    slug: "azu",
    name: "Azu",
    breed: "Husky mix",
    age: "5 years old",
    summary:
      "Azu needs urgent surgery after imaging showed an intestinal obstruction. His family can contribute, but the deposit has to be met before care can move forward.",
    heroImage: "/assets/story/wolf-hero-2.jpg",
    gallery: ["/assets/story/wolf-hero-1.jpg", "/assets/story/wolf-hero-2.jpg"],
    goalUsd: 7800,
    raisedUsd: 4625,
    status: "active",
    featured: true,
    featuredPriority: 1,
    donationLink: "",
    veterinaryPartner: "Gulf Coast Emergency Veterinary Hospital",
    urgencyLabel: "Deposit needed today",
    condition: "Suspected intestinal obstruction",
    treatmentNeed:
      "Emergency exploratory surgery, overnight hospitalization, pain control, IV fluids, and post-op monitoring.",
    fundingNeed:
      "The hospital requires a treatment deposit before surgery begins. Azu's family has committed what they can, and this case fund covers the remaining access-to-care gap.",
    ownerCommitment:
      "Azu's family is contributing a co-pay, approving follow-up communication, and sharing updates so donors can follow the full treatment journey.",
    approvalCriteriaNote:
      "Placeholder review: treatable emergency, urgent timeline, veterinary recommendation documented, family participation confirmed, and direct hospital payment path available.",
    donorImpactNote:
      "Gifts to Azu's case help unlock surgery, hospitalization, medications, and discharge support so he can return home.",
    medicalNotes: [
      {
        date: "2026-06-12",
        title: "Imaging supports obstruction concern",
        body: "Radiographs showed a pattern consistent with a blockage. The care team recommended surgery if symptoms did not resolve quickly.",
      },
      {
        date: "2026-06-13",
        title: "Surgery estimate issued",
        body: "The treatment estimate includes anesthesia, exploratory surgery, hospitalization, medications, and recheck planning.",
      },
    ],
    timeline: [
      {
        date: "2026-06-12",
        title: "Azu arrived at the ER",
        body: "Repeated vomiting and abdominal pain prompted an emergency visit.",
      },
      {
        date: "2026-06-14",
        title: "Fundraising push begins",
        body: "Wednesday social and Friday community updates will keep donors close to Azu's progress.",
      },
    ],
    updates: [
      {
        date: "2026-06-14",
        title: "Azu is stable, but the clock is moving",
        body: "He is receiving supportive care while the team prepares for the next step. The remaining gap is focused on the surgery deposit.",
      },
      {
        date: "2026-06-15",
        title: "Family co-pay confirmed",
        body: "Azu's family has committed their portion and is staying in close contact with the hospital and The Wolf Project team.",
      },
    ],
    story:
      "Azu is the kind of case The Wolf Project was built for: treatment exists, a veterinary team is ready, and the barrier is the upfront cost of getting care started.\n\nHis family moved quickly when symptoms escalated. They are participating in the plan, contributing what they can, and staying connected through updates so supporters can follow the story with clarity.",
    createdAt: "2026-06-12",
  },
  {
    slug: "koda",
    name: "Koda",
    breed: "Labrador retriever mix",
    age: "7 years old",
    summary:
      "Koda is hospitalized for a urinary blockage. He has been stabilized, but the next stretch covers catheter care, monitoring, and discharge medications.",
    heroImage: "/assets/story/wolf-hero-1.jpg",
    gallery: ["/assets/story/wolf-hero-2.jpg"],
    goalUsd: 5200,
    raisedUsd: 3180,
    status: "in-treatment",
    featured: true,
    featuredPriority: 2,
    donationLink: "",
    veterinaryPartner: "Riverbend Specialty and Emergency",
    urgencyLabel: "In treatment now",
    condition: "Urinary obstruction",
    treatmentNeed:
      "Emergency stabilization, catheter care, hospitalization, lab monitoring, pain control, and discharge medications.",
    fundingNeed:
      "Koda's immediate deposit was partially covered. Remaining support helps keep monitoring in place through discharge.",
    ownerCommitment:
      "Koda's owner is contributing to the bill and coordinating follow-up care to reduce the chance of recurrence.",
    approvalCriteriaNote:
      "Placeholder review: time-sensitive emergency, treatment underway, hospital estimate available, and owner co-pay confirmed.",
    donorImpactNote:
      "Support helps Koda stay hospitalized long enough to recover safely instead of leaving care too soon.",
    medicalNotes: [
      {
        date: "2026-06-10",
        title: "Blockage relieved",
        body: "The emergency team placed a catheter and began monitoring kidney values and urine output.",
      },
    ],
    timeline: [
      {
        date: "2026-06-10",
        title: "Koda admitted",
        body: "He arrived painful and unable to urinate, a life-threatening emergency.",
      },
    ],
    updates: [
      {
        date: "2026-06-11",
        title: "Koda made it through the first night",
        body: "He is brighter today, but the care team wants another night of monitoring before discharge.",
      },
    ],
    story:
      "Koda's emergency moved fast. A urinary blockage can become fatal quickly, and his family needed help bridging the cost of continued hospitalization after the first deposit.",
    createdAt: "2026-06-10",
  },
  {
    slug: "keelo",
    name: "Keelo",
    breed: "German shepherd mix",
    age: "4 years old",
    summary:
      "Keelo's emergency surgery is complete, and he is home recovering. His story shows what donor support makes possible when access arrives in time.",
    heroImage: "/assets/story/wolf-hero-1.jpg",
    gallery: ["/assets/story/wolf-hero-2.jpg"],
    goalUsd: 6400,
    raisedUsd: 6400,
    status: "completed",
    featured: false,
    featuredPriority: 3,
    donationLink: "",
    veterinaryPartner: "Atlantic Veterinary Referral Center",
    urgencyLabel: "Home recovering",
    condition: "Foreign body surgery",
    treatmentNeed: "Emergency surgery, hospitalization, medication, and recheck support.",
    fundingNeed:
      "Keelo's case is fully funded. Additional gifts support the Emergency LIFELINE Fund for the next urgent deposit.",
    ownerCommitment:
      "Keelo's family contributed to the estimate, shared recovery updates, and completed follow-up care.",
    approvalCriteriaNote:
      "Placeholder review: treatable emergency, clear surgical recommendation, owner participation, and documented treatment outcome.",
    donorImpactNote:
      "Donors helped turn a high upfront estimate into surgery, recovery, and a safe return home.",
    medicalNotes: [
      {
        date: "2026-05-20",
        title: "Surgery completed",
        body: "The obstruction was removed and Keelo began monitored recovery.",
      },
    ],
    timeline: [
      {
        date: "2026-05-19",
        title: "Emergency intake",
        body: "Keelo was admitted after repeated vomiting and lethargy.",
      },
      {
        date: "2026-05-27",
        title: "Home update",
        body: "Keelo was resting at home and returning to his normal routine.",
      },
    ],
    updates: [
      {
        date: "2026-05-27",
        title: "Keelo is home",
        body: "His family sent the update everyone hoped for: he is eating, resting, and healing with the people who love him.",
      },
    ],
    story:
      "Keelo's success story is the donor journey in miniature: a treatable emergency, a family doing everything they could, a hospital ready to act, and a community that helped close the gap in time.",
    createdAt: "2026-05-19",
  },
];
