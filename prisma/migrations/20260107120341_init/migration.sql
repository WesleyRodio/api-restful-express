/*
  Warnings:

  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('READER', 'LIBRARIAN', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "type",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'READER';
