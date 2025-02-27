import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        isLoggedIn: false,
    }),
    getters: {
        getUser() {
            return this.user;
        },
        getLoggedIn() {
            return this.isLoggedIn;
        },
    },
    actions: {
        setUser(user) {
            this.user = user;
        },  
        setLoggedIn(state) {
            this.isLoggedIn = state;
        }
    },
    persist: true,
})
