/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_classes_logistics_intensity" AS ENUM('low', 'medium', 'medium-high', 'high');
  CREATE TYPE "public"."enum_offers_category" AS ENUM('company', 'schools', 'workshop', 'birthday', 'other');
  CREATE TYPE "public"."enum_schedule_entries_day" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
  ALTER TYPE "public"."enum_classes_type" ADD VALUE 'power-training' BEFORE 'other';
  CREATE TABLE "offers_offerings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "offers_formats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "offers_for_who_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "offers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_offers_category",
  	"cover_image_id" integer,
  	"heading_title" varchar NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_background_image_id" integer,
  	"intro_title" varchar,
  	"intro_content" varchar,
  	"for_who_title" varchar,
  	"for_who_content" varchar,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"contact_note" varchar,
  	"cta_heading" varchar,
  	"cta_description" varchar,
  	"cta_button_text" varchar,
  	"cta_button_link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "schedule_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"class_id" integer NOT NULL,
  	"day" "enum_schedule_entries_day" NOT NULL,
  	"start_time" varchar NOT NULL,
  	"end_time" varchar NOT NULL,
  	"age_range" varchar,
  	"notes" varchar
  );
  
  CREATE TABLE "schedule" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Grafik Zajęć',
  	"subtitle" varchar DEFAULT 'Sprawdź aktualne godziny zajęć i znajdź termin dla siebie.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "classes" ADD COLUMN "logistics_intensity" "enum_classes_logistics_intensity";
  ALTER TABLE "classes" ADD COLUMN "logistics_what_to_bring" varchar;
  ALTER TABLE "instructors" ADD COLUMN "slug" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "offers_id" integer;
  ALTER TABLE "offers_offerings" ADD CONSTRAINT "offers_offerings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_formats" ADD CONSTRAINT "offers_formats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_for_who_bullets" ADD CONSTRAINT "offers_for_who_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers" ADD CONSTRAINT "offers_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offers" ADD CONSTRAINT "offers_heading_background_image_id_media_id_fk" FOREIGN KEY ("heading_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "schedule_entries" ADD CONSTRAINT "schedule_entries_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "schedule_entries" ADD CONSTRAINT "schedule_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."schedule"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "offers_offerings_order_idx" ON "offers_offerings" USING btree ("_order");
  CREATE INDEX "offers_offerings_parent_id_idx" ON "offers_offerings" USING btree ("_parent_id");
  CREATE INDEX "offers_formats_order_idx" ON "offers_formats" USING btree ("_order");
  CREATE INDEX "offers_formats_parent_id_idx" ON "offers_formats" USING btree ("_parent_id");
  CREATE INDEX "offers_for_who_bullets_order_idx" ON "offers_for_who_bullets" USING btree ("_order");
  CREATE INDEX "offers_for_who_bullets_parent_id_idx" ON "offers_for_who_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "offers_slug_idx" ON "offers" USING btree ("slug");
  CREATE INDEX "offers_cover_image_idx" ON "offers" USING btree ("cover_image_id");
  CREATE INDEX "offers_heading_heading_background_image_idx" ON "offers" USING btree ("heading_background_image_id");
  CREATE INDEX "offers_updated_at_idx" ON "offers" USING btree ("updated_at");
  CREATE INDEX "offers_created_at_idx" ON "offers" USING btree ("created_at");
  CREATE INDEX "schedule_entries_order_idx" ON "schedule_entries" USING btree ("_order");
  CREATE INDEX "schedule_entries_parent_id_idx" ON "schedule_entries" USING btree ("_parent_id");
  CREATE INDEX "schedule_entries_class_idx" ON "schedule_entries" USING btree ("class_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_offers_fk" FOREIGN KEY ("offers_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "instructors_slug_idx" ON "instructors" USING btree ("slug");
  CREATE INDEX "payload_locked_documents_rels_offers_id_idx" ON "payload_locked_documents_rels" USING btree ("offers_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "offers_offerings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offers_formats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offers_for_who_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "schedule_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "schedule" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "offers_offerings" CASCADE;
  DROP TABLE "offers_formats" CASCADE;
  DROP TABLE "offers_for_who_bullets" CASCADE;
  DROP TABLE "offers" CASCADE;
  DROP TABLE "schedule_entries" CASCADE;
  DROP TABLE "schedule" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_offers_fk";
  
  ALTER TABLE "classes" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_classes_type";
  CREATE TYPE "public"."enum_classes_type" AS ENUM('krav-maga', 'karate', 'tai-chi', 'individual', 'asg', 'other');
  ALTER TABLE "classes" ALTER COLUMN "type" SET DATA TYPE "public"."enum_classes_type" USING "type"::"public"."enum_classes_type";
  DROP INDEX "instructors_slug_idx";
  DROP INDEX "payload_locked_documents_rels_offers_id_idx";
  ALTER TABLE "classes" DROP COLUMN "logistics_intensity";
  ALTER TABLE "classes" DROP COLUMN "logistics_what_to_bring";
  ALTER TABLE "instructors" DROP COLUMN "slug";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "offers_id";
  DROP TYPE "public"."enum_classes_logistics_intensity";
  DROP TYPE "public"."enum_offers_category";
  DROP TYPE "public"."enum_schedule_entries_day";`)
}
