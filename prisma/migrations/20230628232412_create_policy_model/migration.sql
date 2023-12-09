-- CreateEnum
CREATE TYPE "policy_status_enum" AS ENUM ('active', 'canceled', 'delayed', 'paused');

-- CreateEnum
CREATE TYPE "policy_payment_provider_enum" AS ENUM ('stripe');

-- CreateEnum
CREATE TYPE "policy_cancellation_reason_enum" AS ENUM ('other', 'duplicateOrNewInsurance', 'notMeetExpectations', 'dontWantAnymore', 'foundInsuranceBetterPrice');

-- CreateTable
CREATE TABLE "policy" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "certificateNumber" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "paymentProvider" "policy_payment_provider_enum" NOT NULL DEFAULT 'stripe',
    "status" "policy_status_enum" NOT NULL DEFAULT 'active',
    "pauseDateStart" TIMESTAMP(3),
    "pauseDateEnd" TIMESTAMP(3),
    "cancellationDate" TIMESTAMP(3),
    "cancellationReason" "policy_cancellation_reason_enum",
    "customerId" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,

    CONSTRAINT "policy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "policy" ADD CONSTRAINT "policy_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policy" ADD CONSTRAINT "policy_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policy" ADD CONSTRAINT "policy_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policy" ADD CONSTRAINT "policy_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
