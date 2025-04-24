<script setup>
defineProps(["eventNumber","newEventNum","acceptedEventNum", "endedEventsNum"])

</script>

<template>
    <div class="w-full">
        <div class="flex gap-3 mb-3">
            <div class="flex flex-col text-white text-2xl min-w-1/2 items-center shadow-lg rounded-md p-10 px-8 bg-secondary" >
                <h3>Összes</h3>
                {{ eventNumber }}
            </div>
            <div class="flex flex-col text-white text-2xl min-w-1/2 items-center shadow-lg rounded-md p-10 px-8 bg-secondary" >
                <h3>Lezárt</h3>
                {{ endedEventsNum }}
            </div>
        </div>
        <div class="flex gap-3 mb-3">
            <div class="flex flex-col text-white text-2xl min-w-1/2 items-center shadow-lg rounded-md p-10 px-8 bg-secondary" >
                <h3>Beérkezett</h3>
                {{ newEventNum }}
            </div>
            <div class="flex flex-col text-white text-2xl min-w-1/2 items-center shadow-lg rounded-md p-10 px-8 bg-secondary" >
                <h3>Jóváhagyva</h3>
                {{ acceptedEventNum }}
            </div>
        </div>
    </div>


</template>