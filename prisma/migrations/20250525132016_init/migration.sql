-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('OPENED', 'TOOK_BEER', 'RESTOCKED', 'ALERT_EMPTY');

-- CreateTable
CREATE TABLE "Beer" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "volumeML" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Beer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FridgeEvent" (
    "id" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "beerId" TEXT,

    CONSTRAINT "FridgeEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FridgeEvent" ADD CONSTRAINT "FridgeEvent_beerId_fkey" FOREIGN KEY ("beerId") REFERENCES "Beer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
