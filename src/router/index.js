import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormView from '../views/Form/FormView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/form',
      name: 'form',
      component: FormView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: checkAccess
    },
  ],
})

function checkAccess(from, to, next) {
  let store = useUserStore()
  
  let isLoggedIn;

  try {
    isLoggedIn = store.isLoggedIn

    if(isLoggedIn === true) {
      next();       
  } else {
    window.location.href = '/';
  }
  } catch (error) {
    window.location.href = '/';
  }

}

export default router
