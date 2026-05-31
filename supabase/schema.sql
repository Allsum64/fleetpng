-- ============================================================
-- FleetPNG Supabase Schema
-- Run this entire file in the Supabase SQL Editor
-- Dashboard → SQL Editor → New query → paste → Run
-- ============================================================

-- 1. OPERATORS (main company profiles)
CREATE TABLE IF NOT EXISTS operators (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name            VARCHAR(255) NOT NULL,
  brand_name              VARCHAR(255) NOT NULL,
  ipa_verified            BOOLEAN DEFAULT FALSE,
  tin_number              VARCHAR(100),
  main_phone              VARCHAR(50) NOT NULL,
  whatsapp_phone          VARCHAR(50),
  primary_email           VARCHAR(255) NOT NULL,
  sales_email             VARCHAR(255),
  bsp_account_details     TEXT,
  operating_hours_weekday VARCHAR(100),
  operating_hours_friday  VARCHAR(100),
  operating_hours_sunday  VARCHAR(100),
  is_premium              BOOLEAN DEFAULT FALSE,
  hero_image_url          TEXT,
  logo_url                TEXT,
  created_at              TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. OPERATOR BRANCHES (location mapping)
CREATE TABLE IF NOT EXISTS operator_branches (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id      UUID REFERENCES operators(id) ON DELETE CASCADE,
  province_region  VARCHAR(100) NOT NULL,
  physical_address TEXT NOT NULL,
  po_box           VARCHAR(100),
  branch_phone     VARCHAR(50)
);

-- 3. FLEET INVENTORY (vehicles + rates)
CREATE TABLE IF NOT EXISTS fleet_inventory (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id          UUID REFERENCES operators(id) ON DELETE CASCADE,
  vehicle_category     VARCHAR(50) NOT NULL,
  vehicle_model        VARCHAR(255) NOT NULL,
  capacity_seats       INT,
  daily_rate_kina      NUMERIC(10, 2),
  hourly_rate_city     NUMERIC(10, 2),
  hourly_rate_outside  NUMERIC(10, 2),
  image_url            TEXT
);

-- 4. SPECIALIZED SERVICES (feature flags)
CREATE TABLE IF NOT EXISTS specialized_services (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id          UUID REFERENCES operators(id) ON DELETE CASCADE,
  has_airport_transfer BOOLEAN DEFAULT FALSE,
  has_corporate_pickup BOOLEAN DEFAULT FALSE,
  has_escort_service   BOOLEAN DEFAULT FALSE,
  has_water_cart       BOOLEAN DEFAULT FALSE,
  has_car_dealership   BOOLEAN DEFAULT FALSE
);

-- 5. QUOTE REQUESTS (lead capture from the form)
CREATE TABLE IF NOT EXISTS quote_requests (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id          UUID REFERENCES operators(id) ON DELETE SET NULL,
  origin               VARCHAR(255) NOT NULL,
  destination          VARCHAR(255) NOT NULL,
  transit_date         TIMESTAMP WITH TIME ZONE,
  personnel_level      VARCHAR(100),
  vehicle_requirements TEXT[],
  passengers           INT DEFAULT 1,
  cargo_type           VARCHAR(100),
  cargo_value          VARCHAR(100),
  contact_email        VARCHAR(255) NOT NULL,
  contact_phone        VARCHAR(50) NOT NULL,
  special_instructions TEXT,
  status               VARCHAR(50) DEFAULT 'pending',
  created_at           TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE operators          ENABLE ROW LEVEL SECURITY;
ALTER TABLE operator_branches  ENABLE ROW LEVEL SECURITY;
ALTER TABLE fleet_inventory    ENABLE ROW LEVEL SECURITY;
ALTER TABLE specialized_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests     ENABLE ROW LEVEL SECURITY;

-- Public can read operators, branches, fleet, services
CREATE POLICY "Public read operators"   ON operators          FOR SELECT USING (true);
CREATE POLICY "Public read branches"    ON operator_branches  FOR SELECT USING (true);
CREATE POLICY "Public read fleet"       ON fleet_inventory    FOR SELECT USING (true);
CREATE POLICY "Public read services"    ON specialized_services FOR SELECT USING (true);

-- Anyone can INSERT a quote request (anonymous leads)
CREATE POLICY "Public insert quotes"    ON quote_requests     FOR INSERT WITH CHECK (true);

-- Only authenticated users (admins) can read quote requests
CREATE POLICY "Auth read quotes"        ON quote_requests     FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA — Sample operators
-- ============================================================
DO $$
DECLARE
  op1_id UUID := gen_random_uuid();
  op2_id UUID := gen_random_uuid();
  op3_id UUID := gen_random_uuid();
  op4_id UUID := gen_random_uuid();
BEGIN

  -- Operator 1: Kamkabe Investment Limited
  INSERT INTO operators (id, company_name, brand_name, ipa_verified, tin_number, main_phone, whatsapp_phone, primary_email, operating_hours_weekday, operating_hours_friday, is_premium,
    hero_image_url)
  VALUES (op1_id, 'Kamkabe Investment Limited', 'Kamkabe Investment Limited', true, '500111111',
    '+67570000001', '+67570000001', 'info@kamkabe.com.pg', '08:00 – 17:00', '08:00 – 15:00', true,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDsm-7UtiZ5I-C69PWGBaxlRIf3G2BEfPxNSFu-EegSrW8GtjUo1I_SeU68LtSPOuvzDm2gd1QXa_IQ8g3NSEjRXC5AjevMnx1SirxNHJBs_37HDUi0SEhta8fuA3eP90NQhOv7CrSR3clZMKqIfaXgyi5WJ6L6b7P-pLAUjXtyjKxoqToLh5uP7a7YTbgtPK5K8UG3smNUtezYnwAevrwiFahuj9ODDgd1JzcjCiQzMGI5cGWeSkp_MMnYDsMy024BB0ivQWyXcSzH');

  INSERT INTO operator_branches (operator_id, province_region, physical_address)
  VALUES (op1_id, 'port-moresby', 'Waigani Drive, NCD');

  INSERT INTO fleet_inventory (operator_id, vehicle_category, vehicle_model, capacity_seats, daily_rate_kina, hourly_rate_city, hourly_rate_outside)
  VALUES
    (op1_id, '4x4',       'Toyota Hilux 4x4',        5,  450,  85,  120),
    (op1_id, 'sedan-suv', 'Toyota Prado VX',          7,  800,  150, 220);

  INSERT INTO specialized_services (operator_id, has_airport_transfer, has_corporate_pickup, has_escort_service)
  VALUES (op1_id, true, true, true);

  -- Operator 2: Aimop Hires & Car Dealers
  INSERT INTO operators (id, company_name, brand_name, ipa_verified, tin_number, main_phone, whatsapp_phone, primary_email, operating_hours_weekday, operating_hours_friday, is_premium,
    hero_image_url, logo_url)
  VALUES (op2_id, 'Kamkabe Investment Limited', 'Aimop Hires & Car Dealers', true, '500342918',
    '+67570000002', '+67570000002', 'bookings@aimop.com.pg', '08:00 – 17:00', '08:00 – 15:00', true,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBsEDBofM19mTL4q969ReMdHtM8ea723Skilcb0G-P6sTEg4fVnWGeW6vD5WwW7gaStyT5xtzcFbqseG6WDVC0FPtxYjiNdRAjA-yInCgnhYUbALcGCKqIQLxrr7PzL4PZhWzR1I4jMDmUpuU_KhHNKyXSzHVACSlh3DUQS5_ZuXZqqiSVW4nMoUvBP8An8rJiVr4xAKoaiMHC8MPSCtNIq39irQoQEatcSF76ruGvRwLCLmH7ueMeO0NxCjR04PJu3HlDNO9GjQakh',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ8w3dVZKF-QfeY9ruLwWkd8JejsBSu0R5BoNAcjD1CIfqcPnQERQV98F2EvMgmeNYDqWTMlTDd4A4OhPD164bcRXD3LK75_f1OexAAYnMBydky1mXV7PmfQKwXcAhBUd0tncIWac7o0bKL0ckzROToNp-3DlJmZV15UaCly739Lpb0nkPbPWl8uQPaJobuEtMF6GXUoBTPcKQD1oxd5T_QGUnJBauvvEoMQ7zPiem7t3ZyUVCKsVYKg2EOCrqHsIttXT8Vc_2-1SN');

  INSERT INTO operator_branches (operator_id, province_region, physical_address, po_box)
  VALUES
    (op2_id, 'port-moresby', 'Section 45, Lot 12, Waigani Drive', 'PO Box 1542, Boroko, NCD'),
    (op2_id, 'lae',          'Milfordhaven Rd, Morobe',           NULL),
    (op2_id, 'mt-hagen',     'Highlands Hwy, WHP',                NULL);

  INSERT INTO fleet_inventory (operator_id, vehicle_category, vehicle_model, capacity_seats, daily_rate_kina, hourly_rate_city, hourly_rate_outside, image_url)
  VALUES
    (op2_id, '4x4',       'Toyota Hilux 4x4',      5,  450,  85,  120, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsEDBofM19mTL4q969ReMdHtM8ea723Skilcb0G-P6sTEg4fVnWGeW6vD5WwW7gaStyT5xtzcFbqseG6WDVC0FPtxYjiNdRAjA-yInCgnhYUbALcGCKqIQLxrr7PzL4PZhWzR1I4jMDmUpuU_KhHNKyXSzHVACSlh3DUQS5_ZuXZqqiSVW4nMoUvBP8An8rJiVr4xAKoaiMHC8MPSCtNIq39irQoQEatcSF76ruGvRwLCLmH7ueMeO0NxCjR04PJu3HlDNO9GjQakh'),
    (op2_id, '4x4',       'Landcruiser 10-Seater', 10, 650,  120, 180, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvfxYVcpgYBtGi6K8-eZK9dI8oWpyS-Bb-DMaigYthPZ8ZZpHRjC7DnZ_5P6VfTT2treLuGCm4PYNqL_jdi99hOkrkCscnBWB1K0rafF8n6vit6MKipvgp24SW-RPl96Q7lYXlW43nVM5840iR6urEIEJlbeCXEQWGYwrHoKkCU0riY-o4z0TCmW_7IJf1rciWcdN7-Hd0IvtW4lDNrJSxeReFnzP1A19-Qu7vZhl8wKYvYdFkbi6OqrokfjbBg3QjC0dfnFZW_ewq'),
    (op2_id, 'sedan-suv', 'Toyota Prado VX',       7,  800,  150, 220, 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9ZOAkG5RhibWZjCGe92pQU7Gw7U2zydHTj--6HYjfa9D1r3WprPfLO2LPP0ktW81nfpq-q0CCgjo52OOXcxR7DBS6hFroDVopO0KkwWXk_dMqnghRBqJZe1WOSL8Qpg4Bc9KnSvraKxQP0gl8h3YhXzS3tjNjW4w-ahGiL4pjlDR5_6V2uLGicKGSzdEBzmeeRjhXPS4xWGTVhwdnm-Tkvwb1eGM7ryoxO1yaVB9LfL1p1ifGXmkwvAOG4hlxdZvtc2Y6Zcls2A3P');

  INSERT INTO specialized_services (operator_id, has_airport_transfer, has_corporate_pickup, has_escort_service, has_car_dealership)
  VALUES (op2_id, true, true, true, true);

  -- Operator 3: Paradise Transit Solutions
  INSERT INTO operators (id, company_name, brand_name, ipa_verified, tin_number, main_phone, whatsapp_phone, primary_email, operating_hours_weekday, is_premium, hero_image_url)
  VALUES (op3_id, 'Paradise Transit Solutions', 'Paradise Transit Solutions', true, '500222222',
    '+67570000003', '+67570000003', 'info@paradise.com.pg', '08:00 – 17:00', false,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBpjea5HUpzDl5KT3bMtkSeLwie0smVB3O6VKAO2dqkL_hf6pFopZgQu3AdYDBTZDC8tPHdUxblpXj8McsbfJgbRRQ5KnaCGUxWxBav3ihPiJzqT0uZSStz-4Yyxu2PbCs0xCnjvCU8-5UFvxNzGFt3b1DNrGBec0soItLs5wBTikP6iYR6CIBqa5IvaZQ4jOWWtda5WWZIPj4145qZm7JchEuuKxiAbqM9qzz0l2i7q_5bBw7h8iBL1EOaPNQnepwAQ6RZ2adjUKqB');

  INSERT INTO operator_branches (operator_id, province_region, physical_address)
  VALUES (op3_id, 'mt-hagen', 'Highlands Hwy, WHP');

  INSERT INTO fleet_inventory (operator_id, vehicle_category, vehicle_model, capacity_seats, daily_rate_kina, hourly_rate_city, hourly_rate_outside)
  VALUES (op3_id, 'bus', '10-Seater Bus', 10, 720, 75, 110);

  INSERT INTO specialized_services (operator_id, has_airport_transfer)
  VALUES (op3_id, true);

  -- Operator 4: Niugini Civil Fleet
  INSERT INTO operators (id, company_name, brand_name, ipa_verified, tin_number, main_phone, whatsapp_phone, primary_email, operating_hours_weekday, is_premium, hero_image_url)
  VALUES (op4_id, 'Niugini Civil Fleet', 'Niugini Civil Fleet', true, '500333333',
    '+67570000004', '+67570000004', 'info@niuginicivil.com.pg', '08:00 – 17:00', false,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCB8deRzN7QATi2L5WqlfqWFiIxL7wFW3XBb1bj0Ahool8KOyEhcPAZjrkc3EMCbzpPpSUkPiNCtvbQgXF6fEnfChoDJwFwrQ4fVcgEmVsd6-y3Iye7SRcXX59MjIOID6RCXjGtRH5MwqymkKKkq1q2q1E1jW7pn3h_PpZ3lZZBEL_QS1rdXSk0YyCEvSlrTICLeV38L-QRq2ZG8Pn60QkpCSHxqQWTy2h9U18byTD9EdETqLiGZD0gox4saxFGo0rQ8G4oAYoX67V6');

  INSERT INTO operator_branches (operator_id, province_region, physical_address)
  VALUES (op4_id, 'mt-hagen', 'Highlands Hwy, WHP');

  INSERT INTO fleet_inventory (operator_id, vehicle_category, vehicle_model, capacity_seats, daily_rate_kina, hourly_rate_city, hourly_rate_outside)
  VALUES (op4_id, 'truck', 'Water Cart Truck', NULL, 1200, 180, 280);

  INSERT INTO specialized_services (operator_id, has_water_cart)
  VALUES (op4_id, true);

END $$;
