import "server-only";

import { adminDb } from "./firebase-admin";
import type { DogCase } from "@/types/site";

const COLLECTION = "cases";

export async function getCases(): Promise<DogCase[]> {
  const snapshot = await adminDb.collection(COLLECTION).get();
  return snapshot.docs.map((doc) => ({ slug: doc.id, ...doc.data() }) as DogCase);
}

export async function getCase(slug: string): Promise<DogCase | null> {
  const doc = await adminDb.collection(COLLECTION).doc(slug).get();
  if (!doc.exists) return null;
  return { slug: doc.id, ...doc.data() } as DogCase;
}

export async function createCase(
  slug: string,
  data: Omit<DogCase, "slug">,
): Promise<void> {
  await adminDb.collection(COLLECTION).doc(slug).set(data);
}

export async function updateCase(
  slug: string,
  data: Partial<Omit<DogCase, "slug">>,
): Promise<void> {
  await adminDb.collection(COLLECTION).doc(slug).update(data);
}

export async function deleteCase(slug: string): Promise<void> {
  await adminDb.collection(COLLECTION).doc(slug).delete();
}
