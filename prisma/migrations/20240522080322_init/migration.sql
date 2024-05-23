-- CreateTable
CREATE TABLE "people" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "relations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "person1Id" INTEGER NOT NULL,
    "person2Id" INTEGER NOT NULL,
    CONSTRAINT "relations_person1Id_fkey" FOREIGN KEY ("person1Id") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "relations_person2Id_fkey" FOREIGN KEY ("person2Id") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
