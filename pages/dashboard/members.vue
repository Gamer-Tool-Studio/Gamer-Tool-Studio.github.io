<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const debug = getDebugger('app:pages:dashboard:members')
const store = useUserStore()

const { user, organization } = storeToRefs(store)

const inviteUser = ref(false)
const members = ref([])
const loading = ref(true)
const isAdmin = computed(() => user.value.role === 'admin')

onMounted(async () => {
  await fetchMembers()
})

async function fetchMembers() {
  loading.value = true
  try {
    const { data, error } = await useAuthAPI('/user/organization/members', 'GET')

    if (data.value && !error.value) {
      members.value = data.value.members || []
      organization.value.name = data.value.orgName || organization.value.name
      organization.value.orgId = data.value.orgId || organization.value.orgId
      debug.log('Members loaded:', members.value)
    }
    else {
      debug.log('Error fetching members:', error.value)
    }
  }
  catch (e) {
    debug.log('Error:', e)
  }
  finally {
    loading.value = false
  }
}

const editingMember = ref(null)
const newRole = ref('')

async function editMemberRole(member: any) {
  editingMember.value = member
  newRole.value = member.role

  // eslint-disable-next-line no-alert
  const role = prompt(`Change role for ${member.name || member.email}:\n\nEnter 'admin' or 'user':`, member.role)

  if (!role || role === member.role)
    return

  if (role !== 'admin' && role !== 'user') {
    // eslint-disable-next-line no-alert
    alert('Invalid role. Must be "admin" or "user".')
    return
  }

  try {
    const { error } = await useAuthAPI(`/user/organization/members/${member.id}/role`, 'PATCH', {
      role,
    })

    if (!error.value) {
      // Update local list
      const memberIndex = members.value.findIndex(m => m.id === member.id)
      if (memberIndex !== -1)
        members.value[memberIndex].role = role

      debug.log('Member role updated successfully')
    }
    else {
      // eslint-disable-next-line no-alert
      alert(`Failed to update role: ${error.value || 'Unknown error'}`)
    }
  }
  catch (e) {
    debug.log('Error updating member role:', e)
    // eslint-disable-next-line no-alert
    alert('Failed to update role')
  }
}

async function removeMember(member: any) {
  // eslint-disable-next-line no-alert
  if (!confirm(`Are you sure you want to remove ${member.name || member.email} from the organization?\n\nThis action cannot be undone.`))
    return

  try {
    const { error } = await useAuthAPI(`/user/organization/members/${member.id}`, 'DELETE')

    if (!error.value) {
      // Remove from local list
      members.value = members.value.filter(m => m.id !== member.id)
      debug.log('Member removed successfully')
    }
    else {
      // eslint-disable-next-line no-alert
      alert(`Failed to remove member: ${error.value || 'Unknown error'}`)
    }
  }
  catch (e) {
    debug.log('Error removing member:', e)
    // eslint-disable-next-line no-alert
    alert('Failed to remove member')
  }
}

useHead({
  title: 'Members',
})
</script>

<template>
  <v-container>
    <v-row class="align-center">
      <v-col cols="12" md="8">
        <h1>Members</h1>
        <p v-if="organization.name" class="text-grey">
          {{ organization.name }} • {{ members.length }} {{ members.length === 1 ? 'member' : 'members' }}
        </p>
      </v-col>
      <v-col cols="12" md="4" class="text-right">
        <modal-invite-new-user
          v-if="inviteUser"
          @close="inviteUser = false"
        />
        <button
          v-if="isAdmin"
          class="button"
          type="submit"
          @click="inviteUser = true"
        >
          Invite members
        </button>
      </v-col>

      <!-- Loading State -->
      <v-col v-if="loading" cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="48"
        />
        <p class="mt-4">
          Loading members...
        </p>
      </v-col>

      <!-- Members List -->
      <v-col v-if="!loading && members.length === 0" cols="12" class="text-center">
        <v-alert type="info" variant="tonal">
          No members found. This is unusual - you should see at least yourself!
        </v-alert>
      </v-col>

      <v-col
        v-for="member in members"
        :key="member.id"
        cols="12"
      >
        <div class="member-row">
          <v-card elevation="2" class="pa-4 member-card flex-grow-1">
            <div class="d-flex align-center gap-3">
              <!-- Profile Picture -->
              <v-avatar
                size="64"
                :color="member.picture ? 'transparent' : 'primary'"
              >
                <v-img
                  v-if="member.picture"
                  :src="member.picture"
                  :alt="member.name"
                />
                <span v-else class="text-h6 text-white">
                  {{ (member.name || member.username)?.[0]?.toUpperCase() }}
                </span>
              </v-avatar>

              <!-- Member Info -->
              <div class="flex-grow-1">
                <h3 class="member-name">
                  {{ member.name || member.username }}
                  <span v-if="member.id === user.id" class="you-badge">(You)</span>
                </h3>
                <p class="member-email">
                  {{ member.email }}
                </p>
                <v-chip
                  size="small"
                  :color="member.role === 'admin' ? 'orange' : 'grey'"
                  variant="flat"
                  class="mt-2"
                >
                  {{ member.role?.toUpperCase() }}
                </v-chip>
              </div>
            </div>
          </v-card>

          <!-- Action Buttons (only show for admins and not for yourself) -->
          <div v-if="isAdmin && member.id !== user.id" class="action-buttons">
            <!-- Edit Role Button -->
            <button
              class="edit-btn"
              title="Change role"
              @click="editMemberRole(member)"
            >
              <v-icon size="20">
                mdi-pencil
              </v-icon>
            </button>

            <!-- Remove Button -->
            <button
              class="remove-btn"
              title="Remove member"
              @click="removeMember(member)"
            >
              <v-icon size="20">
                mdi-trash-can-outline
              </v-icon>
            </button>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.member-row {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.member-card {
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .member-name {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    line-height: 1.2;
    display: flex;
    align-items: center;
    gap: 8px;

    .you-badge {
      font-size: 14px;
      font-weight: 500;
      color: #666;
      font-style: italic;
    }
  }

  .member-email {
    font-size: 15px;
    color: #666;
    margin: 6px 0 0 0;
  }
}

.action-buttons {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.edit-btn, .remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
  padding: 12px;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

.edit-btn {
  background-color: #2196F3;

  &:hover {
    background-color: #1976D2;
  }
}

.remove-btn {
  background-color: #f44336;

  &:hover {
    background-color: #d32f2f;
  }
}

.gap-3 {
  gap: 16px;
}
</style>

<style lang="scss">

</style>
