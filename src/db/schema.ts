
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, uniqueIndex  } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkId: text("cleck_id").unique().notNull(),
    name: text("name").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

}, (t) => [uniqueIndex("idx_users_clerk_id").on(t.clerkId)]);

export const userRelations = relations(users, ({many}) =>({
    videos:many(videos),
}))


export const categories = pgTable("categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => [uniqueIndex("idx_categories_name").on(t.name)]);

export const videos = pgTable("videos", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),
    muxStatus: text("mux_status"),
    maxAssetId: text("max_asset_id").unique(),
    maxUploadId: text("max_upload_id").unique(),
    muxPlaybackId: text("mux_playback_id").unique(),
    muxTrackId: text("mux_track_id").unique(),
    muxTrackStatus: text("mux_track_status"),
    userId: uuid("user_id").references(() => users.id, {
        onDelete: "cascade",
    }).notNull(),
    categoryId: uuid("category_id").references(() => categories.id, {
        onDelete:"set null"
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const videoRelations = relations(videos, ({one}) => ({
   user: one(users, {
    fields: [videos.userId],
    references:[users.id],
   })
}));