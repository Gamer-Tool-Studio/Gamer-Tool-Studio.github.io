<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const debug = getDebugger('app:pages:dashboard:index')
const store = useUserStore()
const route = useRoute()
const router = useRouter()

const { organization, user } = storeToRefs(store)

const orgName = ref('')
const orgId = ref('')
const isAdmin = computed(() => user.value.role === 'admin')
const saving = ref(false)
const saveMessage = ref('')

onMounted(async () => {
  // Fetch latest user profile with org data
  await store.fetchUserProfile()

  orgName.value = organization.value.name || ''
  orgId.value = organization.value.orgId || ''

  // Check for post-login purchase (from Hello.coop SSO flow)
  const purchasePriceId = route.query.purchase as string
  if (purchasePriceId) {
    debug.log('Post-login purchase detected on dashboard:', purchasePriceId)

    try {
      const { data, error } = await useAuthAPI<StripeCreateLink>('/stripe/create', 'POST', {
        price_id: purchasePriceId,
        mode: 'payment',
      })

      if (data.value && data.value.url) {
        debug.log('Redirecting to Stripe:', data.value.url)
        // Clear the purchase param from URL before redirecting
        router.replace({ query: {} })
        window.location.href = data.value.url
      }
      else {
        debug.log('Error creating Stripe session:', error.value)
      }
    }
    catch (error) {
      debug.log('Error in post-login purchase:', error)
    }
  }
})

async function updateOrganization() {
  if (!isAdmin.value) {
    saveMessage.value = 'Only admins can update organization settings'
    return
  }

  saving.value = true
  saveMessage.value = ''

  try {
    const { error } = await useAuthAPI('/user/organization/name', 'PATCH', {
      name: orgName.value,
    })

    if (error.value) {
      saveMessage.value = `Error: ${error.value.data?.error || 'Failed to update'}`
    }
    else {
      organization.value.name = orgName.value
      saveMessage.value = 'Organization name updated successfully!'
      setTimeout(() => {
        saveMessage.value = ''
      }, 3000)
    }
  }
  catch (e) {
    debug.log('Error updating organization', e)
    saveMessage.value = 'Error updating organization'
  }
  finally {
    saving.value = false
  }
}

useHead({
  title: 'Organization Settings',
})
</script>

<template>
  <v-container class="settings-page">
    <v-row>
      <v-col cols="12">
        <h1>Organization Settings</h1>
      </v-col>

      <!-- Admin Notice -->
      <v-col v-if="!isAdmin" cols="12">
        <v-alert
          type="info"
          variant="tonal"
          text="Only organization admins can modify these settings."
        />
      </v-col>

      <v-col>
        <v-form @submit.prevent="updateOrganization">
          <h4>Organization Name</h4>
          <label>
            Human-friendly label for your organization, shown in user interfaces
          </label>
          <v-text-field
            v-model="orgName"
            :disabled="!isAdmin || saving"
            placeholder="My Organization"
          />

          <h4>Organization ID</h4>
          <label>
            Unique identifier for this organization (used in API requests)
          </label>
          <v-text-field
            v-model="orgId"
            disabled
            readonly
            hint="This ID cannot be changed"
            persistent-hint
          />

          <!-- Save Message -->
          <v-alert
            v-if="saveMessage"
            :type="saveMessage.includes('Error') ? 'error' : 'success'"
            variant="tonal"
            class="mt-4"
          >
            {{ saveMessage }}
          </v-alert>

          <button
            v-if="isAdmin"
            class="button"
            type="submit"
            :disabled="saving"
          >
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.settings-page h4 {
  font-size: 24px;
  margin-bottom: 10px;
  margin-top: 15px;
}

.settings-page button {
  font-size: 20px;
}
</style>
