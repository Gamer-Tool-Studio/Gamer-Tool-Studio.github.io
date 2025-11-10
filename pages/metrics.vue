<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { ChartOptions } from 'chart.js'
import { Bar } from 'vue-chartjs'

definePageMeta({
  layout: 'default',
})

const debug = getDebugger('app:pages:metrics')

type UsageSummaryGroup = 'organization' | 'user' | 'key'

interface UsageSummaryEntry {
  id: string
  label: string
  secondaryLabel?: string
  totalCalls: number
  totalInputTokens: number
  totalOutputTokens: number
  metadata?: Record<string, any>
}

interface RevenueSummaryEntry {
  orgId: string
  orgName: string
  members: number
  totalRevenue: number
  totalPayments: number
  packs: Record<string, {
    label: string
    count: number
  }>
  hasUsedFreeTrial: boolean
}

const loading = ref(true)
const error = ref('')
const metrics = ref<any>(null)

const timeFilter = ref('all')
const timeFilterOptions = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: '7days', label: 'Last 7 Days' },
  { value: '30days', label: 'Last 30 Days' },
  { value: '90days', label: 'Last 90 Days' },
]

// Detailed data modal
const detailModal = ref(false)
const detailLoading = ref(false)
const detailType = ref('')
const detailData = ref<any[]>([])
const detailTitle = ref('')

// Usage summary state
const usageSummaryTab = ref<UsageSummaryGroup>('organization')
const usageSummary = ref<Record<UsageSummaryGroup, UsageSummaryEntry[]>>({
  organization: [],
  user: [],
  key: [],
})
const usageSummaryLoading = ref(false)
const usageSummaryError = ref('')

// Revenue summary state
const revenueSummary = ref<RevenueSummaryEntry[]>([])
const revenueLoading = ref(false)
const revenueError = ref('')

onMounted(async () => {
  await fetchMetrics()
})

async function fetchMetrics() {
  loading.value = true
  error.value = ''

  try {
    const { data, error: apiError } = (await useAuthAPI<any>(
      `/metrics/admin/metrics?timeFilter=${timeFilter.value}`,
      'GET',
    )) as any

    if (apiError.value) {
      error.value = apiError.value.data?.error || 'Failed to fetch metrics'
      debug.log('Error:', apiError.value)
    }
    else if (data.value) {
      metrics.value = data.value
      debug.log('Metrics loaded:', metrics.value)
      await Promise.all([
        fetchUsageSummary(),
        fetchRevenueSummary(),
      ])
    }
  }
  catch (e: any) {
    error.value = e.message || 'Error fetching metrics'
    debug.log('Exception:', e)
  }
  finally {
    loading.value = false
  }
}

async function fetchUsageSummary() {
  usageSummaryLoading.value = true
  usageSummaryError.value = ''

  const groupings: UsageSummaryGroup[] = ['organization', 'user', 'key']

  try {
    const responses = await Promise.all(groupings.map(group =>
      useAuthAPI<{ results: UsageSummaryEntry[] }>(
        '/metrics/admin/api-usage-summary',
        'GET',
        undefined,
        {
          groupBy: group,
          timeFilter: timeFilter.value,
        },
      ),
    )) as any[]

    groupings.forEach((group, index) => {
      const { data, error: apiError } = responses[index] as any
      if (apiError.value)
        throw new Error(apiError.value.data?.error || `Failed to fetch usage summary (${group})`)

      usageSummary.value[group] = data.value?.results || []
    })
  }
  catch (e: any) {
    usageSummaryError.value = e.message || 'Error fetching usage summary'
    debug.log('Usage summary error:', e)
    usageSummary.value = {
      organization: [],
      user: [],
      key: [],
    }
  }
  finally {
    usageSummaryLoading.value = false
  }
}

async function fetchRevenueSummary() {
  revenueLoading.value = true
  revenueError.value = ''

  try {
    const { data, error: apiError } = (await useAuthAPI<{
      results: RevenueSummaryEntry[]
    }>(
      '/metrics/admin/revenue-summary',
      'GET',
      undefined,
      {
        timeFilter: timeFilter.value,
      },
    )) as any

    if (apiError.value)
      throw new Error(apiError.value.data?.error || 'Failed to fetch revenue summary')

    revenueSummary.value = data.value?.results || []
  }
  catch (e: any) {
    revenueError.value = e.message || 'Error fetching revenue summary'
    debug.log('Revenue summary error:', e)
    revenueSummary.value = []
  }
  finally {
    revenueLoading.value = false
  }
}

async function showDetails(type: string) {
  detailType.value = type
  detailModal.value = true
  detailLoading.value = true
  detailData.value = []

  let endpoint = ''
  switch (type) {
    case 'users':
      detailTitle.value = 'User List'
      endpoint = `/metrics/admin/users?timeFilter=${timeFilter.value}`
      break
    case 'organizations':
      detailTitle.value = 'Organization List'
      endpoint = `/metrics/admin/organizations?timeFilter=${timeFilter.value}`
      break
    case 'payments':
      detailTitle.value = 'Payment History'
      endpoint = `/metrics/admin/payments?timeFilter=${timeFilter.value}`
      break
    case 'api-usage':
      detailTitle.value = 'API Usage Records'
      endpoint = `/metrics/admin/api-usage?timeFilter=${timeFilter.value}&limit=200`
      break
  }

  try {
    const { data, error: apiError } = (await useAuthAPI<{
      users?: any[]
      payments?: any[]
      organizations?: any[]
      usage?: any[]
    }>(endpoint, 'GET')) as any
    if (data.value && !apiError.value) {
      // Extract the data array from the response
      detailData.value = data.value.users || data.value.payments || data.value.organizations || data.value.usage || []
      debug.log(`${type} data loaded:`, detailData.value)
    }
  }
  catch (e: any) {
    debug.log(`Error loading ${type}:`, e)
  }
  finally {
    detailLoading.value = false
  }
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num)
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

function formatDate(date: string | Date): string {
  if (!date)
    return 'N/A'
  return new Date(date).toLocaleString()
}

const overviewCards = computed(() => {
  if (!metrics.value)
    return []

  const overview = metrics.value.overview || {}
  const payments = metrics.value.payments || {}
  const apiUsage = metrics.value.apiUsage || {}

  return [
    {
      title: 'Organizations',
      value: formatNumber(overview.totalOrganizations || 0),
      icon: 'mdi-domain',
      iconColor: 'primary',
    },
    {
      title: 'Users',
      value: formatNumber(overview.totalUsers || 0),
      icon: 'mdi-account-multiple',
      iconColor: 'primary',
    },
    {
      title: 'Active API Keys',
      value: formatNumber(overview.activeApiKeys ?? overview.totalApiKeys ?? 0),
      icon: 'mdi-key',
      iconColor: 'primary',
    },
    {
      title: 'Active Accounts',
      value: formatNumber(overview.activeSubscriptions || 0),
      icon: 'mdi-account-check',
      iconColor: 'success',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(payments.totalRevenue || 0),
      icon: 'mdi-currency-usd',
      iconColor: 'success',
    },
    {
      title: 'Total Payments',
      value: formatNumber(payments.totalPayments || 0),
      icon: 'mdi-cash-multiple',
      iconColor: 'success',
    },
    {
      title: 'API Calls',
      value: formatNumber(apiUsage.totalCalls || 0),
      icon: 'mdi-api',
      iconColor: 'primary',
    },
    {
      title: 'Input Tokens',
      value: formatNumber(apiUsage.totalInputTokens || 0),
      icon: 'mdi-download',
      iconColor: 'primary',
    },
    {
      title: 'Output Tokens',
      value: formatNumber(apiUsage.totalOutputTokens || 0),
      icon: 'mdi-upload',
      iconColor: 'primary',
    },
  ]
})

const usageSummaryHeaders = computed(() => {
  switch (usageSummaryTab.value) {
    case 'organization':
      return [
        { title: 'Organization', key: 'label' },
        { title: 'Members', key: 'membersDisplay' },
        { title: 'API Calls', key: 'totalCallsDisplay' },
        { title: 'Input Tokens', key: 'totalInputTokensDisplay' },
        { title: 'Output Tokens', key: 'totalOutputTokensDisplay' },
      ]
    case 'user':
      return [
        { title: 'User Email', key: 'label' },
        { title: 'Name', key: 'secondaryLabel' },
        { title: 'Organization', key: 'organizationName' },
        { title: 'API Calls', key: 'totalCallsDisplay' },
        { title: 'Input Tokens', key: 'totalInputTokensDisplay' },
        { title: 'Output Tokens', key: 'totalOutputTokensDisplay' },
      ]
    case 'key':
      return [
        { title: 'API Key', key: 'label' },
        { title: 'Owner Email', key: 'userEmail' },
        { title: 'Organization', key: 'organizationName' },
        { title: 'API Calls', key: 'totalCallsDisplay' },
        { title: 'Input Tokens', key: 'totalInputTokensDisplay' },
        { title: 'Output Tokens', key: 'totalOutputTokensDisplay' },
      ]
    default:
      return []
  }
})

const currentUsageItems = computed(() => {
  const data = usageSummary.value[usageSummaryTab.value] || []

  if (usageSummaryTab.value === 'organization') {
    return data.map(entry => ({
      ...entry,
      membersDisplay: formatNumber(entry.metadata?.members ?? 0),
      totalCallsDisplay: formatNumber(entry.totalCalls || 0),
      totalInputTokensDisplay: formatNumber(entry.totalInputTokens || 0),
      totalOutputTokensDisplay: formatNumber(entry.totalOutputTokens || 0),
    }))
  }

  if (usageSummaryTab.value === 'user') {
    return data.map(entry => ({
      ...entry,
      organizationName: entry.metadata?.organizationName || '',
      totalCallsDisplay: formatNumber(entry.totalCalls || 0),
      totalInputTokensDisplay: formatNumber(entry.totalInputTokens || 0),
      totalOutputTokensDisplay: formatNumber(entry.totalOutputTokens || 0),
    }))
  }

  // groupBy === 'key'
  return data.map(entry => ({
    ...entry,
    userEmail: entry.metadata?.userEmail || '',
    organizationName: entry.metadata?.organizationName || '',
    totalCallsDisplay: formatNumber(entry.totalCalls || 0),
    totalInputTokensDisplay: formatNumber(entry.totalInputTokens || 0),
    totalOutputTokensDisplay: formatNumber(entry.totalOutputTokens || 0),
  }))
})

const revenuePackColumns = computed(() => {
  const unique = new Map<string, {
    label: string
    packKey: string
  }>()

  revenueSummary.value.forEach((entry) => {
    Object.entries(entry.packs || {}).forEach(([key, pack]) => {
      if (!unique.has(key) && pack.count > 0)
        unique.set(key, { label: pack.label, packKey: key })
    })
  })

  return Array.from(unique.entries()).map(([key, value]) => ({
    key: `pack_${key}`,
    label: value.label,
    packKey: value.packKey,
  }))
})

const revenueHeaders = computed(() => {
  const baseHeaders = [
    { title: 'Organization', key: 'orgName' },
    { title: 'Members', key: 'membersDisplay' },
    { title: 'Total Revenue', key: 'totalRevenueDisplay' },
    { title: 'Payments', key: 'totalPaymentsDisplay' },
  ]

  const packHeaders = revenuePackColumns.value.map(pack => ({
    title: pack.label,
    key: pack.key,
  }))

  return [...baseHeaders, ...packHeaders]
})

const revenueItems = computed(() => {
  return revenueSummary.value.map((entry) => {
    const item: Record<string, any> = {
      orgName: entry.orgName,
      membersDisplay: formatNumber(entry.members),
      totalRevenueDisplay: formatCurrency(entry.totalRevenue),
      totalPaymentsDisplay: formatNumber(entry.totalPayments),
    }

    revenuePackColumns.value.forEach((pack) => {
      const packData = entry.packs?.[pack.packKey]
      item[pack.key] = formatNumber(packData?.count || 0)
    })

    return item
  })
})

const usageCallsChartData = computed(() => {
  const items = usageSummary.value[usageSummaryTab.value] || []
  return {
    labels: items.map(item => item.label || 'Unknown'),
    datasets: [
      {
        label: 'API Calls',
        backgroundColor: '#6200EE',
        data: items.map(item => item.totalCalls || 0),
        borderRadius: 6,
        maxBarThickness: 48,
      },
    ],
  }
})

const usageTokensChartData = computed(() => {
  const items = usageSummary.value[usageSummaryTab.value] || []
  return {
    labels: items.map(item => item.label || 'Unknown'),
    datasets: [
      {
        label: 'Input Tokens',
        backgroundColor: '#6200EE',
        data: items.map(item => item.totalInputTokens || 0),
        borderRadius: 6,
        maxBarThickness: 48,
      },
      {
        label: 'Output Tokens',
        backgroundColor: '#C834A4',
        data: items.map(item => item.totalOutputTokens || 0),
        borderRadius: 6,
        maxBarThickness: 48,
      },
    ],
  }
})

const baseBarChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
        boxWidth: 12,
      },
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const value = context.parsed.y ?? context.parsed
          return `${context.dataset.label}: ${formatNumber(value)}`
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#616161',
        maxRotation: 35,
        minRotation: 0,
        autoSkip: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        color: '#616161',
        callback: (value: number | string) => formatNumber(Number(value)),
      },
      beginAtZero: true,
    },
  },
}

const revenueChartData = computed(() => ({
  labels: revenueSummary.value.map(entry => entry.orgName || 'No Organization'),
  datasets: [
    {
      label: 'Revenue (USD)',
      backgroundColor: '#4CAF50',
      data: revenueSummary.value.map(entry => entry.totalRevenue || 0),
      borderRadius: 6,
      maxBarThickness: 48,
    },
  ],
}))

const packColors = ['#6200EE', '#C834A4', '#00ACC1', '#F9A825', '#8E44AD', '#EF6C00', '#009688']

const revenuePackChartData = computed(() => {
  const labels = revenueSummary.value.map(entry => entry.orgName || 'No Organization')

  const datasets = revenuePackColumns.value.map((pack, index) => ({
    label: pack.label,
    backgroundColor: packColors[index % packColors.length],
    data: revenueSummary.value.map(entry => entry.packs?.[pack.packKey]?.count || 0),
    maxBarThickness: 48,
    borderRadius: 6,
    stack: 'packs',
  }))

  return { labels, datasets }
})

const stackedBarChartOptions: ChartOptions<'bar'> = {
  ...baseBarChartOptions,
  scales: {
    ...(baseBarChartOptions.scales ?? {}),
    x: {
      ...(baseBarChartOptions.scales?.x ?? {}),
      stacked: true,
    },
    y: {
      ...(baseBarChartOptions.scales?.y ?? {}),
      stacked: true,
    },
  },
}

const detailHeaders = computed(() => {
  switch (detailType.value) {
    case 'users':
      return [
        { title: 'Email', key: 'email' },
        { title: 'Name', key: 'name' },
        { title: 'Auth Provider', key: 'authProvider' },
        { title: 'Role', key: 'role' },
        { title: 'API Keys', key: 'apiKeys' },
        { title: 'Created', key: 'createdAt' },
      ]
    case 'organizations':
      return [
        { title: 'Name', key: 'name' },
        { title: 'Org ID', key: 'orgId' },
        { title: 'Members', key: 'memberCount' },
        { title: 'Created', key: 'createdAt' },
      ]
    case 'payments':
      return [
        { title: 'Session ID', key: 'sessionId' },
        { title: 'Customer Email', key: 'customerEmail' },
        { title: 'Amount', key: 'amount' },
        { title: 'Status', key: 'status' },
        { title: 'Date', key: 'date' },
      ]
    case 'api-usage':
      return [
        { title: 'Date', key: 'date' },
        { title: 'Account ID', key: 'accountId' },
        { title: 'Input Tokens', key: 'inputTokens' },
        { title: 'Output Tokens', key: 'outputTokens' },
      ]
    default:
      return []
  }
})

useHead({
  title: 'Metrics Dashboard - Admin Only',
})
</script>

<template>
  <div class="metrics-page">
    <v-container>
      <!-- Loading State -->
      <template v-if="loading">
        <v-row>
          <v-col cols="12" class="text-center py-16">
            <v-progress-circular indeterminate color="primary" size="64" />
            <p class="mt-4 text-h6">
              Loading metrics...
            </p>
          </v-col>
        </v-row>
      </template>

      <!-- Error State -->
      <template v-else-if="error">
        <v-row>
          <v-col cols="12">
            <v-alert type="error" prominent border="start">
              <v-alert-title class="text-h5">
                {{ error.includes('Unauthorized') ? '🔒 Unauthorized Access' : '⚠️ Error' }}
              </v-alert-title>
              <div class="mt-2">
                {{ error }}
              </div>
              <div v-if="error.includes('Unauthorized')" class="mt-2 text-body-2">
                This page is restricted to administrators only.
              </div>
            </v-alert>
            <v-btn
              v-if="!error.includes('Unauthorized')"
              color="primary"
              class="mt-4"
              size="large"
              @click="fetchMetrics"
            >
              Retry
            </v-btn>
          </v-col>
        </v-row>
      </template>

      <!-- Metrics Dashboard -->
      <template v-else-if="metrics">
        <v-row>
          <v-col cols="12">
            <div class="d-flex justify-space-between align-center mb-4 flex-wrap ga-4">
              <div>
                <h1 class="text-h3 font-weight-bold">
                  📊 Platform Metrics
                </h1>
                <p class="text-grey-darken-1 text-body-1 mt-2">
                  Last updated: {{ new Date(metrics.timestamp).toLocaleString() }}
                </p>
              </div>

              <div class="d-flex align-center ga-2 flex-wrap">
                <v-select
                  v-model="timeFilter"
                  :items="timeFilterOptions"
                  item-title="label"
                  item-value="value"
                  density="comfortable"
                  variant="outlined"
                  hide-details
                  style="min-width: 200px"
                  @update:model-value="fetchMetrics"
                >
                  <template #prepend-inner>
                    <v-icon size="small">
                      mdi-calendar
                    </v-icon>
                  </template>
                </v-select>

                <v-btn
                  color="primary"
                  variant="outlined"
                  prepend-icon="mdi-refresh"
                  size="large"
                  @click="fetchMetrics"
                >
                  Refresh
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- Summary Dashboard -->
        <v-row class="mt-4">
          <v-col
            v-for="card in overviewCards"
            :key="card.title"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
          >
            <v-card elevation="3" class="metric-card summary-card">
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-overline text-grey-darken-1">
                    {{ card.title }}
                  </div>
                  <v-icon :color="card.iconColor" size="30">
                    {{ card.icon }}
                  </v-icon>
                </div>
                <div class="text-h4 font-weight-bold mt-3 primary--text">
                  {{ card.value }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Revenue Metrics -->
        <v-row class="mt-6">
          <v-col cols="12">
            <h2 class="text-h4 mb-4 font-weight-bold">
              💰 Revenue Metrics
            </h2>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card elevation="3" color="success" dark class="metric-card">
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-overline">
                    Total Revenue
                  </div>
                  <v-icon>mdi-currency-usd</v-icon>
                </div>
                <div class="text-h3 font-weight-bold mt-2">
                  {{ formatCurrency(metrics.payments.totalRevenue) }}
                </div>
                <div class="text-body-2 mt-2">
                  All-time revenue
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card
              elevation="3"
              class="metric-card clickable"
              @click="showDetails('payments')"
            >
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-overline text-grey-darken-1">
                    Total Payments
                  </div>
                  <v-icon color="primary">
                    mdi-cash-multiple
                  </v-icon>
                </div>
                <div class="text-h3 font-weight-bold mt-2 primary--text">
                  {{ formatNumber(metrics.payments.totalPayments) }}
                </div>
                <div class="text-body-2 text-grey-darken-1 mt-2">
                  Successful transactions
                </div>
                <div class="text-caption text-grey mt-1">
                  Click to view details
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card elevation="3" class="metric-card">
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-overline text-grey-darken-1">
                    Free Subscriptions
                  </div>
                  <v-icon color="primary">
                    mdi-account-plus
                  </v-icon>
                </div>
                <div class="text-h3 font-weight-bold mt-2 primary--text">
                  {{ formatNumber(metrics.payments.freeTrialSubscriptions || 0) }}
                </div>
                <div class="text-body-2 text-success mt-2">
                  Organizations currently on free trial
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card elevation="3" class="metric-card">
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-overline text-grey-darken-1">
                    New Organizations
                  </div>
                  <v-icon color="primary">
                    mdi-domain-plus
                  </v-icon>
                </div>
                <div class="text-h3 font-weight-bold mt-2 primary--text">
                  {{ formatNumber(metrics.overview.newOrganizations || 0) }}
                </div>
                <div class="text-body-2 text-grey-darken-1 mt-2">
                  Created during selected window
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Revenue & Packs Breakdown -->
        <v-row class="mt-6">
          <v-col cols="12">
            <v-card elevation="3">
              <v-card-title class="d-flex justify-space-between align-center flex-wrap ga-2">
                <div>
                  <h2 class="text-h5 font-weight-bold mb-1">
                    💸 Revenue & Pack Purchases by Organization
                  </h2>
                  <p class="text-body-2 text-grey-darken-1 mb-0">
                    Track revenue and pack adoption (free trial, Solo, Indie, Enterprise) per organization.
                  </p>
                </div>
                <v-btn
                  variant="text"
                  color="primary"
                  prepend-icon="mdi-refresh"
                  :loading="revenueLoading"
                  @click="fetchRevenueSummary"
                >
                  Refresh
                </v-btn>
              </v-card-title>
              <v-divider />
              <v-card-text>
                <v-alert
                  v-if="revenueError"
                  type="error"
                  class="mb-4"
                  border="start"
                  prominent
                >
                  {{ revenueError }}
                </v-alert>

                <v-progress-linear
                  v-else-if="revenueLoading"
                  indeterminate
                  color="primary"
                  class="mb-4"
                />

                <template v-else>
                  <v-row class="chart-grid">
                    <v-col cols="12" md="6">
                      <div class="chart-wrapper">
                        <Bar
                          v-if="revenueChartData.labels.length"
                          :data="revenueChartData"
                          :options="baseBarChartOptions"
                        />
                        <v-alert v-else type="info" variant="tonal">
                          No revenue data available for this period.
                        </v-alert>
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="chart-wrapper">
                        <Bar
                          v-if="revenuePackChartData.labels.length && revenuePackChartData.datasets.length"
                          :data="revenuePackChartData"
                          :options="stackedBarChartOptions"
                        />
                        <v-alert v-else type="info" variant="tonal">
                          No pack purchase data available for this period.
                        </v-alert>
                      </div>
                    </v-col>
                  </v-row>

                  <v-divider class="my-6" />

                  <v-alert
                    v-if="revenueItems.length === 0"
                    type="info"
                    variant="tonal"
                    class="mb-2"
                  >
                    No revenue data available for the selected time period.
                  </v-alert>

                  <v-data-table
                    v-else
                    :headers="revenueHeaders"
                    :items="revenueItems"
                    :items-per-page="10"
                    class="elevation-0"
                    hover
                  />
                </template>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!-- API Usage Metrics -->
        <v-row class="mt-6">
          <v-col cols="12">
            <h2 class="text-h4 mb-4 font-weight-bold">
              🔌 API Usage
            </h2>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card
              elevation="3"
              class="metric-card clickable"
              @click="showDetails('api-usage')"
            >
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-overline text-grey-darken-1">
                    Total API Calls
                  </div>
                  <v-icon color="primary">
                    mdi-api
                  </v-icon>
                </div>
                <div class="text-h3 font-weight-bold mt-2 primary--text">
                  {{ formatNumber(metrics.apiUsage.totalCalls) }}
                </div>
                <div class="text-body-2 text-grey-darken-1 mt-2">
                  API requests
                </div>
                <div class="text-caption text-grey mt-1">
                  Click to view details
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card elevation="3" class="metric-card">
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-overline text-grey-darken-1">
                    Input Tokens
                  </div>
                  <v-icon color="primary">
                    mdi-download
                  </v-icon>
                </div>
                <div class="text-h3 font-weight-bold mt-2 primary--text">
                  {{ formatNumber(metrics.apiUsage.totalInputTokens) }}
                </div>
                <div class="text-body-2 text-grey-darken-1 mt-2">
                  Total input tokens used
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card elevation="3" class="metric-card">
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-overline text-grey-darken-1">
                    Output Tokens
                  </div>
                  <v-icon color="primary">
                    mdi-upload
                  </v-icon>
                </div>
                <div class="text-h3 font-weight-bold mt-2 primary--text">
                  {{ formatNumber(metrics.apiUsage.totalOutputTokens) }}
                </div>
                <div class="text-body-2 text-grey-darken-1 mt-2">
                  Total output tokens used
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card elevation="3" class="metric-card">
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-overline text-grey-darken-1">
                    Active API Keys
                  </div>
                  <v-icon color="primary">
                    mdi-key-chain-variant
                  </v-icon>
                </div>
                <div class="text-h3 font-weight-bold mt-2 primary--text">
                  {{ formatNumber(metrics.apiUsage.activeApiKeys || 0) }}
                </div>
                <div class="text-body-2 text-grey-darken-1 mt-2">
                  Used in the last 30 days
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- API Usage Breakdown -->
        <v-row class="mt-6">
          <v-col cols="12">
            <v-card elevation="3">
              <v-card-title class="d-flex justify-space-between align-center flex-wrap ga-2">
                <div>
                  <h2 class="text-h5 font-weight-bold mb-1">
                    🔌 API Usage Breakdown
                  </h2>
                  <p class="text-body-2 text-grey-darken-1 mb-0">
                    Analyze total API calls and tokens by organization, user, or API key.
                  </p>
                </div>
                <v-btn
                  variant="text"
                  color="primary"
                  prepend-icon="mdi-refresh"
                  :loading="usageSummaryLoading"
                  @click="fetchUsageSummary"
                >
                  Refresh
                </v-btn>
              </v-card-title>
              <v-divider />
              <v-tabs v-model="usageSummaryTab" align-tabs="center" color="primary">
                <v-tab value="organization">
                  By Organization
                </v-tab>
                <v-tab value="user">
                  By User
                </v-tab>
                <v-tab value="key">
                  By API Key
                </v-tab>
              </v-tabs>
              <v-card-text>
                <v-alert
                  v-if="usageSummaryError"
                  type="error"
                  class="mb-4"
                  prominent
                  border="start"
                >
                  {{ usageSummaryError }}
                </v-alert>

                <v-progress-linear
                  v-else-if="usageSummaryLoading"
                  indeterminate
                  color="primary"
                  class="mb-4"
                />

                <template v-else>
                  <v-row class="chart-grid">
                    <v-col cols="12" md="6">
                      <div class="chart-wrapper">
                        <Bar
                          v-if="usageCallsChartData.labels.length"
                          :data="usageCallsChartData"
                          :options="baseBarChartOptions"
                        />
                        <v-alert v-else type="info" variant="tonal">
                          No API call data available for this view.
                        </v-alert>
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="chart-wrapper">
                        <Bar
                          v-if="usageTokensChartData.labels.length"
                          :data="usageTokensChartData"
                          :options="baseBarChartOptions"
                        />
                        <v-alert v-else type="info" variant="tonal">
                          No token consumption data available for this view.
                        </v-alert>
                      </div>
                    </v-col>
                  </v-row>

                  <v-divider class="my-6" />

                  <v-alert
                    v-if="currentUsageItems.length === 0"
                    type="info"
                    variant="tonal"
                    class="mb-2"
                  >
                    No usage data available for the selected time period.
                  </v-alert>

                  <v-data-table
                    v-else
                    :headers="usageSummaryHeaders"
                    :items="currentUsageItems"
                    :items-per-page="10"
                    class="elevation-0"
                    hover
                  />
                </template>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </template>
    </v-container>

    <!-- Detail Modal -->
    <v-dialog v-model="detailModal" max-width="1200px" scrollable>
      <v-card>
        <v-card-title class="text-h5 font-weight-bold d-flex justify-space-between align-center">
          <span>{{ detailTitle }}</span>
          <v-btn icon variant="text" @click="detailModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-card-text style="max-height: 600px">
          <v-progress-circular v-if="detailLoading" indeterminate class="mx-auto d-block my-8" />

          <v-data-table
            v-else-if="detailData.length > 0"
            :headers="detailHeaders"
            :items="detailData"
            :items-per-page="10"
            class="elevation-0"
          >
            <template #[`item.createdAt`]="{ item }">
              {{ formatDate(item.createdAt) }}
            </template>
            <template #[`item.date`]="{ item }">
              {{ formatDate(item.date) }}
            </template>
            <template #[`item.amount`]="{ item }">
              {{ formatCurrency(item.amount) }}
            </template>
            <template #[`item.status`]="{ item }">
              <v-chip :color="item.status === 'paid' ? 'success' : 'warning'" size="small">
                {{ item.status }}
              </v-chip>
            </template>
            <template #[`item.authProvider`]="{ item }">
              <v-chip size="small">
                {{ item.authProvider }}
              </v-chip>
            </template>
            <template #[`item.role`]="{ item }">
              <v-chip :color="item.role === 'admin' ? 'primary' : 'default'" size="small">
                {{ item.role }}
              </v-chip>
            </template>
          </v-data-table>

          <v-alert v-else type="info" variant="tonal">
            No data available for the selected time period.
          </v-alert>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" variant="text" @click="detailModal = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.metrics-page {
  padding: 40px 0;
  min-height: 100vh;
  background: #f5f5f5;

  .summary-card {
    height: 100%;
  }

  .summary-card .text-h4 {
    font-size: clamp(1.75rem, 2.5vw, 2.5rem);
  }

  .metric-card {
    height: 100%;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &.clickable {
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
      }
    }

    &:not(.clickable):hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12) !important;
    }
  }

  .timeline-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px 0;
  }

  .timeline-item {
    display: grid;
    grid-template-columns: 80px 1fr 120px;
    align-items: center;
    gap: 16px;
  }

  .timeline-date {
    font-size: 13px;
    color: #666;
    text-align: right;
    font-weight: 500;
  }

  .timeline-bar {
    height: 28px;
    background: #e0e0e0;
    border-radius: 6px;
    overflow: hidden;
  }

  .timeline-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #4CAF50, #81C784);
    transition: width 0.3s ease;
    border-radius: 6px;
  }

  .timeline-value {
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  .chart-grid {
    margin-top: 8px;
  }

  .chart-wrapper {
    background: #fff;
    border-radius: 16px;
    padding: 16px;
    height: 320px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 960px) {
    .chart-wrapper {
      height: 260px;
    }
  }
}

@media (max-width: 600px) {
  .metrics-page {
    .timeline-item {
      grid-template-columns: 60px 1fr 100px;
      gap: 12px;
    }

    .timeline-date {
      font-size: 11px;
    }

    .timeline-value {
      font-size: 12px;
    }
  }
}
</style>
