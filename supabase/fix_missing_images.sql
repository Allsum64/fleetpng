-- Fix 1: Add missing image_urls to vehicles that have none
-- Run in Supabase Dashboard → SQL Editor

UPDATE fleet_inventory
SET image_url = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbUP3EvrSheHxDl9KV8T3HKUwyU4sbZ0CMj--eMrhbhtW3gOd131eesNV7WzB4vl4ak1OO45cCm2PCp8LjmDYeSuesivtD-uxrDEL3ZW962_lF5Y6BjB_516XWv_y9GuPU04DPV0Vkt4M6n-HKE86gaYbb8XN2lqc8kxxamLLpVQ1609zWhV_mVQtvwQIK8vW7Vp2erk7Ebc2P4Z2k80aIdndxWGznRjbosj1w2P39n3Gxow0wcUAlNHDTKHU2lU1dgjrItddRAj6F'
WHERE vehicle_model = 'Toyota Hilux 4x4' AND image_url IS NULL;

UPDATE fleet_inventory
SET image_url = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9ZOAkG5RhibWZjCGe92pQU7Gw7U2zydHTj--6HYjfa9D1r3WprPfLO2LPP0ktW81nfpq-q0CCgjo52OOXcxR7DBS6hFroDVopO0KkwWXk_dMqnghRBqJZe1WOSL8Qpg4Bc9KnSvraKxQP0gl8h3YhXzS3tjNjW4w-ahGiL4pjlDR5_6V2uLGicKGSzdEBzmeeRjhXPS4xWGTVhwdnm-Tkvwb1eGM7ryoxO1yaVB9LfL1p1ifGXmkwvAOG4hlxdZvtc2Y6Zcls2A3P'
WHERE vehicle_model = 'Toyota Prado VX' AND image_url IS NULL;

UPDATE fleet_inventory
SET image_url = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn4vqHNonN7zwYSa7-eiiDKeLByT_8qIa8io8YeoKeTxMHmOPonn-tj54ocQvK7l7tzAH9bfBQYtuMtFHUrFwDoE8FOSWCB0bggUpDB7HYEqDujS42tJyLI9mwKg7ZtRvWwbID34eDvpXjOcDUp4FDis7AMhKd4_KJUcO-o-krFn1khBBPyoZSoRaQ7l-dHmuU9Qi8u6B2-UUvo4ZkWqrvH2dqDikWX-cEpSKLtX7ZkAvbUA6wywMsoTH0jcclFpUujKLulNVTfbIq'
WHERE vehicle_model = '10-Seater Bus' AND image_url IS NULL;

UPDATE fleet_inventory
SET image_url = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt3vySDdMt9y1MMTOX2v9bIIxhkrQB19-4hojtBEj5W5-7ad7DHYcZFCPkrq1oIAERDTCcrauMXDFVDKMos1n9Xb3frLAQTEXMKJM9V2pbuLyv4LynHvrupUcu6sgeAwE45uR8S4QqWxufGVEQRkKYFAIj3h2hdPFXglCpLFjuUjCqnRc8HNox32yfF8owatwaINA0H9_EcexFENcTVZThMi95iDFtJEVB-YOBsb9QdFK4Tk0Z6EUEv26nF9ooMOedvvZfV3PD4UWw'
WHERE vehicle_model = 'Water Cart Truck' AND image_url IS NULL;

-- Fix 2: Add missing Hino Flatbed Truck (heavy cargo vehicle from original design)
-- Assign to Niugini Civil Fleet (heavy equipment operator)
INSERT INTO fleet_inventory (operator_id, vehicle_category, vehicle_model, capacity_seats, daily_rate_kina, hourly_rate_city, hourly_rate_outside, image_url)
SELECT
  id,
  'truck',
  'Hino Flatbed Truck',
  NULL,
  2200.00,
  180.00,
  280.00,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAt3vySDdMt9y1MMTOX2v9bIIxhkrQB19-4hojtBEj5W5-7ad7DHYcZFCPkrq1oIAERDTCcrauMXDFVDKMos1n9Xb3frLAQTEXMKJM9V2pbuLyv4LynHvrupUcu6sgeAwE45uR8S4QqWxufGVEQRkKYFAIj3h2hdPFXglCpLFjuUjCqnRc8HNox32yfF8owatwaINA0H9_EcexFENcTVZThMi95iDFtJEVB-YOBsb9QdFK4Tk0Z6EUEv26nF9ooMOedvvZfV3PD4UWw'
FROM operators WHERE brand_name = 'Niugini Civil Fleet';
