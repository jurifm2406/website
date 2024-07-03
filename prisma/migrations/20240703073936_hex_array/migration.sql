/*
  Warnings:

  - You are about to drop the column `hex1` on the `avatars` table. All the data in the column will be lost.
  - You are about to drop the column `hex2` on the `avatars` table. All the data in the column will be lost.
  - You are about to drop the column `hex3` on the `avatars` table. All the data in the column will be lost.
  - You are about to drop the column `hex4` on the `avatars` table. All the data in the column will be lost.
  - You are about to drop the column `hex5` on the `avatars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "avatars" DROP COLUMN "hex1",
DROP COLUMN "hex2",
DROP COLUMN "hex3",
DROP COLUMN "hex4",
DROP COLUMN "hex5",
ADD COLUMN     "hex" TEXT[] DEFAULT ARRAY['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']::TEXT[];
