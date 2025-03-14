-- CreateEnum
CREATE TYPE "Role" AS ENUM ('cliente', 'gestor', 'admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'cliente';
