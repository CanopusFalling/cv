"use server";

import { authGuard } from "app/(auth)/auth";

import Document from "app/models/Document";

export async function getDocumentNames() {
  authGuard();
}

export async function getDocumentMarkdown(id: number) {
  authGuard();
}
