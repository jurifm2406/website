-- DropForeignKey
ALTER TABLE "relations" DROP CONSTRAINT "relations_person1Id_fkey";

-- DropForeignKey
ALTER TABLE "relations" DROP CONSTRAINT "relations_person2Id_fkey";

-- AddForeignKey
ALTER TABLE "relations" ADD CONSTRAINT "relations_person1Id_fkey" FOREIGN KEY ("person1Id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relations" ADD CONSTRAINT "relations_person2Id_fkey" FOREIGN KEY ("person2Id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;
