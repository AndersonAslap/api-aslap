-- AlterTable
ALTER TABLE "product" ADD COLUMN "providerInsurableGroup" TEXT NOT NULL DEFAULT '';

ALTER TABLE "product" ALTER COLUMN "providerInsurableGroup" DROP DEFAULT;
