/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "contact_info" (
      "id" serial PRIMARY KEY NOT NULL,
      "address" varchar,
      "address_link" varchar,
      "phone" varchar,
      "email" varchar,
      "hours" varchar,
      "map_embed_url" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    DROP TABLE IF EXISTS "footer_contact_items";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "contact_info";
  `)
}
