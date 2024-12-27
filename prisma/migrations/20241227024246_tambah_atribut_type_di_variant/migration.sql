/*
  Warnings:

  - Added the required column `type` to the `variants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE VARCHAR(150);

-- AlterTable
ALTER TABLE "variants" ADD COLUMN     "type" TEXT NOT NULL;
