

## Fix `influencer_platforms` Sequence

Single database migration to reset the auto-increment sequence on `influencer_platforms.id` so it starts after the current max ID.

### SQL Migration

```sql
SELECT setval(
  pg_get_serial_sequence('public.influencer_platforms', 'id'),
  COALESCE((SELECT MAX(id) FROM public.influencer_platforms), 0) + 1,
  false
);
```

This uses `COALESCE` so it's safe even if the table is empty. The `false` parameter means the next `nextval()` call will return exactly that number (max + 1), not max + 2.

