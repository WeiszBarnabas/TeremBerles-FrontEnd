<script setup>
defineProps(['form'])
</script>


<template>
  <div class="event-details p-8 bg-gray-50 rounded-lg shadow-md">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ form.event_name }}</h1>
    <p class="text-gray-600 mb-6">{{ form.description }}</p>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Adatok</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Hely:</strong> {{ form.event_place }}</li>
      <li><strong class="text-gray-700">Cím:</strong> {{ form.event_address }}</li>
      <li><strong class="text-gray-700">Típus:</strong> {{ form.event_type }}</li>
      <li><strong class="text-gray-700">Minősítés:</strong> {{ form.event_classification }}</li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Idő</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Kezdete:</strong> {{ form.construction_start_date }} {{ form.construction_start_time.substring(0,form.construction_start_time.length-3) }}</li>
      <li><strong class="text-gray-700">Vége:</strong> {{ form.construction_end_date }} {{ form.construction_end_time.substring(0,form.construction_start_time.length-3) }}</li>
    </ul>

   
    <slot name="buttons"/>
    
  </div>



</template>