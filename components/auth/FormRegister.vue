<script lang="ts">
// const debug = getDebugger('app:components:auth:FormRegister')
import { useUserStore } from '~/store/user'

export default defineComponent({
  setup() {
    const store = useUserStore()

    const form = ref({
      username: '',
      email: '',
      password: '',
    })
    const show = ref({
      password: false,
    })
    const rules = ref({
      required: (value: any) => !!value || 'Required.',
      min: (v: any) => v.length >= 4 || 'Min 4 characters',
      email: (value: any) => {
        const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        if (pattern.test(value))
          return true
        return 'Invalid e-mail.'
      },
    })
    const loading = ref(false)

    return {
      form,
      show,
      rules,
      loading,
      store,
    }
  },
  data: () => ({}),
  methods: {
    async handleRegister() {
      const form = this.$refs['form-register'] as any
      const { valid } = await form.validate()

      if (valid) {
        this.loading = true
        setTimeout(() => {
          this.store.setUser({
            email: this.form.email,
            password: this.form.password,
            username: this.form.email.split('@')[0],
          })
          this.loading = false
          this.$router.push('/')
        }, 2000)
      }
    },
  },
})
</script>

<template>
  <v-sheet width="500" class="comp-form_register mx-auto">
    <slot name="title">
      <h2 class="text-left">
        Register
      </h2>
    </slot>
    <v-form ref="form-register" fast-fail :disabled="loading" @submit.prevent>
      <v-text-field
        v-model="form.username"
        label="Username"
        variant="solo"
        :rules="[rules.required]"
      />

      <v-text-field
        v-model="form.email"
        label="Email"
        :rules="[rules.required, rules.email]"
        variant="solo"
      />
      <v-text-field
        v-model="form.password"
        :append-icon="show.password ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show.password ? 'text' : 'password'"
        variant="solo"
        label="Password"
        hint="At least 4 characters"
        counter
        @click:append="show.password = !show.password"
      />

      <v-btn
        color="success"
        type="submit"
        size="large"
        block
        class="mt-5 mb-5"
        :loading="loading"
        :disabled="loading"
        @click="handleRegister"
      >
        Register
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<style lang="scss" scoped>
.comp-form_register {
  background: rgba($white, 0.9);
  padding: 0.2rem 1rem;
  border-radius: 0.2rem;
}
</style>
