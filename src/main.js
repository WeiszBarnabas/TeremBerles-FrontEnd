import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

import App from './App.vue'
import router from './router'

library.add(faPowerOff);

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedState)

app.use(pinia)

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')
