import { getDb } from '../../db/client'
import { verifyAdmin } from '../../utils/verifyAdmin'

export default defineEventHandler(async (event) => {
  if (!verifyAdmin(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const db = getDb()

  const results = await Promise.all([
    // 0: totals
    db.query(`
      SELECT tool_type, action, COUNT(*)::int as count
      FROM preview_events GROUP BY tool_type, action ORDER BY tool_type, action
    `),
    // 1: today
    db.query(`
      SELECT tool_type, action, COUNT(*)::int as count
      FROM preview_events WHERE created_at >= CURRENT_DATE
      GROUP BY tool_type, action ORDER BY tool_type, action
    `),
    // 2: last 7 days detail
    db.query(`
      SELECT DATE(created_at) as date, tool_type, action, COUNT(*)::int as count
      FROM preview_events WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY DATE(created_at), tool_type, action ORDER BY date DESC, tool_type, action
    `),
    // 3: last 30 days daily
    db.query(`
      SELECT DATE(created_at) as date, COUNT(*)::int as count
      FROM preview_events WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY DATE(created_at) ORDER BY date ASC
    `),
    // 4: total count
    db.query(`SELECT COUNT(*)::int as count FROM preview_events`),
    // 5: referrers 30d
    db.query(`
      SELECT COALESCE(referrer, 'unknown') as referrer, COUNT(*)::int as count
      FROM preview_events WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY referrer ORDER BY count DESC LIMIT 10
    `),
    // 6: viewports 30d
    db.query(`
      SELECT
        CASE WHEN viewport_width < 768 THEN 'mobile' WHEN viewport_width < 1024 THEN 'tablet' ELSE 'desktop' END as device,
        COUNT(*)::int as count
      FROM preview_events
      WHERE viewport_width IS NOT NULL AND created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY device ORDER BY count DESC
    `),
    // 7: unique sessions 30d
    db.query(`
      SELECT COUNT(DISTINCT session_id)::int as count
      FROM preview_events
      WHERE session_id IS NOT NULL AND created_at >= CURRENT_DATE - INTERVAL '30 days'
    `),
    // 8: templates 30d
    db.query(`
      SELECT template_name, COUNT(*)::int as count
      FROM preview_events
      WHERE template_name IS NOT NULL AND created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY template_name ORDER BY count DESC
    `),
    // 9: avg duration 30d
    db.query(`
      SELECT tool_type, action, ROUND(AVG(duration_ms))::int as avg_ms
      FROM preview_events
      WHERE duration_ms IS NOT NULL AND duration_ms > 0 AND created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY tool_type, action ORDER BY tool_type, action
    `),
    // 10: hourly distribution (last 7 days)
    db.query(`
      SELECT EXTRACT(HOUR FROM created_at)::int as hour, COUNT(*)::int as count
      FROM preview_events WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY hour ORDER BY hour
    `),
    // 11: conversion rate (preview -> export) per tool
    db.query(`
      SELECT
        tool_type,
        COUNT(*) FILTER (WHERE action = 'preview')::int as previews,
        COUNT(*) FILTER (WHERE action = 'export')::int as exports
      FROM preview_events
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY tool_type
    `),
    // 12: dark mode usage
    db.query(`
      SELECT
        COALESCE(dark_mode, false) as dark_mode,
        COUNT(*)::int as count
      FROM preview_events
      WHERE tool_type = 'linkedin' AND created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY dark_mode
    `),
    // 13: avg content length per tool
    db.query(`
      SELECT tool_type, ROUND(AVG(content_length))::int as avg_len, MAX(content_length)::int as max_len
      FROM preview_events
      WHERE content_length IS NOT NULL AND content_length > 0 AND created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY tool_type
    `),
    // 14: has_image ratio for linkedin
    db.query(`
      SELECT
        COUNT(*) FILTER (WHERE has_image = true)::int as with_image,
        COUNT(*) FILTER (WHERE has_image = false OR has_image IS NULL)::int as without_image
      FROM preview_events
      WHERE tool_type = 'linkedin' AND created_at >= CURRENT_DATE - INTERVAL '30 days'
    `),
    // 15: yesterday vs today comparison
    db.query(`
      SELECT
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE)::int as today,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '1 day' AND created_at < CURRENT_DATE)::int as yesterday
      FROM preview_events
    `),
    // 16: this week vs last week
    db.query(`
      SELECT
        COUNT(*) FILTER (WHERE created_at >= DATE_TRUNC('week', CURRENT_DATE))::int as this_week,
        COUNT(*) FILTER (WHERE created_at >= DATE_TRUNC('week', CURRENT_DATE) - INTERVAL '7 days' AND created_at < DATE_TRUNC('week', CURRENT_DATE))::int as last_week
      FROM preview_events
    `),
    // 17: top pages
    db.query(`
      SELECT COALESCE(page_path, 'unknown') as page, COUNT(*)::int as count
      FROM preview_events WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY page_path ORDER BY count DESC LIMIT 10
    `),
  ])

  return {
    total_events: results[4].rows[0]?.count ?? 0,
    unique_sessions_30d: results[7].rows[0]?.count ?? 0,
    totals: results[0].rows,
    today: results[1].rows,
    last_7_days: results[2].rows,
    last_30_days_daily: results[3].rows,
    referrers: results[5].rows,
    viewports: results[6].rows,
    templates: results[8].rows,
    avg_duration: results[9].rows,
    hourly_distribution: results[10].rows,
    conversion: results[11].rows,
    dark_mode_usage: results[12].rows,
    content_length: results[13].rows,
    image_usage: results[14].rows[0] ?? { with_image: 0, without_image: 0 },
    comparison: {
      today_vs_yesterday: results[15].rows[0] ?? { today: 0, yesterday: 0 },
      this_week_vs_last: results[16].rows[0] ?? { this_week: 0, last_week: 0 },
    },
    top_pages: results[17].rows,
  }
})
