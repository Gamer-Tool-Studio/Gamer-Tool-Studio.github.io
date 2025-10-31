<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const debug = getDebugger('app:pages:dashboard:profile')
const store = useUserStore()

const { user } = storeToRefs(store)

const isEditing = ref(false)
const editedName = ref('')
const usageStats = ref({
  totalCalls: 0,
  totalInputTokens: 0,
  totalOutputTokens: 0,
})
const loadingStats = ref(true)
const uploadingPicture = ref(false)

onMounted(async () => {
  editedName.value = user.value.name || user.value.username || ''
  await fetchUsageStats()
})

async function fetchUsageStats() {
  loadingStats.value = true
  try {
    const { data, error } = await useAuthAPI('/user/usage-stats', 'GET')

    if (data.value && !error.value) {
      usageStats.value = data.value
      debug.log('Usage stats loaded:', usageStats.value)
    }
  }
  catch (e) {
    debug.log('Error fetching usage stats:', e)
  }
  finally {
    loadingStats.value = false
  }
}

async function updateProfile() {
  debug.log('Updating profile', editedName.value)

  try {
    const { error } = await useAuthAPI('/user/update-profile', 'PATCH', {
      name: editedName.value,
    })

    if (!error.value) {
      user.value.name = editedName.value
      isEditing.value = false
    }
  }
  catch (error) {
    debug.log('Error updating profile', error)
  }
}

function cancelEdit() {
  editedName.value = user.value.name || user.value.username || ''
  isEditing.value = false
}

function triggerFileUpload() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async (e: any) => {
    const file = e.target?.files?.[0]
    if (file)
      await uploadProfilePicture(file)
  }
  input.click()
}

async function uploadProfilePicture(file: File) {
  if (!file.type.startsWith('image/')) {
    // eslint-disable-next-line no-alert
    alert('Please select an image file')
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    // eslint-disable-next-line no-alert
    alert('Image size must be less than 5MB')
    return
  }

  uploadingPicture.value = true

  try {
    const reader = new FileReader()
    reader.onload = async (e) => {
      const base64Image = e.target?.result as string

      const { data, error } = await useAuthAPI('/user/update-picture', 'PATCH', {
        picture: base64Image,
      })

      if (!error.value && data.value) {
        user.value.picture = base64Image
        debug.log('Profile picture updated')
      }
      else {
        // eslint-disable-next-line no-alert
        alert('Failed to update profile picture')
      }

      uploadingPicture.value = false
    }
    reader.readAsDataURL(file)
  }
  catch (error) {
    debug.log('Error uploading picture:', error)
    // eslint-disable-next-line no-alert
    alert('Failed to upload picture')
    uploadingPicture.value = false
  }
}

useHead({
  title: 'Profile',
})
</script>

<template>
  <v-container class="profile-page">
    <v-row>
      <v-col cols="12">
        <h1>Profile</h1>
      </v-col>

      <!-- Profile Information -->
      <v-col cols="12">
        <v-card elevation="0" class="pa-4">
          <v-card-title>
            <h3>Personal Information</h3>
          </v-card-title>
          <v-card-text>
            <v-row>
              <!-- Profile Picture -->
              <v-col cols="12" md="3" class="text-center">
                <div class="profile-picture-wrapper">
                  <div class="avatar-container">
                    <v-avatar
                      size="150"
                      color="primary"
                    >
                      <v-img
                        v-if="user.picture"
                        :src="user.picture"
                        alt="Profile picture"
                      />
                      <span v-else class="text-h3 text-white">
                        {{ (user.name || user.username || user.email)?.[0]?.toUpperCase() }}
                      </span>
                    </v-avatar>
                    <button
                      class="change-picture-btn"
                      :disabled="uploadingPicture"
                      :title="uploadingPicture ? 'Uploading...' : 'Change Picture'"
                      @click="triggerFileUpload"
                    >
                      <v-icon size="18" color="white">
                        {{ uploadingPicture ? 'mdi-loading mdi-spin' : 'mdi-pencil' }}
                      </v-icon>
                    </button>
                  </div>
                </div>
              </v-col>

              <!-- Profile Details -->
              <v-col cols="12" md="9">
                <!-- Name -->
                <div class="info-row-horizontal">
                  <div class="info-content">
                    <h4>Name</h4>
                    <template v-if="!isEditing">
                      <p>{{ user.name || user.username }}</p>
                    </template>
                    <template v-else>
                      <v-text-field
                        v-model="editedName"
                        density="compact"
                        variant="outlined"
                        hide-details
                        class="edit-input"
                      />
                    </template>
                  </div>
                  <div class="info-actions">
                    <template v-if="!isEditing">
                      <v-btn
                        size="small"
                        variant="text"
                        color="primary"
                        @click="isEditing = true"
                      >
                        Edit
                      </v-btn>
                    </template>
                    <template v-else>
                      <v-btn
                        size="small"
                        color="primary"
                        @click="updateProfile"
                      >
                        Save
                      </v-btn>
                      <v-btn
                        size="small"
                        variant="text"
                        @click="cancelEdit"
                      >
                        Cancel
                      </v-btn>
                    </template>
                  </div>
                </div>

                <!-- Email -->
                <div class="info-row-horizontal">
                  <div class="info-content">
                    <h4>Email</h4>
                    <p>{{ user.email }}</p>
                  </div>
                  <div class="info-actions">
                    <v-chip
                      v-if="user.emailVerified"
                      size="small"
                      color="success"
                      variant="flat"
                    >
                      Verified
                    </v-chip>
                  </div>
                </div>

                <!-- Role -->
                <div class="info-row-horizontal">
                  <div class="info-content">
                    <h4>Role</h4>
                    <p>
                      <v-chip
                        size="small"
                        :color="user.role === 'admin' ? 'orange' : 'grey'"
                        variant="flat"
                      >
                        {{ user.role?.toUpperCase() }}
                      </v-chip>
                    </p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Usage Statistics -->
      <v-col cols="12">
        <v-card elevation="0" class="pa-4">
          <v-card-title>
            <h3>API Usage Statistics</h3>
          </v-card-title>
          <v-card-text>
            <v-row v-if="loadingStats" class="text-center">
              <v-col cols="12">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  size="32"
                />
                <p class="mt-2">
                  Loading usage stats...
                </p>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12" md="4">
                <div class="stat-card">
                  <v-icon size="40" color="primary">
                    mdi-api
                  </v-icon>
                  <h2>{{ usageStats.totalCalls.toLocaleString() }}</h2>
                  <p>Total API Calls</p>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="stat-card">
                  <v-icon size="40" color="success">
                    mdi-arrow-down-bold
                  </v-icon>
                  <h2>{{ usageStats.totalInputTokens.toLocaleString() }}</h2>
                  <p>Input Tokens</p>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="stat-card">
                  <v-icon size="40" color="warning">
                    mdi-arrow-up-bold
                  </v-icon>
                  <h2>{{ usageStats.totalOutputTokens.toLocaleString() }}</h2>
                  <p>Output Tokens</p>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.profile-page {
  h1 {
    font-size: 32px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  h4 {
    font-size: 14px;
    font-weight: 600;
    color: #666;
    margin-bottom: 5px;
  }

  .info-row-horizontal {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e0e0e0;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    .info-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;

      p {
        font-size: 16px;
        margin: 0;
      }

      .edit-input {
        max-width: 400px;
      }
    }

    .info-actions {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-shrink: 0;
    }
  }

  .profile-picture-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;

    .avatar-container {
      position: relative;
      display: inline-block;

      .v-avatar {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .change-picture-btn {
        position: absolute;
        bottom: 5px;
        right: 5px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        background-color: #2196F3;
        color: white;
        border: 3px solid white;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

        &:hover:not(:disabled) {
          background-color: #1976D2;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
        }

        &:active:not(:disabled) {
          transform: scale(1.05);
        }

        &:disabled {
          opacity: 0.7;
          cursor: wait;
        }
      }
    }
  }

  .v-card {
    border: 1px solid #e0e0e0;
  }

  .stat-card {
    text-align: center;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      background: #eeeeee;
      transform: translateY(-2px);
    }

    h2 {
      font-size: 32px;
      font-weight: 700;
      margin: 12px 0 8px 0;
      color: #333;
    }

    p {
      font-size: 14px;
      color: #666;
      margin: 0;
    }
  }
}
</style>
