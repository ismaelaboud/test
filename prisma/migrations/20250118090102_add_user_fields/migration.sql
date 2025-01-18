-- AlterTable
ALTER TABLE "User" ADD COLUMN     "department" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
