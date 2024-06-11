/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "avatars" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "variant" TEXT NOT NULL DEFAULT 'beam',
    "hex1" TEXT NOT NULL DEFAULT '#92A1C6',
    "hex2" TEXT NOT NULL DEFAULT '#146A7C',
    "hex3" TEXT NOT NULL DEFAULT '#F0AB3D',
    "hex4" TEXT NOT NULL DEFAULT '#C271B4',
    "hex5" TEXT NOT NULL DEFAULT '#C20D90',
    "userId" TEXT NOT NULL,
    CONSTRAINT "avatars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "password_hash" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("admin", "id", "name", "password_hash", "username") SELECT "admin", "id", "name", "password_hash", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "avatars_id_key" ON "avatars"("id");

-- CreateIndex
CREATE UNIQUE INDEX "avatars_userId_key" ON "avatars"("userId");
