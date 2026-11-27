-- AlterEnum
ALTER TYPE "RegistrationStatus" ADD VALUE 'EXPIRED';

-- DropIndex
DROP INDEX "Registration_eventId_status_idx";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "holdMinutes" INTEGER NOT NULL DEFAULT 15;

-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "expiresAt" TIMESTAMPTZ(3),
ADD COLUMN     "extensionCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Registration_eventId_status_expiresAt_idx" ON "Registration"("eventId", "status", "expiresAt");

-- Safety checks
ALTER TABLE "Registration" ADD CONSTRAINT registration_extension_nonneg CHECK ("extensionCount" >= 0);
ALTER TABLE "Event" ADD CONSTRAINT event_hold_minutes_positive CHECK ("holdMinutes" > 0);