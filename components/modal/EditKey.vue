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
              <h1>Edit key name</h1>
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
             <v-col cols="12" class="header-section">
                <h3>Name</h3>
              </v-col>
              <v-col cols="12" class="forms-section">
              <v-col cols="12">
                <input
                  class="modal-forms"
                  type="form"
                  placeholder="My test key"
                />
              </v-col>
            </v-col>
             <v-col cols="12" class="footer-section">
                <button class ="cancel-button">Cancel</button>
                <button class="button">Save</button>
             </v-col>
            </slot>            
          </section>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  import DialogCraftGPTLib from "dialogcraftgpt-lib";
  
  export default {
    name: "EditKey",
    components: {},
    data() {
      return { chatGPTText: "" };
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

.key-display {
    border:1px solid grey;
    border-radius: 3px;
}

  .red {
    background-color:#EF4146 !important;
    color:#fff;
  }

  .red:hover {
    background-color:#c23539 !important;
    color:#fff;
  }


  </style>
  
  