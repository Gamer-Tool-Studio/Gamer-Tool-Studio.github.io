<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

definePageMeta({
  layout: 'default',
})

const debug = getDebugger('app:pages:metrics')

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

onMounted(async () => {
  await fetchMetrics()
})

async function fetchMetrics() {
  loading.value = true
  error.value = ''

  try {
    const { data, error: apiError } = await useAuthAPI(
      `/metrics/admin/metrics?timeFilter=${timeFilter.value}`,
      'GET',
    )

    if (apiError.value) {
      error.value = apiError.value.data?.error || 'Failed to fetch metrics'
      debug.log('Error:', apiError.value)
    }
    else if (data.value) {
      metrics.value = data.value
      debug.log('Metrics loaded:', metrics.value)
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
    const { data, error: apiError } = await useAuthAPI(endpoint, 'GET')
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

        <!-- Overview Cards -->
        <v-row class="mt-4">
          <v-col cols="12">
            <h2 class="text-h4 mb-4 font-weight-bold">
              👥 User Metrics
            </h2>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-card
              elevation="3"
              class="metric-card clickable"
              @click="showDetails('users')"
            >
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-overline text-grey-darken-1">
                    Total Users
                  </div>
                  <v-icon color="primary">
                    mdi-account-multiple
                  </v-icon>
                </div>
                <div class="text-h3 font-weight-bold mt-2 primary--text">
                  {{ formatNumber(metrics.overview.totalUsers) }}
                </div>
                <div class="text-body-2 text-success mt-2">
                  <v-icon size="small" color="success">
                    mdi-arrow-up
                  </v-icon>
                  {{ formatNumber(metrics.overview.recentSignups) }} recent
                </div>
                <div class="text-caption text-grey mt-1">
                  Click to view details
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-card
              elevation="3"
              class="metric-card clickable"
              @click="showDetails('organizations')"
            >
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-overline text-grey-darken-1">
                    Organizations
                  </div>
                  <v-icon color="primary">
                    mdi-domain
                  </v-icon>
                </div>
                <div class="text-h3 font-weight-bold mt-2 primary--text">
                  {{ formatNumber(metrics.overview.totalOrganizations) }}
                </div>
                <div class="text-body-2 text-grey-darken-1 mt-2">
                  Organizations signed up
                </div>
                <div class="text-caption text-grey mt-1">
                  Click to view details
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-card elevation="3" class="metric-card">
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-overline text-grey-darken-1">
                    API Keys Generated
                  </div>
                  <v-icon color="primary">
                    mdi-key
                  </v-icon>
                </div>
                <div class="text-h3 font-weight-bold mt-2 primary--text">
                  {{ formatNumber(metrics.overview.totalApiKeys) }}
                </div>
                <div class="text-body-2 text-grey-darken-1 mt-2">
                  Total keys created
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Payment Metrics -->
        <v-row class="mt-6">
          <v-col cols="12">
            <h2 class="text-h4 mb-4 font-weight-bold">
              💰 Payment Metrics
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
                    Recent Revenue
                  </div>
                  <v-icon color="primary">
                    mdi-chart-line
                  </v-icon>
                </div>
                <div class="text-h3 font-weight-bold mt-2 primary--text">
                  {{ formatCurrency(metrics.payments.recentRevenue) }}
                </div>
                <div class="text-body-2 text-success mt-2">
                  <v-icon size="small" color="success">
                    mdi-calendar-month
                  </v-icon>
                  Based on filter
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card elevation="3" class="metric-card">
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-overline text-grey-darken-1">
                    Active Subscriptions
                  </div>
                  <v-icon color="primary">
                    mdi-account-check
                  </v-icon>
                </div>
                <div class="text-h3 font-weight-bold mt-2 primary--text">
                  {{ formatNumber(metrics.overview.activeSubscriptions) }}
                </div>
                <div class="text-body-2 text-grey-darken-1 mt-2">
                  Users with balance
                </div>
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

          <v-col cols="12" sm="6" md="4">
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

          <v-col cols="12" sm="6" md="4">
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

          <v-col cols="12" sm="6" md="4">
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
        </v-row>

        <!-- Usage Timeline -->
        <v-row v-if="metrics.apiUsage.usageTimeline.length > 0" class="mt-6">
          <v-col cols="12">
            <v-card elevation="3">
              <v-card-title class="text-h5 font-weight-bold">
                📈 API Usage Timeline
              </v-card-title>
              <v-card-text>
                <div class="timeline-container">
                  <div
                    v-for="day in metrics.apiUsage.usageTimeline"
                    :key="day.date"
                    class="timeline-item"
                  >
                    <div class="timeline-date">
                      {{ new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
                    </div>
                    <div class="timeline-bar">
                      <div
                        class="timeline-bar-fill"
                        :style="{ width: `${(day.calls / Math.max(...metrics.apiUsage.usageTimeline.map((d: any) => d.calls))) * 100}%` }"
                      />
                    </div>
                    <div class="timeline-value">
                      {{ formatNumber(day.calls) }} calls
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Empty State for Timeline -->
        <v-row v-else class="mt-6">
          <v-col cols="12">
            <v-card elevation="3">
              <v-card-title class="text-h5 font-weight-bold">
                📈 API Usage Timeline
              </v-card-title>
              <v-card-text>
                <v-alert type="info" variant="tonal">
                  No API usage data available for the selected time period.
                </v-alert>
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
