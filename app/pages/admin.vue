<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Login form -->
    <div v-if="!authenticated" class="max-w-sm mx-auto mt-20">
      <div class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
        <h1 class="text-lg font-bold text-slate-900 mb-1">Admin</h1>
        <p class="text-sm text-slate-400 mb-6">Sign in to view statistics</p>

        <form class="space-y-4" @submit.prevent="login">
          <input
            v-model="user"
            type="text"
            placeholder="Username"
            autocomplete="username"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            autocomplete="current-password"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
          />
          <p v-if="loginError" class="text-xs text-red-500 font-medium">{{ loginError }}</p>
          <button
            type="submit"
            :disabled="loggingIn"
            class="w-full py-2.5 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {{ loggingIn ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Dashboard -->
    <div v-else>
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p class="text-sm text-slate-400 mt-1">Preview usage statistics</p>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            @click="fetchStats"
          >
            Refresh
          </button>
          <button
            class="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>

      <div v-if="loading" class="text-center py-16 text-sm text-slate-400">Loading stats...</div>

      <template v-else-if="stats">
        <!-- Summary cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div
            v-for="card in summaryCards"
            :key="card.label"
            class="bg-white rounded-xl border border-slate-100 p-5"
          >
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{{ card.label }}</p>
            <p class="text-2xl font-bold text-slate-900 tabular-nums">{{ card.value }}</p>
            <p v-if="card.sub" class="text-[10px] mt-1" :class="card.subColor || 'text-slate-400'">{{ card.sub }}</p>
          </div>
        </div>

        <!-- Comparison banners -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div class="bg-white rounded-xl border border-slate-100 p-5 flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Today vs Yesterday</p>
              <div class="flex items-baseline gap-2 mt-1">
                <span class="text-lg font-bold text-slate-900 tabular-nums">{{ stats.comparison.today_vs_yesterday.today }}</span>
                <span class="text-xs text-slate-400">vs {{ stats.comparison.today_vs_yesterday.yesterday }}</span>
              </div>
            </div>
            <span
              class="text-sm font-bold tabular-nums"
              :class="percentChange(stats.comparison.today_vs_yesterday.today, stats.comparison.today_vs_yesterday.yesterday).color"
            >
              {{ percentChange(stats.comparison.today_vs_yesterday.today, stats.comparison.today_vs_yesterday.yesterday).text }}
            </span>
          </div>
          <div class="bg-white rounded-xl border border-slate-100 p-5 flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">This Week vs Last</p>
              <div class="flex items-baseline gap-2 mt-1">
                <span class="text-lg font-bold text-slate-900 tabular-nums">{{ stats.comparison.this_week_vs_last.this_week }}</span>
                <span class="text-xs text-slate-400">vs {{ stats.comparison.this_week_vs_last.last_week }}</span>
              </div>
            </div>
            <span
              class="text-sm font-bold tabular-nums"
              :class="percentChange(stats.comparison.this_week_vs_last.this_week, stats.comparison.this_week_vs_last.last_week).color"
            >
              {{ percentChange(stats.comparison.this_week_vs_last.this_week, stats.comparison.this_week_vs_last.last_week).text }}
            </span>
          </div>
        </div>

        <!-- Conversion funnel -->
        <div class="bg-white rounded-xl border border-slate-100 p-6 mb-6">
          <h2 class="text-sm font-bold text-slate-700 mb-4">Conversion Funnel (30d)</h2>
          <div v-if="!stats.conversion?.length" class="text-sm text-slate-400">No data yet.</div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="c in stats.conversion" :key="c.tool_type" class="bg-slate-50 rounded-lg p-4">
              <p class="text-xs font-semibold text-slate-500 capitalize mb-3">{{ c.tool_type }}</p>
              <div class="flex items-center gap-3">
                <div class="flex-1">
                  <div class="h-8 bg-indigo-100 rounded-md flex items-center px-3">
                    <span class="text-xs font-semibold text-indigo-700">Preview: {{ c.previews }}</span>
                  </div>
                </div>
                <svg class="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <div class="flex-1">
                  <div
                    class="h-8 bg-green-100 rounded-md flex items-center px-3"
                    :style="{ width: c.previews > 0 ? Math.max((c.exports / c.previews) * 100, 20) + '%' : '20%' }"
                  >
                    <span class="text-xs font-semibold text-green-700">Export: {{ c.exports }}</span>
                  </div>
                </div>
              </div>
              <p class="text-[10px] text-slate-400 mt-2">
                Conversion: {{ c.previews > 0 ? Math.round((c.exports / c.previews) * 100) : 0 }}%
              </p>
            </div>
          </div>
        </div>

        <!-- Today + All Time breakdown -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div class="bg-white rounded-xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold text-slate-700 mb-4">Today</h2>
            <div v-if="stats.today.length === 0" class="text-sm text-slate-400">No events today yet.</div>
            <div v-else class="grid grid-cols-2 gap-3">
              <div v-for="row in stats.today" :key="`t-${row.tool_type}-${row.action}`" class="bg-slate-50 rounded-lg p-3">
                <p class="text-xs text-slate-400 capitalize">{{ row.tool_type }} / {{ row.action }}</p>
                <p class="text-lg font-bold text-slate-800 tabular-nums">{{ row.count }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold text-slate-700 mb-4">All Time</h2>
            <div v-if="stats.totals.length === 0" class="text-sm text-slate-400">No events recorded yet.</div>
            <div v-else class="grid grid-cols-2 gap-3">
              <div v-for="row in stats.totals" :key="`a-${row.tool_type}-${row.action}`" class="bg-slate-50 rounded-lg p-3">
                <p class="text-xs text-slate-400 capitalize">{{ row.tool_type }} / {{ row.action }}</p>
                <p class="text-lg font-bold text-slate-800 tabular-nums">{{ row.count }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Last 30 days chart -->
        <div class="bg-white rounded-xl border border-slate-100 p-6 mb-6">
          <h2 class="text-sm font-bold text-slate-700 mb-4">Last 30 Days</h2>
          <div v-if="stats.last_30_days_daily.length === 0" class="text-sm text-slate-400">No data yet.</div>
          <div v-else class="flex items-end gap-1 h-32">
            <div
              v-for="day in chartData"
              :key="day.date"
              class="flex-1 bg-indigo-500 rounded-t-sm hover:bg-indigo-600 transition-colors cursor-default min-w-[4px]"
              :style="{ height: day.height + '%' }"
              :title="`${day.date}: ${day.count} events`"
            />
          </div>
          <div class="flex justify-between mt-2 text-[10px] text-slate-400">
            <span>{{ chartData[0]?.date }}</span>
            <span>{{ chartData[chartData.length - 1]?.date }}</span>
          </div>
        </div>

        <!-- Hourly distribution -->
        <div class="bg-white rounded-xl border border-slate-100 p-6 mb-6">
          <h2 class="text-sm font-bold text-slate-700 mb-4">Activity by Hour (7d)</h2>
          <div v-if="!stats.hourly_distribution?.length" class="text-sm text-slate-400">No data yet.</div>
          <div v-else>
            <div class="flex items-end gap-0.5 h-24">
              <div
                v-for="h in hourlyChart"
                :key="h.hour"
                class="flex-1 rounded-t-sm transition-colors cursor-default min-w-[4px]"
                :class="h.hour >= 9 && h.hour <= 17 ? 'bg-indigo-400 hover:bg-indigo-500' : 'bg-slate-200 hover:bg-slate-300'"
                :style="{ height: h.height + '%' }"
                :title="`${h.label}: ${h.count} events`"
              />
            </div>
            <div class="flex justify-between mt-1 text-[10px] text-slate-400">
              <span>0:00</span>
              <span>6:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:00</span>
            </div>
          </div>
        </div>

        <!-- Diagnostics 3-column row -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <!-- Referrers -->
          <div class="bg-white rounded-xl border border-slate-100 p-5">
            <h2 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Traffic Sources (30d)</h2>
            <div v-if="!stats.referrers?.length" class="text-xs text-slate-400">No data</div>
            <div v-else class="space-y-2">
              <div v-for="r in stats.referrers" :key="r.referrer">
                <div class="flex items-center justify-between mb-0.5">
                  <span class="text-xs text-slate-600 capitalize">{{ r.referrer }}</span>
                  <span class="text-xs font-semibold text-slate-800 tabular-nums">{{ r.count }}</span>
                </div>
                <div class="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full bg-indigo-400 rounded-full" :style="{ width: barWidth(r.count, stats.referrers) + '%' }" />
                </div>
              </div>
            </div>
          </div>

          <!-- Devices -->
          <div class="bg-white rounded-xl border border-slate-100 p-5">
            <h2 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Devices (30d)</h2>
            <div v-if="!stats.viewports?.length" class="text-xs text-slate-400">No data</div>
            <div v-else class="space-y-2">
              <div v-for="v in stats.viewports" :key="v.device">
                <div class="flex items-center justify-between mb-0.5">
                  <span class="text-xs text-slate-600 capitalize">{{ v.device }}</span>
                  <span class="text-xs font-semibold text-slate-800 tabular-nums">{{ v.count }}</span>
                </div>
                <div class="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full bg-violet-400 rounded-full" :style="{ width: barWidth(v.count, stats.viewports) + '%' }" />
                </div>
              </div>
            </div>
            <div class="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
              <span class="text-xs text-slate-400">Unique sessions</span>
              <span class="text-xs font-semibold text-slate-800 tabular-nums">{{ stats.unique_sessions_30d }}</span>
            </div>
          </div>

          <!-- Usage insights -->
          <div class="bg-white rounded-xl border border-slate-100 p-5">
            <h2 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Usage Insights (30d)</h2>

            <!-- Dark mode -->
            <div v-if="stats.dark_mode_usage?.length" class="mb-3">
              <p class="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Dark mode (LinkedIn)</p>
              <div class="flex gap-2">
                <div v-for="d in stats.dark_mode_usage" :key="String(d.dark_mode)" class="flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full" :class="d.dark_mode ? 'bg-slate-700' : 'bg-amber-300'" />
                  <span class="text-xs text-slate-600">{{ d.dark_mode ? 'Dark' : 'Light' }}: {{ d.count }}</span>
                </div>
              </div>
            </div>

            <!-- Image usage -->
            <div v-if="stats.image_usage" class="mb-3">
              <p class="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Image usage (LinkedIn)</p>
              <div class="flex gap-2">
                <span class="text-xs text-slate-600">With: {{ stats.image_usage.with_image }}</span>
                <span class="text-xs text-slate-400">|</span>
                <span class="text-xs text-slate-600">Without: {{ stats.image_usage.without_image }}</span>
              </div>
            </div>

            <!-- Content length -->
            <div v-if="stats.content_length?.length">
              <p class="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Avg content length</p>
              <div class="space-y-1">
                <div v-for="c in stats.content_length" :key="c.tool_type" class="flex items-center justify-between">
                  <span class="text-xs text-slate-600 capitalize">{{ c.tool_type }}</span>
                  <span class="text-xs text-slate-500">avg {{ c.avg_len }} / max {{ c.max_len }} chars</span>
                </div>
              </div>
            </div>

            <!-- Avg duration -->
            <div v-if="stats.avg_duration?.length" class="mt-3 pt-3 border-t border-slate-50">
              <p class="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Avg time to action</p>
              <div class="space-y-1">
                <div v-for="d in stats.avg_duration" :key="`${d.tool_type}-${d.action}`" class="flex items-center justify-between">
                  <span class="text-xs text-slate-600 capitalize">{{ d.tool_type }} / {{ d.action }}</span>
                  <span class="text-xs font-semibold text-slate-800 tabular-nums">{{ formatDuration(d.avg_ms) }}</span>
                </div>
              </div>
            </div>

            <!-- Templates -->
            <div v-if="stats.templates?.length" class="mt-3 pt-3 border-t border-slate-50">
              <p class="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Email templates used</p>
              <div class="space-y-1">
                <div v-for="t in stats.templates" :key="t.template_name" class="flex items-center justify-between">
                  <span class="text-xs text-slate-600">{{ t.template_name }}</span>
                  <span class="text-xs font-semibold text-slate-800 tabular-nums">{{ t.count }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Top pages -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div class="bg-white rounded-xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold text-slate-700 mb-4">Top Pages (30d)</h2>
            <div v-if="!stats.top_pages?.length" class="text-sm text-slate-400">No data</div>
            <div v-else class="space-y-2">
              <div v-for="p in stats.top_pages" :key="p.page" class="flex items-center justify-between">
                <code class="text-xs text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded">{{ p.page }}</code>
                <span class="text-xs font-semibold text-slate-800 tabular-nums">{{ p.count }}</span>
              </div>
            </div>
          </div>

          <!-- Last 7 days detail -->
          <div class="bg-white rounded-xl border border-slate-100 p-6">
            <h2 class="text-sm font-bold text-slate-700 mb-4">Last 7 Days</h2>
            <div v-if="stats.last_7_days.length === 0" class="text-sm text-slate-400">No data yet.</div>
            <table v-else class="w-full text-sm">
              <thead>
                <tr class="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th class="text-left py-2 font-semibold">Date</th>
                  <th class="text-left py-2 font-semibold">Tool</th>
                  <th class="text-left py-2 font-semibold">Action</th>
                  <th class="text-right py-2 font-semibold">Count</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in stats.last_7_days" :key="i" class="border-b border-slate-50">
                  <td class="py-2 text-slate-600 tabular-nums">{{ formatDate(row.date) }}</td>
                  <td class="py-2 capitalize text-slate-600">{{ row.tool_type }}</td>
                  <td class="py-2 capitalize text-slate-600">{{ row.action }}</td>
                  <td class="py-2 text-right font-semibold text-slate-800 tabular-nums">{{ row.count }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- User Feedback -->
        <div class="bg-white rounded-xl border border-slate-100 p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-sm font-bold text-slate-700">User Feedback</h2>
            <button
              class="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              @click="fetchFeedback"
            >
              Refresh
            </button>
          </div>
          <div v-if="feedbackLoading" class="text-sm text-slate-400">Loading feedback...</div>
          <div v-else-if="!feedbackEntries.length" class="text-sm text-slate-400">No feedback yet.</div>
          <div v-else class="space-y-3">
            <div
              v-for="entry in feedbackEntries"
              :key="entry.id"
              class="bg-slate-50 rounded-lg p-4"
            >
              <div class="flex items-center gap-2 mb-2">
                <span
                  class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  :class="feedbackBadgeClass(entry.type)"
                >
                  {{ entry.type }}
                </span>
                <div class="flex gap-0.5">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    class="w-3.5 h-3.5"
                    :class="star <= entry.rating ? 'text-amber-400' : 'text-slate-200'"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <span class="text-[10px] text-slate-400 ml-auto tabular-nums">{{ formatDate(entry.created_at) }}</span>
              </div>
              <p class="text-sm text-slate-600 leading-relaxed">{{ entry.message }}</p>
              <p v-if="entry.page_path" class="text-[10px] text-slate-400 mt-1">Page: {{ entry.page_path }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useHead({ title: 'Admin - Content Preview Tools', robots: 'noindex, nofollow' })

const authenticated = ref(false)
const user = ref('')
const password = ref('')
const loginError = ref('')
const loggingIn = ref(false)
const loading = ref(false)

interface StatsRow { tool_type: string; action: string; count: number }
interface DayRow { date: string; count: number }
interface Stats {
  total_events: number
  unique_sessions_30d: number
  totals: StatsRow[]
  today: StatsRow[]
  last_7_days: (StatsRow & { date: string })[]
  last_30_days_daily: DayRow[]
  referrers: { referrer: string; count: number }[]
  viewports: { device: string; count: number }[]
  templates: { template_name: string; count: number }[]
  avg_duration: { tool_type: string; action: string; avg_ms: number }[]
  hourly_distribution: { hour: number; count: number }[]
  conversion: { tool_type: string; previews: number; exports: number }[]
  dark_mode_usage: { dark_mode: boolean; count: number }[]
  content_length: { tool_type: string; avg_len: number; max_len: number }[]
  image_usage: { with_image: number; without_image: number }
  comparison: {
    today_vs_yesterday: { today: number; yesterday: number }
    this_week_vs_last: { this_week: number; last_week: number }
  }
  top_pages: { page: string; count: number }[]
}

const stats = ref<Stats | null>(null)

interface FeedbackEntry {
  id: number
  type: string
  rating: number
  message: string
  page_path: string | null
  created_at: string
}

const feedbackEntries = ref<FeedbackEntry[]>([])
const feedbackLoading = ref(false)

const summaryCards = computed(() => {
  if (!stats.value) return []
  const t = stats.value.totals
  const sum = (tool?: string, action?: string) =>
    t.filter(r => (!tool || r.tool_type === tool) && (!action || r.action === action))
      .reduce((s, r) => s + r.count, 0)

  return [
    { label: 'Total Events', value: stats.value.total_events },
    { label: 'Sessions (30d)', value: stats.value.unique_sessions_30d },
    { label: 'Exports', value: sum(undefined, 'export') },
    {
      label: 'Today',
      value: stats.value.today.reduce((s, r) => s + r.count, 0),
      sub: stats.value.comparison.today_vs_yesterday.yesterday > 0
        ? `Yesterday: ${stats.value.comparison.today_vs_yesterday.yesterday}`
        : undefined,
      subColor: 'text-slate-400',
    },
  ]
})

const chartData = computed(() => {
  if (!stats.value?.last_30_days_daily.length) return []
  const days = stats.value.last_30_days_daily
  const max = Math.max(...days.map(d => d.count), 1)
  return days.map(d => ({
    date: formatDate(d.date),
    count: d.count,
    height: Math.max((d.count / max) * 100, 2),
  }))
})

const hourlyChart = computed(() => {
  if (!stats.value?.hourly_distribution?.length) return []
  // fill all 24 hours
  const map = new Map(stats.value.hourly_distribution.map(h => [h.hour, h.count]))
  const hours = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    label: `${i.toString().padStart(2, '0')}:00`,
    count: map.get(i) || 0,
  }))
  const max = Math.max(...hours.map(h => h.count), 1)
  return hours.map(h => ({ ...h, height: Math.max((h.count / max) * 100, 2) }))
})

function barWidth(count: number, items: { count: number }[]) {
  const max = Math.max(...items.map(i => i.count), 1)
  return Math.max((count / max) * 100, 5)
}

function percentChange(current: number, previous: number) {
  if (previous === 0 && current === 0) return { text: '—', color: 'text-slate-400' }
  if (previous === 0) return { text: '+100%', color: 'text-green-600' }
  const pct = Math.round(((current - previous) / previous) * 100)
  if (pct > 0) return { text: `+${pct}%`, color: 'text-green-600' }
  if (pct < 0) return { text: `${pct}%`, color: 'text-red-500' }
  return { text: '0%', color: 'text-slate-400' }
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatDuration(ms: number) {
  if (ms < 1000) return `${ms}ms`
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}s`
  return `${Math.floor(s / 60)}m ${s % 60}s`
}

async function login() {
  loginError.value = ''
  loggingIn.value = true
  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: { user: user.value, password: password.value },
    })
    authenticated.value = true
    password.value = ''
    await fetchStats()
  } catch {
    loginError.value = 'Invalid credentials'
  } finally {
    loggingIn.value = false
  }
}

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  authenticated.value = false
  stats.value = null
}

async function fetchStats() {
  loading.value = true
  try {
    stats.value = await $fetch('/api/admin/stats')
    authenticated.value = true
    await fetchFeedback()
  } catch {
    authenticated.value = false
  } finally {
    loading.value = false
  }
}

async function fetchFeedback() {
  feedbackLoading.value = true
  try {
    feedbackEntries.value = await $fetch('/api/admin/feedback')
  } catch {
    // ignore
  } finally {
    feedbackLoading.value = false
  }
}

function feedbackBadgeClass(type: string) {
  switch (type) {
    case 'bug': return 'bg-red-100 text-red-700'
    case 'suggestion': return 'bg-blue-100 text-blue-700'
    case 'praise': return 'bg-green-100 text-green-700'
    default: return 'bg-slate-100 text-slate-600'
  }
}

onMounted(() => {
  fetchStats()
})
</script>
