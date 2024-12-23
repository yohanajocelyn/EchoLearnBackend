/*
  Warnings:

  - You are about to drop the column `listeningSectionId` on the `attempts` table. All the data in the column will be lost.
  - You are about to drop the `listening_sections` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `variantId` to the `attempts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attempts" DROP CONSTRAINT "attempts_listeningSectionId_fkey";

-- DropForeignKey
ALTER TABLE "listening_sections" DROP CONSTRAINT "listening_sections_songId_fkey";

-- AlterTable
ALTER TABLE "attempts" DROP COLUMN "listeningSectionId",
ADD COLUMN     "variantId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "listening_sections";

-- CreateTable
CREATE TABLE "variants" (
    "id" SERIAL NOT NULL,
    "emptyLyric" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "songId" INTEGER NOT NULL,

    CONSTRAINT "variants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_songId_fkey" FOREIGN KEY ("songId") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
