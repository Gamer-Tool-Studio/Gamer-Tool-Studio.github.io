<script setup>
import { onMounted } from 'vue'

const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}

// Focus the modal to capture keydown events
onMounted(() => {
  document.querySelector('.modal-overlay').focus()
})

// Correctly set the game source path
const gameSrc = '/cluaido_demo/index.html' // Adjust the path if necessary
</script>

<template>
  <div
    class="modal-overlay"
    @click.self="closeModal"
    @keydown.esc="closeModal"
    tabindex="0"
  >
    <div class="modal-content">
      <!-- Game content filling 100% of the modal -->
      <iframe
        :src="gameSrc"
        width="100%"
        height="100%"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    outline: none; /* Remove outline when focused */
}

.modal-content {
  width: 1280px;
  height: 720px;
  position: relative;

}

.modal-content iframe {
    border-radius: 25px;
    width: 100%;
    height: 100%;
    border: none;
}
</style>
