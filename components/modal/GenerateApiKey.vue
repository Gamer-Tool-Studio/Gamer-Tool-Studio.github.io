<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription" @click.stop>
        <header class="modal-header">
          <slot name="header">
            <h1>{{ apiKey ? 'Your new API key' : formTitle }}</h1>
            <button type="button" class="btn-close" aria-label="Close modal" @click="close">
              <img src="~/assets/icons/close.svg" />
            </button>
          </slot>
        </header>
        <section id="modalDescription" class="modal-body">
          <slot name="body">
            <div v-if="!apiKey">
              <v-col cols="12" class="header-section">
                <h3 class="modal-subheader">Name</h3>
              </v-col>
              <v-col cols="12" class="forms-section">
                <input
                  class="modal-forms"
                  type="text"
                  placeholder="My test key"
                  :value="name"
                  @input="$emit('update:name', $event.target.value)"
                />
              </v-col>
              <v-col cols="12" class="footer-section">
                <div class="button-container">
                  <button class="cancel-button" @click="close">Cancel</button>
                  <button class="button" @click="generateKey">
                    {{ isCreating }}
                  </button>
                </div>
              </v-col>
            </div>
            <!-- TODO: change layout when key is created -->
            <div v-else>
              <v-col cols="12" class="header-section">
                <h3 class="modal-subheader">Name</h3>
              </v-col>
              <v-col cols="12" class="forms-section">
                <input
                  class="modal-forms"
                  type="text"
                  placeholder="My test key"
                  :value="apiKey"
                  disabled
                  @input="$emit('update:name', $event.target.value)"
                />
              </v-col>
              <v-col cols="12" class="footer-section">
                <div class="button-container">
                  <button class="cancel-button" @click="close">Cancel</button>
                  <button class="button" @click="generateKey">
                    {{ isCreating }}
                  </button>
                </div>
              </v-col>
            </div>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'GenerateApiKey',
  props: ['formTitle', 'name'],
  data() {
    return {
      isCreating: !this.name ? 'Create Secret Key' : 'Save',
      inviteUser: false,
      apiKey: '', // Store the generated key
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async generateKey() {
      // Make a POST request to generate the key
      const keysStore = useKeysStore();

      const { token: apiKey } = await keysStore.createApiToken(this.name);
      console.log(apiKey);

      this.apiKey = apiKey;
    },
  },
};
</script>

<style lang="scss">
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-backdrop {
  z-index: 1060;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff !important;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  .v-card {
    border-radius: 0px !important;
  }

  .modal-header {
    padding: 20px 30px;
    display: flex;
    width: 858px;
  }

  .modal-header {
    justify-content: space-between;
    font-size: 18px;
  }

  .modal-header h1 {
    font-size: 18px;
  }

  .header-section {
    display: inline-flex;
    // padding-bottom: 0;
  }

  .header-div {
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
  }

  .modal-body {
    max-width: 858px;
    max-height: 684px;
    position: relative;
    padding: 0px 30px 20px 30px;
    overflow: auto;
    p {
      font-size: 14px;
      font-weight: normal;
      text-align: left;
    }
  }
}

.btn-close {
  border: none;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #092e33;
  background: transparent;
}

.modal-subheader {
  font-size: 16px;
}

.modal-forms {
  font-size: 14px;
  min-width: 100%;
  padding: 7px;
  border: 1px solid #ececf1;
  border-radius: 3px;
}

.forms-section {
  display: inline-flex;
  // padding-top: 0
}

.footer-section {
  display: inline-flex;
}

.footer-section button {
  margin: 3px;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.cancel-button {
  background-color: #ececf1;
  padding: 5px 15px;
  color: #353740;
  border-radius: 3px;
  border: none;
  font-size: 16px;
  font-family: 'Bebas Neue';
}
.cancel-button:hover {
  cursor: pointer;
  background-color: white;
}
</style>
