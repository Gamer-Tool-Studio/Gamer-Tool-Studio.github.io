// main.js
import { createApp } from 'vue';
import store from './store/tokenCount'; // Import your Vuex store
import App from './App.vue';

const app = createApp(App);
app.use(store); // Use the Vuex store
app.mount('#app');
