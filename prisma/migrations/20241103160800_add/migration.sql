/*
  Warnings:

  - Added the required column `priority` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE', 'FROZEN');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "priority" "Priority" NOT NULL,
ADD COLUMN     "status" "TaskStatus" NOT NULL;
