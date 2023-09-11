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
              <h1>Cancel plan</h1>
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
             <v-col cols="12" class="text-section">
                <p>Are you sure you want to cancel your payment plan?</p>
              </v-col>
              <v-col cols="12" class="text-section">
                <p>You'll still have access until the end of this calendar month, 
                    after which we'll send you a final invoice and begin rejecting your API requests.</p>
              </v-col>
             <v-col cols="12" class="footer-section">
                <button class ="cancel-button">Nevermind</button>
                <button class="button red">Cancel Plan</button>
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
    name: "CancelPlan",
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

.cancel-button:hover {
  background-color: #d9d9e3;
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
  
  