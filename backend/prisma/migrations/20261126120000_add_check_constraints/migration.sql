ALTER TABLE "Event" ADD CONSTRAINT event_capacity_nonneg CHECK (capacity IS NULL OR capacity >= 0);
ALTER TABLE "Event" ADD CONSTRAINT event_fee_nonneg CHECK ("registrationFee" >= 0);
ALTER TABLE "Event" ADD CONSTRAINT event_time_order CHECK ("startTime" IS NULL OR "endTime" IS NULL OR "endTime" > "startTime");
ALTER TABLE "Event" ADD CONSTRAINT event_reg_window_order CHECK ("registrationStartAt" IS NULL OR "registrationEndAt" IS NULL OR "registrationEndAt" > "registrationStartAt");
ALTER TABLE "Payment" ADD CONSTRAINT payment_amount_nonneg CHECK (amount >= 0);
