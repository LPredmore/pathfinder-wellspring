-- Fix 3 misclassified "Other" rows in creator_platforms
UPDATE public.creator_platforms SET platform_name = 'SnapChat', handle = 'Liberty_516', approved_platform = true WHERE id = 24;
UPDATE public.creator_platforms SET platform_name = 'TikTok', handle = '@zoe_halpate', approved_platform = true WHERE id = 22;
UPDATE public.creator_platforms SET platform_name = 'Reddit', handle = 'KateInspiresUGC', approved_platform = true WHERE id = 23;