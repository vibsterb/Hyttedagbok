CREATE TABLE "Events" (
 eventid serial PRIMARY KEY,
 eventtime text NOT NULL,
 description text,
 createdby text NOT NULL,
 FOREIGN KEY (createdby) REFERENCES "Users"(username)
)
