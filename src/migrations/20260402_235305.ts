/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_contact_items_icon" AS ENUM('location_on', 'phone', 'mail', 'schedule', 'language', 'map', 'chat', 'fax', 'other');
  CREATE TYPE "public"."enum_homepage_services_columns" AS ENUM('2', '3', '4');
  ALTER TYPE "public"."enum_footer_social_links_platform" ADD VALUE 'linkedin';
  ALTER TYPE "public"."enum_footer_social_links_platform" ADD VALUE 'twitter';
  ALTER TYPE "public"."enum_footer_social_links_platform" ADD VALUE 'snapchat';
  ALTER TYPE "public"."enum_footer_social_links_platform" ADD VALUE 'pinterest';
  ALTER TYPE "public"."enum_footer_social_links_platform" ADD VALUE 'whatsapp';
  ALTER TYPE "public"."enum_footer_social_links_platform" ADD VALUE 'telegram';
  ALTER TYPE "public"."enum_footer_social_links_platform" ADD VALUE 'other';
  CREATE TABLE "footer_contact_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_footer_contact_items_icon" NOT NULL,
  	"custom_icon" varchar,
  	"label" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "homepage_services_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"cta_text" varchar DEFAULT 'Sprawdź ofertę',
  	"cta_url" varchar NOT NULL,
  	"color" varchar DEFAULT '#2a5298',
  	"image_id" integer
  );
  
  CREATE TABLE "homepage_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_label" varchar DEFAULT 'USŁUGI DODATKOWE',
  	"section_title" varchar DEFAULT 'Pantera to także:',
  	"columns" "enum_homepage_services_columns" DEFAULT '2',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"period" varchar,
  	"cta_text" varchar DEFAULT 'Zapisz się',
  	"cta_url" varchar DEFAULT '/kontakt',
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "homepage_pricing" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_label" varchar DEFAULT 'CENNIK',
  	"section_title" varchar DEFAULT 'Cennik dopasowany do twoich potrzeb',
  	"note" varchar DEFAULT '* Ceny mogą ulec zmianie. Skontaktuj się z nami po szczegóły.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "footer_social_links" ADD COLUMN "custom_icon" varchar;
  ALTER TABLE "footer_social_links" ADD COLUMN "label" varchar;
  ALTER TABLE "footer_contact_items" ADD CONSTRAINT "footer_contact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_services_cards" ADD CONSTRAINT "homepage_services_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_services_cards" ADD CONSTRAINT "homepage_services_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_pricing_plans_features" ADD CONSTRAINT "homepage_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_pricing_plans" ADD CONSTRAINT "homepage_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_pricing"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_contact_items_order_idx" ON "footer_contact_items" USING btree ("_order");
  CREATE INDEX "footer_contact_items_parent_id_idx" ON "footer_contact_items" USING btree ("_parent_id");
  CREATE INDEX "homepage_services_cards_order_idx" ON "homepage_services_cards" USING btree ("_order");
  CREATE INDEX "homepage_services_cards_parent_id_idx" ON "homepage_services_cards" USING btree ("_parent_id");
  CREATE INDEX "homepage_services_cards_image_idx" ON "homepage_services_cards" USING btree ("image_id");
  CREATE INDEX "homepage_pricing_plans_features_order_idx" ON "homepage_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "homepage_pricing_plans_features_parent_id_idx" ON "homepage_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "homepage_pricing_plans_order_idx" ON "homepage_pricing_plans" USING btree ("_order");
  CREATE INDEX "homepage_pricing_plans_parent_id_idx" ON "homepage_pricing_plans" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "footer_contact_items" CASCADE;
  DROP TABLE "homepage_services_cards" CASCADE;
  DROP TABLE "homepage_services" CASCADE;
  DROP TABLE "homepage_pricing_plans_features" CASCADE;
  DROP TABLE "homepage_pricing_plans" CASCADE;
  DROP TABLE "homepage_pricing" CASCADE;
  ALTER TABLE "footer_social_links" ALTER COLUMN "platform" SET DATA TYPE text;
  DROP TYPE "public"."enum_footer_social_links_platform";
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('facebook', 'instagram', 'youtube', 'tiktok');
  ALTER TABLE "footer_social_links" ALTER COLUMN "platform" SET DATA TYPE "public"."enum_footer_social_links_platform" USING "platform"::"public"."enum_footer_social_links_platform";
  ALTER TABLE "footer_social_links" DROP COLUMN "custom_icon";
  ALTER TABLE "footer_social_links" DROP COLUMN "label";
  DROP TYPE "public"."enum_footer_contact_items_icon";
  DROP TYPE "public"."enum_homepage_services_columns";`)
}
