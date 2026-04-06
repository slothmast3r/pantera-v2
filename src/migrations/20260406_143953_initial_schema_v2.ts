import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_variant" AS ENUM('default', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_schedule_entries_day_of_week" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
  CREATE TYPE "public"."enum_pages_blocks_events_list_variant" AS ENUM('upcoming', 'past', 'all');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_variant" AS ENUM('default', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_schedule_entries_day_of_week" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
  CREATE TYPE "public"."enum__pages_v_blocks_events_list_variant" AS ENUM('upcoming', 'past', 'all');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_classes_type" AS ENUM('krav-maga', 'karate', 'tai-chi', 'individual', 'asg', 'power-training', 'other');
  CREATE TYPE "public"."enum_classes_age_group" AS ENUM('adults', 'children', 'all');
  CREATE TYPE "public"."enum_classes_logistics_intensity" AS ENUM('low', 'medium', 'medium-high', 'high');
  CREATE TYPE "public"."enum_classes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__classes_v_version_type" AS ENUM('krav-maga', 'karate', 'tai-chi', 'individual', 'asg', 'power-training', 'other');
  CREATE TYPE "public"."enum__classes_v_version_age_group" AS ENUM('adults', 'children', 'all');
  CREATE TYPE "public"."enum__classes_v_version_logistics_intensity" AS ENUM('low', 'medium', 'medium-high', 'high');
  CREATE TYPE "public"."enum__classes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_events_status" AS ENUM('upcoming', 'ongoing', 'past', 'cancelled');
  CREATE TYPE "public"."enum_faq_category" AS ENUM('general', 'classes', 'pricing', 'corporate', 'registration');
  CREATE TYPE "public"."enum_offers_blocks_for_who_variant" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum_offers_blocks_cta_variant" AS ENUM('default', 'dark', 'accent');
  CREATE TYPE "public"."enum_offers_category" AS ENUM('company', 'schools', 'workshop', 'birthday', 'other');
  CREATE TYPE "public"."enum_offers_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__offers_v_blocks_for_who_variant" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum__offers_v_blocks_cta_variant" AS ENUM('default', 'dark', 'accent');
  CREATE TYPE "public"."enum__offers_v_version_category" AS ENUM('company', 'schools', 'workshop', 'birthday', 'other');
  CREATE TYPE "public"."enum__offers_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('facebook', 'instagram', 'youtube', 'tiktok', 'linkedin', 'twitter', 'snapchat', 'pinterest', 'whatsapp', 'telegram', 'other');
  CREATE TYPE "public"."enum_schedule_entries_day" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
  CREATE TYPE "public"."enum_homepage_services_columns" AS ENUM('2', '3', '4');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_social_proof_partner_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"background_image_id" integer,
  	"primary_cta_text" varchar,
  	"primary_cta_link" varchar,
  	"secondary_cta_text" varchar,
  	"secondary_cta_link" varchar,
  	"social_proof_google_reviews_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_classes_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_instructors_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"primary_button_text" varchar,
  	"primary_button_link" varchar,
  	"secondary_button_text" varchar,
  	"secondary_button_link" varchar,
  	"variant" "enum_pages_blocks_cta_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_list_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_info_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" varchar,
  	"hours" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"address" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"success_message" varchar DEFAULT 'Dziękujemy! Skontaktujemy się wkrótce.',
  	"recipient_email" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"embed_url" varchar,
  	"address" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_schedule_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day_of_week" "enum_pages_blocks_schedule_entries_day_of_week",
  	"time" varchar,
  	"class_name_id" integer,
  	"instructor_id" integer,
  	"location" varchar
  );
  
  CREATE TABLE "pages_blocks_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"embed_code" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_events_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"variant" "enum_pages_blocks_events_list_variant" DEFAULT 'upcoming',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"columns" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"classes_id" integer,
  	"testimonials_id" integer,
  	"instructors_id" integer,
  	"faq_id" integer,
  	"events_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_social_proof_partner_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"background_image_id" integer,
  	"primary_cta_text" varchar,
  	"primary_cta_link" varchar,
  	"secondary_cta_text" varchar,
  	"secondary_cta_link" varchar,
  	"social_proof_google_reviews_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_classes_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_instructors_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"primary_button_text" varchar,
  	"primary_button_link" varchar,
  	"secondary_button_text" varchar,
  	"secondary_button_link" varchar,
  	"variant" "enum__pages_v_blocks_cta_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_list_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_info_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"day" varchar,
  	"hours" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"address" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"success_message" varchar DEFAULT 'Dziękujemy! Skontaktujemy się wkrótce.',
  	"recipient_email" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"embed_url" varchar,
  	"address" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_schedule_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"day_of_week" "enum__pages_v_blocks_schedule_entries_day_of_week",
  	"time" varchar,
  	"class_name_id" integer,
  	"instructor_id" integer,
  	"location" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"embed_code" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_events_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"variant" "enum__pages_v_blocks_events_list_variant" DEFAULT 'upcoming',
  	"limit" numeric DEFAULT 6,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"columns" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"classes_id" integer,
  	"testimonials_id" integer,
  	"instructors_id" integer,
  	"faq_id" integer,
  	"events_id" integer
  );
  
  CREATE TABLE "classes_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "classes_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "classes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"type" "enum_classes_type",
  	"age_group" "enum_classes_age_group" DEFAULT 'adults',
  	"cover_image_id" integer,
  	"heading_title" varchar,
  	"heading_subtitle" varchar,
  	"heading_background_image_id" integer,
  	"introduction_title" varchar,
  	"introduction_content" jsonb,
  	"introduction_image_id" integer,
  	"target_audience_for_who_title" varchar,
  	"target_audience_for_who_content" varchar,
  	"target_audience_expect_title" varchar,
  	"target_audience_expect_content" varchar,
  	"redirect_title" varchar,
  	"redirect_description" varchar,
  	"redirect_target_class_id" integer,
  	"redirect_button_text" varchar,
  	"logistics_intensity" "enum_classes_logistics_intensity",
  	"logistics_what_to_bring" varchar,
  	"instructor_id" integer,
  	"cta_heading" varchar,
  	"cta_description" varchar,
  	"cta_button_text" varchar,
  	"cta_button_link" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_classes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "classes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "_classes_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_classes_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_classes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_type" "enum__classes_v_version_type",
  	"version_age_group" "enum__classes_v_version_age_group" DEFAULT 'adults',
  	"version_cover_image_id" integer,
  	"version_heading_title" varchar,
  	"version_heading_subtitle" varchar,
  	"version_heading_background_image_id" integer,
  	"version_introduction_title" varchar,
  	"version_introduction_content" jsonb,
  	"version_introduction_image_id" integer,
  	"version_target_audience_for_who_title" varchar,
  	"version_target_audience_for_who_content" varchar,
  	"version_target_audience_expect_title" varchar,
  	"version_target_audience_expect_content" varchar,
  	"version_redirect_title" varchar,
  	"version_redirect_description" varchar,
  	"version_redirect_target_class_id" integer,
  	"version_redirect_button_text" varchar,
  	"version_logistics_intensity" "enum__classes_v_version_logistics_intensity",
  	"version_logistics_what_to_bring" varchar,
  	"version_instructor_id" integer,
  	"version_cta_heading" varchar,
  	"version_cta_description" varchar,
  	"version_cta_button_text" varchar,
  	"version_cta_button_link" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__classes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_classes_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "instructors_achievements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "instructors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"photo_id" integer,
  	"specialization" varchar,
  	"bio" varchar,
  	"order" numeric DEFAULT 0,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "instructors_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"classes_id" integer
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author" varchar NOT NULL,
  	"avatar_id" integer,
  	"content" varchar NOT NULL,
  	"rating" numeric DEFAULT 5,
  	"related_class_id" integer,
  	"is_featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"cover_image_id" integer,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"location" varchar,
  	"short_description" varchar,
  	"content" jsonb,
  	"registration_link" varchar,
  	"status" "enum_events_status" DEFAULT 'upcoming',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"classes_id" integer
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" "enum_faq_category",
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "offers_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "offers_blocks_offer_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "offers_blocks_offer_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "offers_blocks_for_who_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "offers_blocks_for_who" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'UCZESTNICY',
  	"title" varchar,
  	"content" varchar,
  	"variant" "enum_offers_blocks_for_who_variant" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "offers_blocks_contact_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Kontakt w sprawie oferty',
  	"email" varchar,
  	"phone" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "offers_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"primary_button_text" varchar,
  	"primary_button_link" varchar,
  	"secondary_button_text" varchar,
  	"secondary_button_link" varchar,
  	"variant" "enum_offers_blocks_cta_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "offers_blocks_faq_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "offers_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "offers_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"columns" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "offers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"category" "enum_offers_category",
  	"cover_image_id" integer,
  	"heading_title" varchar,
  	"heading_subtitle" varchar,
  	"heading_background_image_id" integer,
  	"heading_cta_text" varchar DEFAULT 'Zapytaj o ofertę',
  	"heading_cta_link" varchar DEFAULT '/kontakt',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_offers_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "offers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faq_id" integer
  );
  
  CREATE TABLE "_offers_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_offers_v_blocks_offer_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offers_v_blocks_offer_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_offers_v_blocks_for_who_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offers_v_blocks_for_who" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'UCZESTNICY',
  	"title" varchar,
  	"content" varchar,
  	"variant" "enum__offers_v_blocks_for_who_variant" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_offers_v_blocks_contact_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Kontakt w sprawie oferty',
  	"email" varchar,
  	"phone" varchar,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_offers_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"primary_button_text" varchar,
  	"primary_button_link" varchar,
  	"secondary_button_text" varchar,
  	"secondary_button_link" varchar,
  	"variant" "enum__offers_v_blocks_cta_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_offers_v_blocks_faq_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_offers_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offers_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"columns" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_offers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category" "enum__offers_v_version_category",
  	"version_cover_image_id" integer,
  	"version_heading_title" varchar,
  	"version_heading_subtitle" varchar,
  	"version_heading_background_image_id" integer,
  	"version_heading_cta_text" varchar DEFAULT 'Zapytaj o ofertę',
  	"version_heading_cta_link" varchar DEFAULT '/kontakt',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__offers_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_offers_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faq_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"classes_id" integer,
  	"instructors_id" integer,
  	"testimonials_id" integer,
  	"events_id" integer,
  	"faq_id" integer,
  	"offers_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "navigation_links_sub_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"logo_text" varchar DEFAULT 'Pantera',
  	"cta_button_text" varchar,
  	"cta_button_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL,
  	"custom_icon" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"description" varchar,
  	"bottom_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
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
  
  CREATE TABLE "contact_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"address" varchar,
  	"address_link" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"hours" varchar,
  	"map_embed_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "analytics_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"property_id" varchar,
  	"service_account_email" varchar,
  	"private_key" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "about_gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Nasza Galeria',
  	"columns" numeric DEFAULT 3,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_social_proof_partner_logos" ADD CONSTRAINT "pages_blocks_hero_social_proof_partner_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_social_proof_partner_logos" ADD CONSTRAINT "pages_blocks_hero_social_proof_partner_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_classes_overview" ADD CONSTRAINT "pages_blocks_classes_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits_items" ADD CONSTRAINT "pages_blocks_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits" ADD CONSTRAINT "pages_blocks_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_section" ADD CONSTRAINT "pages_blocks_testimonials_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_instructors_section" ADD CONSTRAINT "pages_blocks_instructors_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_list_logos" ADD CONSTRAINT "pages_blocks_logo_list_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_list_logos" ADD CONSTRAINT "pages_blocks_logo_list_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_list" ADD CONSTRAINT "pages_blocks_logo_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_info_opening_hours" ADD CONSTRAINT "pages_blocks_contact_info_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_info" ADD CONSTRAINT "pages_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map" ADD CONSTRAINT "pages_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_section" ADD CONSTRAINT "pages_blocks_faq_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_schedule_entries" ADD CONSTRAINT "pages_blocks_schedule_entries_class_name_id_classes_id_fk" FOREIGN KEY ("class_name_id") REFERENCES "public"."classes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_schedule_entries" ADD CONSTRAINT "pages_blocks_schedule_entries_instructor_id_instructors_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."instructors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_schedule_entries" ADD CONSTRAINT "pages_blocks_schedule_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_schedule" ADD CONSTRAINT "pages_blocks_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_events_list" ADD CONSTRAINT "pages_blocks_events_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_classes_fk" FOREIGN KEY ("classes_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_instructors_fk" FOREIGN KEY ("instructors_id") REFERENCES "public"."instructors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_social_proof_partner_logos" ADD CONSTRAINT "_pages_v_blocks_hero_social_proof_partner_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_social_proof_partner_logos" ADD CONSTRAINT "_pages_v_blocks_hero_social_proof_partner_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_classes_overview" ADD CONSTRAINT "_pages_v_blocks_classes_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_benefits_items" ADD CONSTRAINT "_pages_v_blocks_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_benefits" ADD CONSTRAINT "_pages_v_blocks_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_section" ADD CONSTRAINT "_pages_v_blocks_testimonials_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_instructors_section" ADD CONSTRAINT "_pages_v_blocks_instructors_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_list_logos" ADD CONSTRAINT "_pages_v_blocks_logo_list_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_list_logos" ADD CONSTRAINT "_pages_v_blocks_logo_list_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_list" ADD CONSTRAINT "_pages_v_blocks_logo_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_info_opening_hours" ADD CONSTRAINT "_pages_v_blocks_contact_info_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_info" ADD CONSTRAINT "_pages_v_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map" ADD CONSTRAINT "_pages_v_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_section" ADD CONSTRAINT "_pages_v_blocks_faq_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_schedule_entries" ADD CONSTRAINT "_pages_v_blocks_schedule_entries_class_name_id_classes_id_fk" FOREIGN KEY ("class_name_id") REFERENCES "public"."classes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_schedule_entries" ADD CONSTRAINT "_pages_v_blocks_schedule_entries_instructor_id_instructors_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."instructors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_schedule_entries" ADD CONSTRAINT "_pages_v_blocks_schedule_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_schedule" ADD CONSTRAINT "_pages_v_blocks_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_events_list" ADD CONSTRAINT "_pages_v_blocks_events_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_classes_fk" FOREIGN KEY ("classes_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_instructors_fk" FOREIGN KEY ("instructors_id") REFERENCES "public"."instructors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "classes_highlights" ADD CONSTRAINT "classes_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "classes_benefits" ADD CONSTRAINT "classes_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "classes" ADD CONSTRAINT "classes_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "classes" ADD CONSTRAINT "classes_heading_background_image_id_media_id_fk" FOREIGN KEY ("heading_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "classes" ADD CONSTRAINT "classes_introduction_image_id_media_id_fk" FOREIGN KEY ("introduction_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "classes" ADD CONSTRAINT "classes_redirect_target_class_id_classes_id_fk" FOREIGN KEY ("redirect_target_class_id") REFERENCES "public"."classes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "classes" ADD CONSTRAINT "classes_instructor_id_instructors_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."instructors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "classes" ADD CONSTRAINT "classes_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "classes_rels" ADD CONSTRAINT "classes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "classes_rels" ADD CONSTRAINT "classes_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_classes_v_version_highlights" ADD CONSTRAINT "_classes_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_classes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_classes_v_version_benefits" ADD CONSTRAINT "_classes_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_classes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_classes_v" ADD CONSTRAINT "_classes_v_parent_id_classes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."classes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_classes_v" ADD CONSTRAINT "_classes_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_classes_v" ADD CONSTRAINT "_classes_v_version_heading_background_image_id_media_id_fk" FOREIGN KEY ("version_heading_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_classes_v" ADD CONSTRAINT "_classes_v_version_introduction_image_id_media_id_fk" FOREIGN KEY ("version_introduction_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_classes_v" ADD CONSTRAINT "_classes_v_version_redirect_target_class_id_classes_id_fk" FOREIGN KEY ("version_redirect_target_class_id") REFERENCES "public"."classes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_classes_v" ADD CONSTRAINT "_classes_v_version_instructor_id_instructors_id_fk" FOREIGN KEY ("version_instructor_id") REFERENCES "public"."instructors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_classes_v" ADD CONSTRAINT "_classes_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_classes_v_rels" ADD CONSTRAINT "_classes_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_classes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_classes_v_rels" ADD CONSTRAINT "_classes_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructors_achievements" ADD CONSTRAINT "instructors_achievements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."instructors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructors" ADD CONSTRAINT "instructors_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructors" ADD CONSTRAINT "instructors_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructors_rels" ADD CONSTRAINT "instructors_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."instructors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "instructors_rels" ADD CONSTRAINT "instructors_rels_classes_fk" FOREIGN KEY ("classes_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_related_class_id_classes_id_fk" FOREIGN KEY ("related_class_id") REFERENCES "public"."classes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_classes_fk" FOREIGN KEY ("classes_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_blocks_rich_text" ADD CONSTRAINT "offers_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_blocks_offer_cards_items" ADD CONSTRAINT "offers_blocks_offer_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers_blocks_offer_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_blocks_offer_cards" ADD CONSTRAINT "offers_blocks_offer_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_blocks_for_who_bullets" ADD CONSTRAINT "offers_blocks_for_who_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers_blocks_for_who"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_blocks_for_who" ADD CONSTRAINT "offers_blocks_for_who_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_blocks_contact_card" ADD CONSTRAINT "offers_blocks_contact_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_blocks_cta" ADD CONSTRAINT "offers_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_blocks_faq_section" ADD CONSTRAINT "offers_blocks_faq_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_blocks_gallery_images" ADD CONSTRAINT "offers_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offers_blocks_gallery_images" ADD CONSTRAINT "offers_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_blocks_gallery" ADD CONSTRAINT "offers_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers" ADD CONSTRAINT "offers_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offers" ADD CONSTRAINT "offers_heading_background_image_id_media_id_fk" FOREIGN KEY ("heading_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offers" ADD CONSTRAINT "offers_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offers_rels" ADD CONSTRAINT "offers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_rels" ADD CONSTRAINT "offers_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_blocks_rich_text" ADD CONSTRAINT "_offers_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_blocks_offer_cards_items" ADD CONSTRAINT "_offers_v_blocks_offer_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v_blocks_offer_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_blocks_offer_cards" ADD CONSTRAINT "_offers_v_blocks_offer_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_blocks_for_who_bullets" ADD CONSTRAINT "_offers_v_blocks_for_who_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v_blocks_for_who"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_blocks_for_who" ADD CONSTRAINT "_offers_v_blocks_for_who_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_blocks_contact_card" ADD CONSTRAINT "_offers_v_blocks_contact_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_blocks_cta" ADD CONSTRAINT "_offers_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_blocks_faq_section" ADD CONSTRAINT "_offers_v_blocks_faq_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_blocks_gallery_images" ADD CONSTRAINT "_offers_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v_blocks_gallery_images" ADD CONSTRAINT "_offers_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_blocks_gallery" ADD CONSTRAINT "_offers_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v" ADD CONSTRAINT "_offers_v_parent_id_offers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."offers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v" ADD CONSTRAINT "_offers_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v" ADD CONSTRAINT "_offers_v_version_heading_background_image_id_media_id_fk" FOREIGN KEY ("version_heading_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v" ADD CONSTRAINT "_offers_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v_rels" ADD CONSTRAINT "_offers_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_rels" ADD CONSTRAINT "_offers_v_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_classes_fk" FOREIGN KEY ("classes_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_instructors_fk" FOREIGN KEY ("instructors_id") REFERENCES "public"."instructors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_offers_fk" FOREIGN KEY ("offers_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_links_sub_links" ADD CONSTRAINT "navigation_links_sub_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_links" ADD CONSTRAINT "navigation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation" ADD CONSTRAINT "navigation_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "schedule_entries" ADD CONSTRAINT "schedule_entries_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "schedule_entries" ADD CONSTRAINT "schedule_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_services_cards" ADD CONSTRAINT "homepage_services_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_services_cards" ADD CONSTRAINT "homepage_services_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_pricing_plans_features" ADD CONSTRAINT "homepage_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_pricing_plans" ADD CONSTRAINT "homepage_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_gallery_images" ADD CONSTRAINT "about_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_gallery_images" ADD CONSTRAINT "about_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_gallery"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "pages_blocks_hero_social_proof_partner_logos_order_idx" ON "pages_blocks_hero_social_proof_partner_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_social_proof_partner_logos_parent_id_idx" ON "pages_blocks_hero_social_proof_partner_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_social_proof_partner_logos_logo_idx" ON "pages_blocks_hero_social_proof_partner_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_classes_overview_order_idx" ON "pages_blocks_classes_overview" USING btree ("_order");
  CREATE INDEX "pages_blocks_classes_overview_parent_id_idx" ON "pages_blocks_classes_overview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_classes_overview_path_idx" ON "pages_blocks_classes_overview" USING btree ("_path");
  CREATE INDEX "pages_blocks_benefits_items_order_idx" ON "pages_blocks_benefits_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_items_parent_id_idx" ON "pages_blocks_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_order_idx" ON "pages_blocks_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_parent_id_idx" ON "pages_blocks_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_path_idx" ON "pages_blocks_benefits" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_section_order_idx" ON "pages_blocks_testimonials_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_section_parent_id_idx" ON "pages_blocks_testimonials_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_section_path_idx" ON "pages_blocks_testimonials_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_instructors_section_order_idx" ON "pages_blocks_instructors_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_instructors_section_parent_id_idx" ON "pages_blocks_instructors_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_instructors_section_path_idx" ON "pages_blocks_instructors_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_list_logos_order_idx" ON "pages_blocks_logo_list_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_list_logos_parent_id_idx" ON "pages_blocks_logo_list_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_list_logos_logo_idx" ON "pages_blocks_logo_list_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_logo_list_order_idx" ON "pages_blocks_logo_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_list_parent_id_idx" ON "pages_blocks_logo_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_list_path_idx" ON "pages_blocks_logo_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_info_opening_hours_order_idx" ON "pages_blocks_contact_info_opening_hours" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_info_opening_hours_parent_id_idx" ON "pages_blocks_contact_info_opening_hours" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_info_order_idx" ON "pages_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_info_parent_id_idx" ON "pages_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_info_path_idx" ON "pages_blocks_contact_info" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_map_order_idx" ON "pages_blocks_map" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_parent_id_idx" ON "pages_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_map_path_idx" ON "pages_blocks_map" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_section_order_idx" ON "pages_blocks_faq_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_section_parent_id_idx" ON "pages_blocks_faq_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_section_path_idx" ON "pages_blocks_faq_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_schedule_entries_order_idx" ON "pages_blocks_schedule_entries" USING btree ("_order");
  CREATE INDEX "pages_blocks_schedule_entries_parent_id_idx" ON "pages_blocks_schedule_entries" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_schedule_entries_class_name_idx" ON "pages_blocks_schedule_entries" USING btree ("class_name_id");
  CREATE INDEX "pages_blocks_schedule_entries_instructor_idx" ON "pages_blocks_schedule_entries" USING btree ("instructor_id");
  CREATE INDEX "pages_blocks_schedule_order_idx" ON "pages_blocks_schedule" USING btree ("_order");
  CREATE INDEX "pages_blocks_schedule_parent_id_idx" ON "pages_blocks_schedule" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_schedule_path_idx" ON "pages_blocks_schedule" USING btree ("_path");
  CREATE INDEX "pages_blocks_events_list_order_idx" ON "pages_blocks_events_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_events_list_parent_id_idx" ON "pages_blocks_events_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_events_list_path_idx" ON "pages_blocks_events_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_images_order_idx" ON "pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_images_parent_id_idx" ON "pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_image_idx" ON "pages_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_classes_id_idx" ON "pages_rels" USING btree ("classes_id");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "pages_rels_instructors_id_idx" ON "pages_rels" USING btree ("instructors_id");
  CREATE INDEX "pages_rels_faq_id_idx" ON "pages_rels" USING btree ("faq_id");
  CREATE INDEX "pages_rels_events_id_idx" ON "pages_rels" USING btree ("events_id");
  CREATE INDEX "_pages_v_blocks_hero_social_proof_partner_logos_order_idx" ON "_pages_v_blocks_hero_social_proof_partner_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_social_proof_partner_logos_parent_id_idx" ON "_pages_v_blocks_hero_social_proof_partner_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_social_proof_partner_logos_logo_idx" ON "_pages_v_blocks_hero_social_proof_partner_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_background_image_idx" ON "_pages_v_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_classes_overview_order_idx" ON "_pages_v_blocks_classes_overview" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_classes_overview_parent_id_idx" ON "_pages_v_blocks_classes_overview" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_classes_overview_path_idx" ON "_pages_v_blocks_classes_overview" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_benefits_items_order_idx" ON "_pages_v_blocks_benefits_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefits_items_parent_id_idx" ON "_pages_v_blocks_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefits_order_idx" ON "_pages_v_blocks_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefits_parent_id_idx" ON "_pages_v_blocks_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefits_path_idx" ON "_pages_v_blocks_benefits" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_section_order_idx" ON "_pages_v_blocks_testimonials_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_section_parent_id_idx" ON "_pages_v_blocks_testimonials_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_section_path_idx" ON "_pages_v_blocks_testimonials_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_instructors_section_order_idx" ON "_pages_v_blocks_instructors_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_instructors_section_parent_id_idx" ON "_pages_v_blocks_instructors_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_instructors_section_path_idx" ON "_pages_v_blocks_instructors_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_list_logos_order_idx" ON "_pages_v_blocks_logo_list_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_list_logos_parent_id_idx" ON "_pages_v_blocks_logo_list_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_list_logos_logo_idx" ON "_pages_v_blocks_logo_list_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_logo_list_order_idx" ON "_pages_v_blocks_logo_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_list_parent_id_idx" ON "_pages_v_blocks_logo_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_list_path_idx" ON "_pages_v_blocks_logo_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_info_opening_hours_order_idx" ON "_pages_v_blocks_contact_info_opening_hours" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_info_opening_hours_parent_id_idx" ON "_pages_v_blocks_contact_info_opening_hours" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_info_order_idx" ON "_pages_v_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_info_parent_id_idx" ON "_pages_v_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_info_path_idx" ON "_pages_v_blocks_contact_info" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_map_order_idx" ON "_pages_v_blocks_map" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_map_parent_id_idx" ON "_pages_v_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_map_path_idx" ON "_pages_v_blocks_map" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_section_order_idx" ON "_pages_v_blocks_faq_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_section_parent_id_idx" ON "_pages_v_blocks_faq_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_section_path_idx" ON "_pages_v_blocks_faq_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_schedule_entries_order_idx" ON "_pages_v_blocks_schedule_entries" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_schedule_entries_parent_id_idx" ON "_pages_v_blocks_schedule_entries" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_schedule_entries_class_name_idx" ON "_pages_v_blocks_schedule_entries" USING btree ("class_name_id");
  CREATE INDEX "_pages_v_blocks_schedule_entries_instructor_idx" ON "_pages_v_blocks_schedule_entries" USING btree ("instructor_id");
  CREATE INDEX "_pages_v_blocks_schedule_order_idx" ON "_pages_v_blocks_schedule" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_schedule_parent_id_idx" ON "_pages_v_blocks_schedule" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_schedule_path_idx" ON "_pages_v_blocks_schedule" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_events_list_order_idx" ON "_pages_v_blocks_events_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_events_list_parent_id_idx" ON "_pages_v_blocks_events_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_events_list_path_idx" ON "_pages_v_blocks_events_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_images_order_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_images_parent_id_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_image_idx" ON "_pages_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_classes_id_idx" ON "_pages_v_rels" USING btree ("classes_id");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_pages_v_rels_instructors_id_idx" ON "_pages_v_rels" USING btree ("instructors_id");
  CREATE INDEX "_pages_v_rels_faq_id_idx" ON "_pages_v_rels" USING btree ("faq_id");
  CREATE INDEX "_pages_v_rels_events_id_idx" ON "_pages_v_rels" USING btree ("events_id");
  CREATE INDEX "classes_highlights_order_idx" ON "classes_highlights" USING btree ("_order");
  CREATE INDEX "classes_highlights_parent_id_idx" ON "classes_highlights" USING btree ("_parent_id");
  CREATE INDEX "classes_benefits_order_idx" ON "classes_benefits" USING btree ("_order");
  CREATE INDEX "classes_benefits_parent_id_idx" ON "classes_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "classes_slug_idx" ON "classes" USING btree ("slug");
  CREATE INDEX "classes_cover_image_idx" ON "classes" USING btree ("cover_image_id");
  CREATE INDEX "classes_heading_heading_background_image_idx" ON "classes" USING btree ("heading_background_image_id");
  CREATE INDEX "classes_introduction_introduction_image_idx" ON "classes" USING btree ("introduction_image_id");
  CREATE INDEX "classes_redirect_redirect_target_class_idx" ON "classes" USING btree ("redirect_target_class_id");
  CREATE INDEX "classes_instructor_idx" ON "classes" USING btree ("instructor_id");
  CREATE INDEX "classes_seo_seo_og_image_idx" ON "classes" USING btree ("seo_og_image_id");
  CREATE INDEX "classes_updated_at_idx" ON "classes" USING btree ("updated_at");
  CREATE INDEX "classes_created_at_idx" ON "classes" USING btree ("created_at");
  CREATE INDEX "classes__status_idx" ON "classes" USING btree ("_status");
  CREATE INDEX "classes_rels_order_idx" ON "classes_rels" USING btree ("order");
  CREATE INDEX "classes_rels_parent_idx" ON "classes_rels" USING btree ("parent_id");
  CREATE INDEX "classes_rels_path_idx" ON "classes_rels" USING btree ("path");
  CREATE INDEX "classes_rels_testimonials_id_idx" ON "classes_rels" USING btree ("testimonials_id");
  CREATE INDEX "_classes_v_version_highlights_order_idx" ON "_classes_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_classes_v_version_highlights_parent_id_idx" ON "_classes_v_version_highlights" USING btree ("_parent_id");
  CREATE INDEX "_classes_v_version_benefits_order_idx" ON "_classes_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_classes_v_version_benefits_parent_id_idx" ON "_classes_v_version_benefits" USING btree ("_parent_id");
  CREATE INDEX "_classes_v_parent_idx" ON "_classes_v" USING btree ("parent_id");
  CREATE INDEX "_classes_v_version_version_slug_idx" ON "_classes_v" USING btree ("version_slug");
  CREATE INDEX "_classes_v_version_version_cover_image_idx" ON "_classes_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_classes_v_version_heading_version_heading_background_im_idx" ON "_classes_v" USING btree ("version_heading_background_image_id");
  CREATE INDEX "_classes_v_version_introduction_version_introduction_ima_idx" ON "_classes_v" USING btree ("version_introduction_image_id");
  CREATE INDEX "_classes_v_version_redirect_version_redirect_target_clas_idx" ON "_classes_v" USING btree ("version_redirect_target_class_id");
  CREATE INDEX "_classes_v_version_version_instructor_idx" ON "_classes_v" USING btree ("version_instructor_id");
  CREATE INDEX "_classes_v_version_seo_version_seo_og_image_idx" ON "_classes_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_classes_v_version_version_updated_at_idx" ON "_classes_v" USING btree ("version_updated_at");
  CREATE INDEX "_classes_v_version_version_created_at_idx" ON "_classes_v" USING btree ("version_created_at");
  CREATE INDEX "_classes_v_version_version__status_idx" ON "_classes_v" USING btree ("version__status");
  CREATE INDEX "_classes_v_created_at_idx" ON "_classes_v" USING btree ("created_at");
  CREATE INDEX "_classes_v_updated_at_idx" ON "_classes_v" USING btree ("updated_at");
  CREATE INDEX "_classes_v_latest_idx" ON "_classes_v" USING btree ("latest");
  CREATE INDEX "_classes_v_autosave_idx" ON "_classes_v" USING btree ("autosave");
  CREATE INDEX "_classes_v_rels_order_idx" ON "_classes_v_rels" USING btree ("order");
  CREATE INDEX "_classes_v_rels_parent_idx" ON "_classes_v_rels" USING btree ("parent_id");
  CREATE INDEX "_classes_v_rels_path_idx" ON "_classes_v_rels" USING btree ("path");
  CREATE INDEX "_classes_v_rels_testimonials_id_idx" ON "_classes_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "instructors_achievements_order_idx" ON "instructors_achievements" USING btree ("_order");
  CREATE INDEX "instructors_achievements_parent_id_idx" ON "instructors_achievements" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "instructors_slug_idx" ON "instructors" USING btree ("slug");
  CREATE INDEX "instructors_photo_idx" ON "instructors" USING btree ("photo_id");
  CREATE INDEX "instructors_seo_seo_og_image_idx" ON "instructors" USING btree ("seo_og_image_id");
  CREATE INDEX "instructors_updated_at_idx" ON "instructors" USING btree ("updated_at");
  CREATE INDEX "instructors_created_at_idx" ON "instructors" USING btree ("created_at");
  CREATE INDEX "instructors_rels_order_idx" ON "instructors_rels" USING btree ("order");
  CREATE INDEX "instructors_rels_parent_idx" ON "instructors_rels" USING btree ("parent_id");
  CREATE INDEX "instructors_rels_path_idx" ON "instructors_rels" USING btree ("path");
  CREATE INDEX "instructors_rels_classes_id_idx" ON "instructors_rels" USING btree ("classes_id");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_related_class_idx" ON "testimonials" USING btree ("related_class_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_cover_image_idx" ON "events" USING btree ("cover_image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_classes_id_idx" ON "events_rels" USING btree ("classes_id");
  CREATE INDEX "faq_updated_at_idx" ON "faq" USING btree ("updated_at");
  CREATE INDEX "faq_created_at_idx" ON "faq" USING btree ("created_at");
  CREATE INDEX "offers_blocks_rich_text_order_idx" ON "offers_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "offers_blocks_rich_text_parent_id_idx" ON "offers_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "offers_blocks_rich_text_path_idx" ON "offers_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "offers_blocks_offer_cards_items_order_idx" ON "offers_blocks_offer_cards_items" USING btree ("_order");
  CREATE INDEX "offers_blocks_offer_cards_items_parent_id_idx" ON "offers_blocks_offer_cards_items" USING btree ("_parent_id");
  CREATE INDEX "offers_blocks_offer_cards_order_idx" ON "offers_blocks_offer_cards" USING btree ("_order");
  CREATE INDEX "offers_blocks_offer_cards_parent_id_idx" ON "offers_blocks_offer_cards" USING btree ("_parent_id");
  CREATE INDEX "offers_blocks_offer_cards_path_idx" ON "offers_blocks_offer_cards" USING btree ("_path");
  CREATE INDEX "offers_blocks_for_who_bullets_order_idx" ON "offers_blocks_for_who_bullets" USING btree ("_order");
  CREATE INDEX "offers_blocks_for_who_bullets_parent_id_idx" ON "offers_blocks_for_who_bullets" USING btree ("_parent_id");
  CREATE INDEX "offers_blocks_for_who_order_idx" ON "offers_blocks_for_who" USING btree ("_order");
  CREATE INDEX "offers_blocks_for_who_parent_id_idx" ON "offers_blocks_for_who" USING btree ("_parent_id");
  CREATE INDEX "offers_blocks_for_who_path_idx" ON "offers_blocks_for_who" USING btree ("_path");
  CREATE INDEX "offers_blocks_contact_card_order_idx" ON "offers_blocks_contact_card" USING btree ("_order");
  CREATE INDEX "offers_blocks_contact_card_parent_id_idx" ON "offers_blocks_contact_card" USING btree ("_parent_id");
  CREATE INDEX "offers_blocks_contact_card_path_idx" ON "offers_blocks_contact_card" USING btree ("_path");
  CREATE INDEX "offers_blocks_cta_order_idx" ON "offers_blocks_cta" USING btree ("_order");
  CREATE INDEX "offers_blocks_cta_parent_id_idx" ON "offers_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "offers_blocks_cta_path_idx" ON "offers_blocks_cta" USING btree ("_path");
  CREATE INDEX "offers_blocks_faq_section_order_idx" ON "offers_blocks_faq_section" USING btree ("_order");
  CREATE INDEX "offers_blocks_faq_section_parent_id_idx" ON "offers_blocks_faq_section" USING btree ("_parent_id");
  CREATE INDEX "offers_blocks_faq_section_path_idx" ON "offers_blocks_faq_section" USING btree ("_path");
  CREATE INDEX "offers_blocks_gallery_images_order_idx" ON "offers_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "offers_blocks_gallery_images_parent_id_idx" ON "offers_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "offers_blocks_gallery_images_image_idx" ON "offers_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "offers_blocks_gallery_order_idx" ON "offers_blocks_gallery" USING btree ("_order");
  CREATE INDEX "offers_blocks_gallery_parent_id_idx" ON "offers_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "offers_blocks_gallery_path_idx" ON "offers_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "offers_slug_idx" ON "offers" USING btree ("slug");
  CREATE INDEX "offers_cover_image_idx" ON "offers" USING btree ("cover_image_id");
  CREATE INDEX "offers_heading_heading_background_image_idx" ON "offers" USING btree ("heading_background_image_id");
  CREATE INDEX "offers_seo_seo_og_image_idx" ON "offers" USING btree ("seo_og_image_id");
  CREATE INDEX "offers_updated_at_idx" ON "offers" USING btree ("updated_at");
  CREATE INDEX "offers_created_at_idx" ON "offers" USING btree ("created_at");
  CREATE INDEX "offers__status_idx" ON "offers" USING btree ("_status");
  CREATE INDEX "offers_rels_order_idx" ON "offers_rels" USING btree ("order");
  CREATE INDEX "offers_rels_parent_idx" ON "offers_rels" USING btree ("parent_id");
  CREATE INDEX "offers_rels_path_idx" ON "offers_rels" USING btree ("path");
  CREATE INDEX "offers_rels_faq_id_idx" ON "offers_rels" USING btree ("faq_id");
  CREATE INDEX "_offers_v_blocks_rich_text_order_idx" ON "_offers_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_offers_v_blocks_rich_text_parent_id_idx" ON "_offers_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_blocks_rich_text_path_idx" ON "_offers_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_offers_v_blocks_offer_cards_items_order_idx" ON "_offers_v_blocks_offer_cards_items" USING btree ("_order");
  CREATE INDEX "_offers_v_blocks_offer_cards_items_parent_id_idx" ON "_offers_v_blocks_offer_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_blocks_offer_cards_order_idx" ON "_offers_v_blocks_offer_cards" USING btree ("_order");
  CREATE INDEX "_offers_v_blocks_offer_cards_parent_id_idx" ON "_offers_v_blocks_offer_cards" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_blocks_offer_cards_path_idx" ON "_offers_v_blocks_offer_cards" USING btree ("_path");
  CREATE INDEX "_offers_v_blocks_for_who_bullets_order_idx" ON "_offers_v_blocks_for_who_bullets" USING btree ("_order");
  CREATE INDEX "_offers_v_blocks_for_who_bullets_parent_id_idx" ON "_offers_v_blocks_for_who_bullets" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_blocks_for_who_order_idx" ON "_offers_v_blocks_for_who" USING btree ("_order");
  CREATE INDEX "_offers_v_blocks_for_who_parent_id_idx" ON "_offers_v_blocks_for_who" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_blocks_for_who_path_idx" ON "_offers_v_blocks_for_who" USING btree ("_path");
  CREATE INDEX "_offers_v_blocks_contact_card_order_idx" ON "_offers_v_blocks_contact_card" USING btree ("_order");
  CREATE INDEX "_offers_v_blocks_contact_card_parent_id_idx" ON "_offers_v_blocks_contact_card" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_blocks_contact_card_path_idx" ON "_offers_v_blocks_contact_card" USING btree ("_path");
  CREATE INDEX "_offers_v_blocks_cta_order_idx" ON "_offers_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_offers_v_blocks_cta_parent_id_idx" ON "_offers_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_blocks_cta_path_idx" ON "_offers_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_offers_v_blocks_faq_section_order_idx" ON "_offers_v_blocks_faq_section" USING btree ("_order");
  CREATE INDEX "_offers_v_blocks_faq_section_parent_id_idx" ON "_offers_v_blocks_faq_section" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_blocks_faq_section_path_idx" ON "_offers_v_blocks_faq_section" USING btree ("_path");
  CREATE INDEX "_offers_v_blocks_gallery_images_order_idx" ON "_offers_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_offers_v_blocks_gallery_images_parent_id_idx" ON "_offers_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_blocks_gallery_images_image_idx" ON "_offers_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_offers_v_blocks_gallery_order_idx" ON "_offers_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_offers_v_blocks_gallery_parent_id_idx" ON "_offers_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_offers_v_blocks_gallery_path_idx" ON "_offers_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_offers_v_parent_idx" ON "_offers_v" USING btree ("parent_id");
  CREATE INDEX "_offers_v_version_version_slug_idx" ON "_offers_v" USING btree ("version_slug");
  CREATE INDEX "_offers_v_version_version_cover_image_idx" ON "_offers_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_offers_v_version_heading_version_heading_background_ima_idx" ON "_offers_v" USING btree ("version_heading_background_image_id");
  CREATE INDEX "_offers_v_version_seo_version_seo_og_image_idx" ON "_offers_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_offers_v_version_version_updated_at_idx" ON "_offers_v" USING btree ("version_updated_at");
  CREATE INDEX "_offers_v_version_version_created_at_idx" ON "_offers_v" USING btree ("version_created_at");
  CREATE INDEX "_offers_v_version_version__status_idx" ON "_offers_v" USING btree ("version__status");
  CREATE INDEX "_offers_v_created_at_idx" ON "_offers_v" USING btree ("created_at");
  CREATE INDEX "_offers_v_updated_at_idx" ON "_offers_v" USING btree ("updated_at");
  CREATE INDEX "_offers_v_latest_idx" ON "_offers_v" USING btree ("latest");
  CREATE INDEX "_offers_v_autosave_idx" ON "_offers_v" USING btree ("autosave");
  CREATE INDEX "_offers_v_rels_order_idx" ON "_offers_v_rels" USING btree ("order");
  CREATE INDEX "_offers_v_rels_parent_idx" ON "_offers_v_rels" USING btree ("parent_id");
  CREATE INDEX "_offers_v_rels_path_idx" ON "_offers_v_rels" USING btree ("path");
  CREATE INDEX "_offers_v_rels_faq_id_idx" ON "_offers_v_rels" USING btree ("faq_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_classes_id_idx" ON "payload_locked_documents_rels" USING btree ("classes_id");
  CREATE INDEX "payload_locked_documents_rels_instructors_id_idx" ON "payload_locked_documents_rels" USING btree ("instructors_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_faq_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_id");
  CREATE INDEX "payload_locked_documents_rels_offers_id_idx" ON "payload_locked_documents_rels" USING btree ("offers_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "navigation_links_sub_links_order_idx" ON "navigation_links_sub_links" USING btree ("_order");
  CREATE INDEX "navigation_links_sub_links_parent_id_idx" ON "navigation_links_sub_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_links_order_idx" ON "navigation_links" USING btree ("_order");
  CREATE INDEX "navigation_links_parent_id_idx" ON "navigation_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_logo_idx" ON "navigation" USING btree ("logo_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE INDEX "schedule_entries_order_idx" ON "schedule_entries" USING btree ("_order");
  CREATE INDEX "schedule_entries_parent_id_idx" ON "schedule_entries" USING btree ("_parent_id");
  CREATE INDEX "schedule_entries_class_idx" ON "schedule_entries" USING btree ("class_id");
  CREATE INDEX "homepage_services_cards_order_idx" ON "homepage_services_cards" USING btree ("_order");
  CREATE INDEX "homepage_services_cards_parent_id_idx" ON "homepage_services_cards" USING btree ("_parent_id");
  CREATE INDEX "homepage_services_cards_image_idx" ON "homepage_services_cards" USING btree ("image_id");
  CREATE INDEX "homepage_pricing_plans_features_order_idx" ON "homepage_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "homepage_pricing_plans_features_parent_id_idx" ON "homepage_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "homepage_pricing_plans_order_idx" ON "homepage_pricing_plans" USING btree ("_order");
  CREATE INDEX "homepage_pricing_plans_parent_id_idx" ON "homepage_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "about_gallery_images_order_idx" ON "about_gallery_images" USING btree ("_order");
  CREATE INDEX "about_gallery_images_parent_id_idx" ON "about_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "about_gallery_images_image_idx" ON "about_gallery_images" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero_social_proof_partner_logos" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_classes_overview" CASCADE;
  DROP TABLE "pages_blocks_benefits_items" CASCADE;
  DROP TABLE "pages_blocks_benefits" CASCADE;
  DROP TABLE "pages_blocks_testimonials_section" CASCADE;
  DROP TABLE "pages_blocks_instructors_section" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_logo_list_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_list" CASCADE;
  DROP TABLE "pages_blocks_contact_info_opening_hours" CASCADE;
  DROP TABLE "pages_blocks_contact_info" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages_blocks_map" CASCADE;
  DROP TABLE "pages_blocks_faq_section" CASCADE;
  DROP TABLE "pages_blocks_schedule_entries" CASCADE;
  DROP TABLE "pages_blocks_schedule" CASCADE;
  DROP TABLE "pages_blocks_events_list" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_social_proof_partner_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_classes_overview" CASCADE;
  DROP TABLE "_pages_v_blocks_benefits_items" CASCADE;
  DROP TABLE "_pages_v_blocks_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_section" CASCADE;
  DROP TABLE "_pages_v_blocks_instructors_section" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_list_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_list" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_info_opening_hours" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_info" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form" CASCADE;
  DROP TABLE "_pages_v_blocks_map" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_section" CASCADE;
  DROP TABLE "_pages_v_blocks_schedule_entries" CASCADE;
  DROP TABLE "_pages_v_blocks_schedule" CASCADE;
  DROP TABLE "_pages_v_blocks_events_list" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "classes_highlights" CASCADE;
  DROP TABLE "classes_benefits" CASCADE;
  DROP TABLE "classes" CASCADE;
  DROP TABLE "classes_rels" CASCADE;
  DROP TABLE "_classes_v_version_highlights" CASCADE;
  DROP TABLE "_classes_v_version_benefits" CASCADE;
  DROP TABLE "_classes_v" CASCADE;
  DROP TABLE "_classes_v_rels" CASCADE;
  DROP TABLE "instructors_achievements" CASCADE;
  DROP TABLE "instructors" CASCADE;
  DROP TABLE "instructors_rels" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "faq" CASCADE;
  DROP TABLE "offers_blocks_rich_text" CASCADE;
  DROP TABLE "offers_blocks_offer_cards_items" CASCADE;
  DROP TABLE "offers_blocks_offer_cards" CASCADE;
  DROP TABLE "offers_blocks_for_who_bullets" CASCADE;
  DROP TABLE "offers_blocks_for_who" CASCADE;
  DROP TABLE "offers_blocks_contact_card" CASCADE;
  DROP TABLE "offers_blocks_cta" CASCADE;
  DROP TABLE "offers_blocks_faq_section" CASCADE;
  DROP TABLE "offers_blocks_gallery_images" CASCADE;
  DROP TABLE "offers_blocks_gallery" CASCADE;
  DROP TABLE "offers" CASCADE;
  DROP TABLE "offers_rels" CASCADE;
  DROP TABLE "_offers_v_blocks_rich_text" CASCADE;
  DROP TABLE "_offers_v_blocks_offer_cards_items" CASCADE;
  DROP TABLE "_offers_v_blocks_offer_cards" CASCADE;
  DROP TABLE "_offers_v_blocks_for_who_bullets" CASCADE;
  DROP TABLE "_offers_v_blocks_for_who" CASCADE;
  DROP TABLE "_offers_v_blocks_contact_card" CASCADE;
  DROP TABLE "_offers_v_blocks_cta" CASCADE;
  DROP TABLE "_offers_v_blocks_faq_section" CASCADE;
  DROP TABLE "_offers_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_offers_v_blocks_gallery" CASCADE;
  DROP TABLE "_offers_v" CASCADE;
  DROP TABLE "_offers_v_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "navigation_links_sub_links" CASCADE;
  DROP TABLE "navigation_links" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "schedule_entries" CASCADE;
  DROP TABLE "schedule" CASCADE;
  DROP TABLE "homepage_services_cards" CASCADE;
  DROP TABLE "homepage_services" CASCADE;
  DROP TABLE "homepage_pricing_plans_features" CASCADE;
  DROP TABLE "homepage_pricing_plans" CASCADE;
  DROP TABLE "homepage_pricing" CASCADE;
  DROP TABLE "contact_info" CASCADE;
  DROP TABLE "analytics_settings" CASCADE;
  DROP TABLE "about_gallery_images" CASCADE;
  DROP TABLE "about_gallery" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_cta_variant";
  DROP TYPE "public"."enum_pages_blocks_schedule_entries_day_of_week";
  DROP TYPE "public"."enum_pages_blocks_events_list_variant";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_cta_variant";
  DROP TYPE "public"."enum__pages_v_blocks_schedule_entries_day_of_week";
  DROP TYPE "public"."enum__pages_v_blocks_events_list_variant";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_classes_type";
  DROP TYPE "public"."enum_classes_age_group";
  DROP TYPE "public"."enum_classes_logistics_intensity";
  DROP TYPE "public"."enum_classes_status";
  DROP TYPE "public"."enum__classes_v_version_type";
  DROP TYPE "public"."enum__classes_v_version_age_group";
  DROP TYPE "public"."enum__classes_v_version_logistics_intensity";
  DROP TYPE "public"."enum__classes_v_version_status";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum_faq_category";
  DROP TYPE "public"."enum_offers_blocks_for_who_variant";
  DROP TYPE "public"."enum_offers_blocks_cta_variant";
  DROP TYPE "public"."enum_offers_category";
  DROP TYPE "public"."enum_offers_status";
  DROP TYPE "public"."enum__offers_v_blocks_for_who_variant";
  DROP TYPE "public"."enum__offers_v_blocks_cta_variant";
  DROP TYPE "public"."enum__offers_v_version_category";
  DROP TYPE "public"."enum__offers_v_version_status";
  DROP TYPE "public"."enum_footer_social_links_platform";
  DROP TYPE "public"."enum_schedule_entries_day";
  DROP TYPE "public"."enum_homepage_services_columns";`)
}
