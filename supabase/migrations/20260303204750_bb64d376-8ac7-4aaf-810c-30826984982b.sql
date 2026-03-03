-- Delete associated influencer platforms
DELETE FROM influencer_platforms WHERE influencer_id IN (
  '0c48b0e0-5c9c-4893-bacc-3f4d93fbf533',
  '58d5309c-a602-4e18-8754-ba17b93d3e33',
  'fe446166-b5fa-445d-90cd-24a4802fdf19',
  'dc21971b-18c1-419e-9541-0751cf3792ba',
  'b54460bc-1b6a-4c05-b991-cfcbccdaa9d8'
);

-- Delete user roles
DELETE FROM user_roles WHERE user_id IN (
  'aa9a64da-2c4c-40f6-9ee4-3dc6f8598c20',
  'fe2eb75f-4127-4e43-8970-d44e534ee7d9',
  '31fa6cf5-e937-40d8-b410-5fdaa831378e',
  'fe53647b-a56b-4237-9d5f-b0febea5b126',
  '70c63890-7915-42f9-8366-d193ef476c89'
);

-- Delete influencers
DELETE FROM influencers WHERE user_id IN (
  'aa9a64da-2c4c-40f6-9ee4-3dc6f8598c20',
  'fe2eb75f-4127-4e43-8970-d44e534ee7d9',
  '31fa6cf5-e937-40d8-b410-5fdaa831378e',
  'fe53647b-a56b-4237-9d5f-b0febea5b126',
  '70c63890-7915-42f9-8366-d193ef476c89'
);

-- Delete profiles
DELETE FROM profiles WHERE id IN (
  'aa9a64da-2c4c-40f6-9ee4-3dc6f8598c20',
  'fe2eb75f-4127-4e43-8970-d44e534ee7d9',
  '31fa6cf5-e937-40d8-b410-5fdaa831378e',
  'fe53647b-a56b-4237-9d5f-b0febea5b126',
  '70c63890-7915-42f9-8366-d193ef476c89'
);