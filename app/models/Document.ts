import getDB from "app/db";
import {
  document as documentTable,
  documentVersion as documentVersionTable,
} from "app/schema";
import { eq, desc } from "drizzle-orm";

export default class Document {
  public id: number;
  public name?: string;

  private constructor(id: number, name?: string) {
    this.id = id;
    this.name = name;
  }

  static async createDocument(name: string): Promise<Document> {
    const db = getDB();

    const documents = await db
      .insert(documentTable)
      .values({ name })
      .returning();

    return new Document(documents[0].id, name);
  }

  async createVersion(markdown: string): Promise<void> {
    const db = getDB();

    await db
      .insert(documentVersionTable)
      .values({ documentID: this.id, markdown })
      .returning();
  }

  async getLatestVersion(): Promise<string | null> {
    const db = getDB();

    const versions = await db
      .select({ markdown: documentVersionTable.markdown })
      .from(documentVersionTable)
      .where(eq(documentVersionTable.documentID, this.id))
      .orderBy(desc(documentVersionTable.timestamp))
      .limit(1);

    return versions.length === 1 ? (versions[0].markdown as string) : null;
  }

  static async getAllDocuments(): Promise<Document[]> {
    const db = getDB();

    const documents = await db.select().from(documentTable);

    return documents.map((doc) => new Document(doc.id, doc.name));
  }
}
