-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "password_hash" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "people" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avatars" (
    "id" SERIAL NOT NULL,
    "variant" TEXT NOT NULL DEFAULT 'beam',
    "hex1" TEXT NOT NULL DEFAULT '#92A1C6',
    "hex2" TEXT NOT NULL DEFAULT '#146A7C',
    "hex3" TEXT NOT NULL DEFAULT '#F0AB3D',
    "hex4" TEXT NOT NULL DEFAULT '#C271B4',
    "hex5" TEXT NOT NULL DEFAULT '#C20D90',
    "userId" TEXT NOT NULL,

    CONSTRAINT "avatars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relations" (
    "id" SERIAL NOT NULL,
    "person1Id" INTEGER NOT NULL,
    "person2Id" INTEGER NOT NULL,

    CONSTRAINT "relations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "avatars_id_key" ON "avatars"("id");

-- CreateIndex
CREATE UNIQUE INDEX "avatars_userId_key" ON "avatars"("userId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avatars" ADD CONSTRAINT "avatars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relations" ADD CONSTRAINT "relations_person1Id_fkey" FOREIGN KEY ("person1Id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relations" ADD CONSTRAINT "relations_person2Id_fkey" FOREIGN KEY ("person2Id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
