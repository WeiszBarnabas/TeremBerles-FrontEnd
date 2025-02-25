<template>
  <div>
    <NavBar />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/Navbar.vue'

</script>

<style scoped></style>
