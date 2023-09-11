<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        @click.stop
      >
        <header class="modal-header">
          <slot name="header">
            <h1>Revoke API key</h1>
            <button
              type="button"
              class="btn-close"
              aria-label="Close modal"
              @click="close"
            >
              <img src="~/assets/icons/close.svg" />
            </button>
          </slot>
        </header>
        <section id="modalDescription" class="modal-body">
          <slot name="body">
            <v-container>
              <v-row>
                <v-col cols="12" class="text-section">
                  <p>
                    This API key will immediately be disabled. API requests made
                    using this key will be rejected, which could cause any
                    systems still depending on it to break. Once revoked, you'll
                    no longer be able to view or modify this API key.
                  </p>
                </v-col>
                <v-col cols="12" class="key-display">
                  <div>
                    <p>{{ name }}</p>
                  </div>
                </v-col>
                <v-col cols="12" class="footer-section">
                  <button class="cancel-button" @click="close">Cancel</button>
                  <button class="button red" @click="$emit('delete')">
                    Revoke Key
                  </button>
                </v-col>
              </v-row>
            </v-container>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "RevokeKey",
  components: {},
  props: ["name"],
  data() {
    return {};
  },

  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.text-section p {
  font-size: 16px !important;
}

.key-display > div {
  border: 1px solid grey;
  padding: 6px 12px;
  border-radius: 3px;
}

.red {
  background-color: #ef4146 !important;
  color: #fff;
}

.red:hover {
  background-color: #c23539 !important;
  color: #fff !important;
}
</style>
