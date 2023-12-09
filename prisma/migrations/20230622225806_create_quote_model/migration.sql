/*
  Warnings:

  - You are about to drop the column `productId` on the `proposal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[quoteId]` on the table `proposal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quoteId` to the `proposal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "proposal" DROP CONSTRAINT "proposal_productId_fkey";

-- AlterTable
ALTER TABLE "proposal" DROP COLUMN "productId",
ADD COLUMN     "quoteId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "quote" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,

    CONSTRAINT "quote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "proposal_quoteId_key" ON "proposal"("quoteId");

-- AddForeignKey
ALTER TABLE "quote" ADD CONSTRAINT "quote_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote" ADD CONSTRAINT "quote_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposal" ADD CONSTRAINT "proposal_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
