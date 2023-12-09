CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "coverage_type_enum" AS ENUM ('insurance', 'assistance');

-- CreateEnum
CREATE TYPE "gender_type_enum" AS ENUM ('M', 'F', 'NB', 'O');

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "gender" "gender_type_enum" NOT NULL,
    "politicallyExposedPerson" BOOLEAN NOT NULL DEFAULT false,
    "profession" TEXT,
    "childQuantity" INTEGER,
    "income" DOUBLE PRECISION,
    "hasPet" BOOLEAN NOT NULL DEFAULT false,
    "addressId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "friendyName" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "addressId" TEXT,
    "contactId" TEXT,

    CONSTRAINT "partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "friendyName" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "addressId" TEXT,
    "contactId" TEXT,

    CONSTRAINT "provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_type" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "friendyName" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "susepCode" TEXT,

    CONSTRAINT "product_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coverage" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "friendyName" TEXT NOT NULL,
    "information" TEXT,
    "longDescription" TEXT,
    "type" "coverage_type_enum" NOT NULL DEFAULT 'insurance',

    CONSTRAINT "coverage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "maxAge" INTEGER,
    "durationDays" INTEGER,
    "insuranceDeductible" DOUBLE PRECISION,
    "IOF" DOUBLE PRECISION NOT NULL,
    "providerPrice" DOUBLE PRECISION NOT NULL,
    "commission" DOUBLE PRECISION,
    "markUp" DOUBLE PRECISION NOT NULL DEFAULT 1.4,
    "productTypeId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insured_coverages" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minValue" DOUBLE PRECISION,
    "maxValue" DOUBLE PRECISION,
    "gracePeriod" INTEGER,
    "coverageId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "insured_coverages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phoneNumber" TEXT,
    "email" TEXT,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_partnerToproduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_addressId_key" ON "customer"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "customer_contactId_key" ON "customer"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "partner_addressId_key" ON "partner"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "partner_contactId_key" ON "partner"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "provider_addressId_key" ON "provider"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "provider_contactId_key" ON "provider"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "product_type_code_key" ON "product_type"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_partnerToproduct_AB_unique" ON "_partnerToproduct"("A", "B");

-- CreateIndex
CREATE INDEX "_partnerToproduct_B_index" ON "_partnerToproduct"("B");

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner" ADD CONSTRAINT "partner_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner" ADD CONSTRAINT "partner_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider" ADD CONSTRAINT "provider_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider" ADD CONSTRAINT "provider_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "product_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insured_coverages" ADD CONSTRAINT "insured_coverages_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insured_coverages" ADD CONSTRAINT "insured_coverages_coverageId_fkey" FOREIGN KEY ("coverageId") REFERENCES "coverage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insured_coverages" ADD CONSTRAINT "insured_coverages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_partnerToproduct" ADD CONSTRAINT "_partnerToproduct_A_fkey" FOREIGN KEY ("A") REFERENCES "partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_partnerToproduct" ADD CONSTRAINT "_partnerToproduct_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
