/*
  Warnings:

  - The `variant` column on the `avatars` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Variant" AS ENUM ('beam', 'bauhaus');

-- AlterTable
ALTER TABLE "avatars" DROP COLUMN "variant",
ADD COLUMN     "variant" "Variant" NOT NULL DEFAULT 'beam';
