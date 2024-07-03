/*
  Warnings:

  - The `variant` column on the `avatars` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "avatars" DROP COLUMN "variant",
ADD COLUMN     "variant" TEXT NOT NULL DEFAULT 'beam';

-- DropEnum
DROP TYPE "Variant";
