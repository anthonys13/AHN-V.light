BEGIN;

DROP TABLE IF EXISTS
"users", 
"animals", 
"note",
"vac",
"particular",
"vet",
"role",
"user_has_role";

-- Création de notre table list
CREATE TABLE "users" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mdp" TEXT NOT NULL,
    "img" TEXT NOT NULL DEFAULT 'default-profil.png',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "animals" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "poids" real NOT NULL,
    "age" date NOT NULL,
    "race" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "img" TEXT NOT NULL DEFAULT 'default-animal.png',
    "users_id" INTEGER NOT NULL REFERENCES users("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "vac" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date" date,
    "nom" text,
    "rappel" date,
    "animal_id" INTEGER NOT NULL REFERENCES animals("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "particular" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "nom" TEXT,
    "descriptif" TEXT,
    "animal_id" INTEGER NOT NULL REFERENCES animals("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "vet" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date" date,
    "descriptif" TEXT,
    "vet_name" TEXT,
    "traitement" TEXT,
    "analyse_exams" TEXT,
    "animal_id" INTEGER NOT NULL REFERENCES animals("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "role" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "role" TEXT NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "user_has_role" (
    "users_id" integer REFERENCES "users"("id"),
    "role_id" integer REFERENCES "role"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    PRIMARY KEY ("users_id", "role_id")
);

INSERT INTO "users" ("nom", "prenom", "email", "mdp") VALUES

INSERT INTO "animals" ("nom", "poids", "age", "race", "type", "users_id") VALUES

INSERT INTO "vac" ("date", "nom", "rappel", "animal_id") VALUES

INSERT INTO "particular" ("nom", "descriptif", "animal_id") VALUES

INSERT INTO "vet" ("date", "descriptif", "vet_name", "traitement", "analyse_exams", "animal_id") VALUES

INSERT INTO "role" ("role") VALUES
('user'),
('admin');

INSERT INTO "user_has_role" ("users_id", "role_id") VALUES
COMMIT;