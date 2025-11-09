import './assets/main.css'
import 'flowbite'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedState from "pinia-plugin-persistedstate"

import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import Material from '@primeuix/themes/material';
import Tooltip from 'primevue/tooltip';

import App from './App.vue'
import router from './router'





const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedState)
app.directive('tooltip', Tooltip);
app.use(pinia)
app.use(PrimeVue, {
    theme: {
        preset: Material,
        options: {
            prefix: 'p',
            darkModeSelector: '.app-dark',
            
        }
    }
});
app.use(router)

app.mount('#app')
