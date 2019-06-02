CREATE TABLE "Events" (
 eventid serial PRIMARY KEY,
 eventtime text NOT NULL,
 short text NOT NULL,
 description text,
 createdby text NOT NULL
)
