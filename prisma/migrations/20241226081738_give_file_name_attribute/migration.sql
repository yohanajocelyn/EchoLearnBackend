/*
  Warnings:

  - Added the required column `fileName` to the `songs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "fileName" TEXT NOT NULL;
