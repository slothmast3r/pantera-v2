import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_offers_blocks_events_list_variant" AS ENUM('upcoming', 'past', 'all');
  CREATE TYPE "public"."enum__offers_v_blocks_events_list_variant" AS ENUM('upcoming', 'past', 'all');
  CREATE TABLE "offers_blocks_related_offers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Może Cię zainteresować',
  	"block_name" varchar
  );
  
  CREATE TABLE "offers_blocks_events_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"variant" "enum_offers_blocks_events_list_variant" DEFAULT 'upcoming',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "_offers_v_blocks_related_offers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Może Cię zainteresować',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_offers_v_blocks_events_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"variant" "enum__offers_v_blocks_events_list_variant" DEFAULT 'upcoming',
  	"limit" numeric DEFAULT 6,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_classes_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"color" varchar DEFAULT '#2a5298',
  	"image_id" integer
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_heading" varchar DEFAULT 'Gotowy na pierwszy krok?',
  	"cta_subheading" varchar DEFAULT 'Dołącz do setek zadowolonych klubowiczów. Pierwsze zajęcia są na nas!',
  	"cta_button_label" varchar DEFAULT 'Umów się na pierwsze zajęcia',
  	"cta_button_href" varchar DEFAULT '/kontakt',
  	"cta_background_image_id" integer,
  	"services_section_label" varchar DEFAULT 'USŁUGI DODATKOWE',
  	"services_section_title" varchar DEFAULT 'Pantera to także:',
  	"services_columns" "enum_homepage_services_columns" DEFAULT '2',
  	"pricing_section_label" varchar DEFAULT 'CENNIK',
  	"pricing_section_title" varchar DEFAULT 'Cennik dopasowany do twoich potrzeb',
  	"pricing_note" varchar DEFAULT '* Ceny mogą ulec zmianie. Skontaktuj się z nami po szczegóły.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "homepage_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_pricing" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "homepage_services" CASCADE;
  DROP TABLE "homepage_pricing" CASCADE;
  ALTER TABLE "homepage_services_cards" DROP CONSTRAINT "homepage_services_cards_parent_id_fk";
  
  ALTER TABLE "homepage_pricing_plans" DROP CONSTRAINT "homepage_pricing_plans_parent_id_fk";
  
  ALTER TABLE "classes_rels" ADD COLUMN "classes_id" integer;
  ALTER TABLE "_classes_v_rels" ADD COLUMN "classes_id" integer;
  ALTER TABLE "instructors" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "events" ADD COLUMN "time" varchar;
  ALTER TABLE "events" ADD COLUMN "cancelled" boolean DEFAULT false;
  ALTER TABLE "offers" ADD COLUMN "icon" varchar;
  ALTER TABLE "offers_rels" ADD COLUMN "offers_id" integer;
  ALTER TABLE "offers_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "_offers_v" ADD COLUMN "version_icon" varchar;
  ALTER TABLE "_offers_v_rels" ADD COLUMN "offers_id" integer;
  ALTER TABLE "_offers_v_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "offers_blocks_related_offers" ADD CONSTRAINT "offers_blocks_related_offers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_blocks_events_list" ADD CONSTRAINT "offers_blocks_events_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_blocks_related_offers" ADD CONSTRAINT "_offers_v_blocks_related_offers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_blocks_events_list" ADD CONSTRAINT "_offers_v_blocks_events_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_benefits_items" ADD CONSTRAINT "homepage_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_classes_items" ADD CONSTRAINT "homepage_classes_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_classes_items" ADD CONSTRAINT "homepage_classes_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_cta_background_image_id_media_id_fk" FOREIGN KEY ("cta_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "offers_blocks_related_offers_order_idx" ON "offers_blocks_related_offers" USING btree ("_order");
  CREATE INDEX "offers_blocks_related_offers_parent_id_idx" ON "offers_blocks_related_offers" USING btree ("_parent_id");
  CREATE INDEX "offers_blocks_related_offers_path_idx" ON "offers_blocks_related_offers" USING btree ("_path");
  CREATE INDEX "offers_blocks_events_list_order_idx" ON "offers_blocks_events_list" USING btree ("_order");
  CREATE INDEX "offers_blocks_events_list_parent_id_idx" ON "offers_blocks_events_list" USING btree ("_parent_id");
  CREATE INDEX "offers_blocks_events_list_path_idx" ON "offers_blocks_events_list" USING btree ("_path");
  CREATE INDEX "_offers_v_blocks_related_offers_order_idx" ON "_offers_v_blocks_related_offers" USING btree ("_order");
  CREATE INDEX "_offers_v_blocks_related_offers_parent_id_idx" ON "_offers_v_blocks_related_offers" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_blocks_related_offers_path_idx" ON "_offers_v_blocks_related_offers" USING btree ("_path");
  CREATE INDEX "_offers_v_blocks_events_list_order_idx" ON "_offers_v_blocks_events_list" USING btree ("_order");
  CREATE INDEX "_offers_v_blocks_events_list_parent_id_idx" ON "_offers_v_blocks_events_list" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_blocks_events_list_path_idx" ON "_offers_v_blocks_events_list" USING btree ("_path");
  CREATE INDEX "homepage_benefits_items_order_idx" ON "homepage_benefits_items" USING btree ("_order");
  CREATE INDEX "homepage_benefits_items_parent_id_idx" ON "homepage_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "homepage_classes_items_order_idx" ON "homepage_classes_items" USING btree ("_order");
  CREATE INDEX "homepage_classes_items_parent_id_idx" ON "homepage_classes_items" USING btree ("_parent_id");
  CREATE INDEX "homepage_classes_items_image_idx" ON "homepage_classes_items" USING btree ("image_id");
  CREATE INDEX "homepage_cta_cta_background_image_idx" ON "homepage" USING btree ("cta_background_image_id");
  ALTER TABLE "classes_rels" ADD CONSTRAINT "classes_rels_classes_fk" FOREIGN KEY ("classes_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_classes_v_rels" ADD CONSTRAINT "_classes_v_rels_classes_fk" FOREIGN KEY ("classes_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_rels" ADD CONSTRAINT "offers_rels_offers_fk" FOREIGN KEY ("offers_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_rels" ADD CONSTRAINT "offers_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_rels" ADD CONSTRAINT "_offers_v_rels_offers_fk" FOREIGN KEY ("offers_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_rels" ADD CONSTRAINT "_offers_v_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_services_cards" ADD CONSTRAINT "homepage_services_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_pricing_plans" ADD CONSTRAINT "homepage_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "classes_rels_classes_id_idx" ON "classes_rels" USING btree ("classes_id");
  CREATE INDEX "_classes_v_rels_classes_id_idx" ON "_classes_v_rels" USING btree ("classes_id");
  CREATE INDEX "offers_rels_offers_id_idx" ON "offers_rels" USING btree ("offers_id");
  CREATE INDEX "offers_rels_events_id_idx" ON "offers_rels" USING btree ("events_id");
  CREATE INDEX "_offers_v_rels_offers_id_idx" ON "_offers_v_rels" USING btree ("offers_id");
  CREATE INDEX "_offers_v_rels_events_id_idx" ON "_offers_v_rels" USING btree ("events_id");
  ALTER TABLE "events" DROP COLUMN "status";
  DROP TYPE "public"."enum_events_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_events_status" AS ENUM('upcoming', 'ongoing', 'past', 'cancelled');
  CREATE TABLE "homepage_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_label" varchar DEFAULT 'USŁUGI DODATKOWE',
  	"section_title" varchar DEFAULT 'Pantera to także:',
  	"columns" "enum_homepage_services_columns" DEFAULT '2',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_pricing" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_label" varchar DEFAULT 'CENNIK',
  	"section_title" varchar DEFAULT 'Cennik dopasowany do twoich potrzeb',
  	"note" varchar DEFAULT '* Ceny mogą ulec zmianie. Skontaktuj się z nami po szczegóły.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "offers_blocks_related_offers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offers_blocks_events_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_offers_v_blocks_related_offers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_offers_v_blocks_events_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_benefits_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_classes_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "offers_blocks_related_offers" CASCADE;
  DROP TABLE "offers_blocks_events_list" CASCADE;
  DROP TABLE "_offers_v_blocks_related_offers" CASCADE;
  DROP TABLE "_offers_v_blocks_events_list" CASCADE;
  DROP TABLE "homepage_benefits_items" CASCADE;
  DROP TABLE "homepage_classes_items" CASCADE;
  DROP TABLE "homepage" CASCADE;
  ALTER TABLE "classes_rels" DROP CONSTRAINT "classes_rels_classes_fk";
  
  ALTER TABLE "_classes_v_rels" DROP CONSTRAINT "_classes_v_rels_classes_fk";
  
  ALTER TABLE "offers_rels" DROP CONSTRAINT "offers_rels_offers_fk";
  
  ALTER TABLE "offers_rels" DROP CONSTRAINT "offers_rels_events_fk";
  
  ALTER TABLE "_offers_v_rels" DROP CONSTRAINT "_offers_v_rels_offers_fk";
  
  ALTER TABLE "_offers_v_rels" DROP CONSTRAINT "_offers_v_rels_events_fk";
  
  ALTER TABLE "homepage_services_cards" DROP CONSTRAINT "homepage_services_cards_parent_id_fk";
  
  ALTER TABLE "homepage_pricing_plans" DROP CONSTRAINT "homepage_pricing_plans_parent_id_fk";
  
  DROP INDEX "classes_rels_classes_id_idx";
  DROP INDEX "_classes_v_rels_classes_id_idx";
  DROP INDEX "offers_rels_offers_id_idx";
  DROP INDEX "offers_rels_events_id_idx";
  DROP INDEX "_offers_v_rels_offers_id_idx";
  DROP INDEX "_offers_v_rels_events_id_idx";
  ALTER TABLE "events" ADD COLUMN "status" "enum_events_status" DEFAULT 'upcoming';
  ALTER TABLE "homepage_services_cards" ADD CONSTRAINT "homepage_services_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_pricing_plans" ADD CONSTRAINT "homepage_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "classes_rels" DROP COLUMN "classes_id";
  ALTER TABLE "_classes_v_rels" DROP COLUMN "classes_id";
  ALTER TABLE "instructors" DROP COLUMN "excerpt";
  ALTER TABLE "events" DROP COLUMN "time";
  ALTER TABLE "events" DROP COLUMN "cancelled";
  ALTER TABLE "offers" DROP COLUMN "icon";
  ALTER TABLE "offers_rels" DROP COLUMN "offers_id";
  ALTER TABLE "offers_rels" DROP COLUMN "events_id";
  ALTER TABLE "_offers_v" DROP COLUMN "version_icon";
  ALTER TABLE "_offers_v_rels" DROP COLUMN "offers_id";
  ALTER TABLE "_offers_v_rels" DROP COLUMN "events_id";
  DROP TYPE "public"."enum_offers_blocks_events_list_variant";
  DROP TYPE "public"."enum__offers_v_blocks_events_list_variant";`)
}
