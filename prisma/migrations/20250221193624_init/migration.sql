-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELED');

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "longDesc" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "brandId" TEXT NOT NULL,
    "gallery" TEXT[],
    "length" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "isDisabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variations" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "variations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "paymentId" TEXT,
    "paymentMethod" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "variationId" INTEGER,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shippings" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "trackingId" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shippings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "numeroDireccion" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHashed" TEXT NOT NULL,
    "codigoPostal" TEXT NOT NULL,
    "isDisabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "brands_name_key" ON "brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "variations_code_key" ON "variations"("code");

-- CreateIndex
CREATE UNIQUE INDEX "discounts_productId_key" ON "discounts"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "shippings_orderId_key" ON "shippings"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variations" ADD CONSTRAINT "variations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "variations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippings" ADD CONSTRAINT "shippings_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
