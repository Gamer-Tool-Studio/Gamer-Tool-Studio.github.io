<script>
export default {
  name: 'InviteNewUser',
  components: {},
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
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription" @click.stop>
        <header class="modal-header">
          <slot name="header">
            <h1>Invite team members</h1>
            <button type="button" class="btn-close" aria-label="Close modal" @click="close">
              <img src="~/assets/icons/close.svg">
            </button>
          </slot>
        </header>
        <section id="modalDescription" class="modal-body">
          <slot name="body">
            <v-col cols="12" class="header-section">
              <v-col cols="9" class="header-div">
                <h3 class="modal-subheader">
                  Emails
                </h3>
              </v-col>
              <v-col cols="3">
                <h3 class="modal-subheader">
                  Role
                </h3>
              </v-col>
            </v-col>
            <v-col cols="12" class="forms-section">
              <v-col cols="9">
                <input class="modal-forms" type="form" placeholder="john@example.com, jane@example.com">
              </v-col>
              <v-col cols="3">
                <input class="modal-forms" type="form" placeholder="Admin">
              </v-col>
            </v-col>
            <v-col cols="12" class="footer-section">
              <button class="cancel-button" @click="close">
                Cancel
              </button>
              <button class="button">
                Invite
              </button>
            </v-col>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

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
    padding-bottom: 0;
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
  padding-top: 0;
}

.footer-section {
  display: flex;
  justify-content: flex-end;
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
