CREATE TABLE IF NOT EXISTS "tags" (
	"id" integer PRIMARY KEY NOT NULL,
	"tags" text NOT NULL,
	CONSTRAINT "tags_tags_unique" UNIQUE("tags")
);
