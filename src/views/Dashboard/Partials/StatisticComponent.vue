<script setup>
import { ref } from 'vue';

defineProps(["eventNumber"])

const endedEvents = ref(0);
const remainingEvents = ref(0)


</script>

<template>
    <div class="flex justify-around mb-8 ">
        <div class="flex flex-col items-center shadow-lg rounded-md p-2 px-8 bg-extra" >
            <h3>Összes</h3>
            {{ eventNumber }}
        </div>
        <div class="flex flex-col items-center shadow-lg rounded-md p-2 px-8 bg-extra" >
            <h3>Lezárt</h3>
            {{ endedEvents }}
        </div>
        <div class="flex flex-col items-center shadow-lg rounded-md p-2 px-8 bg-extra" >
            <h3>Állapt 1</h3>
            {{ remainingEvents }}
        </div>
        <div class="flex flex-col items-center shadow-lg rounded-md p-2 px-8 bg-extra" >
            <h3>Állapt 2</h3>
            {{ remainingEvents }}
        </div>
    </div>


</template>