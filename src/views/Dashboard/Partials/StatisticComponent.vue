<script setup>
defineProps(["eventNumber","newEventNum","acceptedEventNum", "endedEventsNum"])

</script>

<template>
    <div class="flex justify-around mb-8 ">
        <div class="flex flex-col items-center shadow-lg rounded-md p-2 px-8 bg-extra" >
            <h3>Összes</h3>
            {{ eventNumber }}
        </div>
        <div class="flex flex-col items-center shadow-lg rounded-md p-2 px-8 bg-extra" >
            <h3>Lezárt</h3>
            {{ endedEventsNum }}
        </div>
        <div class="flex flex-col items-center shadow-lg rounded-md p-2 px-8 bg-extra" >
            <h3>Beérkezett</h3>
            {{ newEventNum }}
        </div>
        <div class="flex flex-col items-center shadow-lg rounded-md p-2 px-8 bg-extra" >
            <h3>Jóváhagyva</h3>
            {{ acceptedEventNum }}
        </div>
    </div>


</template>