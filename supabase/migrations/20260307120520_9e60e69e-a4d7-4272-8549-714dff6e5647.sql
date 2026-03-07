-- Delete child records first
DELETE FROM influencer_platforms WHERE influencer_id IN (
  '6eaaa523-7db3-4e3d-a696-a5a4911d8252',
  '4a347753-ec38-4d2f-9d87-44026181ce7d',
  '52a25fea-1d49-4d8e-8650-cfcbc7381f36'
);

DELETE FROM user_roles WHERE user_id IN (
  '080beb95-fc8f-4ba2-ba2b-e74cf30b61e6',
  '3c17249f-15e9-4375-b125-4fcc8a01d51d',
  'bff065b5-efbc-460a-b103-b4cdd62484b5'
);

DELETE FROM profiles WHERE id IN (
  '080beb95-fc8f-4ba2-ba2b-e74cf30b61e6',
  '3c17249f-15e9-4375-b125-4fcc8a01d51d',
  'bff065b5-efbc-460a-b103-b4cdd62484b5'
);

DELETE FROM influencers WHERE id IN (
  '6eaaa523-7db3-4e3d-a696-a5a4911d8252',
  '4a347753-ec38-4d2f-9d87-44026181ce7d',
  '52a25fea-1d49-4d8e-8650-cfcbc7381f36'
);

-- Delete auth users last
DELETE FROM auth.users WHERE id IN (
  '080beb95-fc8f-4ba2-ba2b-e74cf30b61e6',
  '3c17249f-15e9-4375-b125-4fcc8a01d51d',
  'bff065b5-efbc-460a-b103-b4cdd62484b5'
);