<script setup>
defineProps(["eventNumber","newEventNum","acceptedEventNum", "endedEventsNum"])

</script>

<template>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h3 class="text-lg font-semibold mb-2">Összes</h3>
            <p class="text-4xl font-bold">{{ eventNumber }}</p>
        </div>
        <div class="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h3 class="text-lg font-semibold mb-2">Lezárt</h3>
            <p class="text-4xl font-bold">{{ endedEventsNum }}</p>
        </div>
        <div class="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h3 class="text-lg font-semibold mb-2">Beérkezett</h3>
            <p class="text-4xl font-bold">{{ newEventNum }}</p>
        </div>
        <div class="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h3 class="text-lg font-semibold mb-2">Jóváhagyva</h3>
            <p class="text-4xl font-bold">{{ acceptedEventNum }}</p>
        </div>
    </div>


</template>