/*
  Warnings:

  - You are about to drop the `_partnerToproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_partnerToproduct" DROP CONSTRAINT "_partnerToproduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_partnerToproduct" DROP CONSTRAINT "_partnerToproduct_B_fkey";

-- DropTable
DROP TABLE "_partnerToproduct";

-- CreateTable
CREATE TABLE "product_partners" (
    "productId" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,

    CONSTRAINT "product_partners_pkey" PRIMARY KEY ("productId","partnerId")
);

-- AddForeignKey
ALTER TABLE "product_partners" ADD CONSTRAINT "product_partners_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_partners" ADD CONSTRAINT "product_partners_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
