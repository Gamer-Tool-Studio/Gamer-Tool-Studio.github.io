<script>
export default {
  name: 'CopyKey',
  components: {},
  props: ['name'],
  emits: ['close'],
  data() {
    return {}
  },

  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>

<template>
  <transition name="modal-fade">
    <div v-show="true" class="modal-backdrop" @click="close">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        @click.stop
      >
        <header class="modal-header">
          <slot name="header">
            <h1>Create new secret key</h1>
            <button
              type="button"
              class="btn-close"
              aria-label="Close modal"
              @click="close"
            >
              <img src="~/assets/icons/close.svg">
            </button>
          </slot>
        </header>
        <section id="modalDescription" class="modal-body">
          <slot name="body">
            <v-container>
              <v-row>
                <v-col cols="12" class="text-section">
                  <p>
                    Please save this secret key somewhere safe and accessible.
                    For security reasons, <b>you won't be able to view it again</b>
                    through your Gamer Tools Studio account. If you lose this secret key, you'll need to generate a new one.
                  </p>
                </v-col>
                <v-col cols="10" class="key-display">
                  <div>
                    <p>{{ name }}</p>
                  </div>
                </v-col>
                <v-col cols="2" class="copy-button">
                  <div>
                    <button class="button">
                      <img class="cop-icon" src="">
                    </button>
                  </div>
                </v-col>
                <v-col cols="12" class="footer-section">
                  <button class="cancel-button" @click="close">
                    Done
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
