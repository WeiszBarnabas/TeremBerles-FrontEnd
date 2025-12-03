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
        preset: {
            ...Material,
            semantic: {
                ...Material.semantic,
                primary: {
                    50: '#D9EDF5',
                    100: '#AED9E6',
                    200: '#83C6D7',
                    300: '#58B3C8',
                    400: '#2DA0B9',
                    500: '#242943',
                    600: '#4695B0',
                    700: '#3B7D96',
                    800: '#2F657C',
                    900: '#244962',
                    950: '#192D47'
                }
            }

        },
        options: {
            prefix: 'p',
            darkModeSelector: '.app-dark',

        }
    }
});
app.use(router)

app.mount('#app')
