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
            <h1>Modal Title</h1>
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
            <v-card flat> Modal Body </v-card>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "BaseModal",
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    close() {
      this.$emit("close");
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
    font-size: 18px;
    font-weight: bold;
  }

  .modal-header {
    border-bottom: 1px solid #d8d8d8;
    justify-content: space-between;
  }

  .modal-body {
    max-width: 858px;
    max-height: 684px;
    position: relative;
    padding: 20px 30px 20px 30px;
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
</style>

