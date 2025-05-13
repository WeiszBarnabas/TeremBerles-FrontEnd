<script setup>
defineProps(["eventNumber","newEventNum","acceptedEventNum"])

</script>

<template>
    <div class="w-full flex flex-col gap-6">
        <div class="bg-blue-600 text-white rounded-lg shadow-lg p-6 flex justify-between items-center">
            <div>
                <h3 class="text-xl font-semibold">Összes esemény</h3>
                <span class="text-sm text-blue-200">Események száma</span>
            </div>
            <p class="text-6xl font-bold">{{ eventNumber }}</p>
        </div>
        <div class="bg-yellow-500 text-white rounded-lg shadow-lg p-6 flex justify-between items-center">
            <div>
                <h3 class="text-xl font-semibold">Beérkezett</h3>
                <span class="text-sm text-yellow-200">Új események</span>
            </div>
            <p class="text-6xl font-bold">{{ newEventNum }}</p>
        </div>
        <div class="bg-green-500 text-white rounded-lg shadow-lg p-6 flex justify-between items-center">
            <div>
                <h3 class="text-xl font-semibold">Jóváhagyva</h3>
                <span class="text-sm text-green-200">Elfogadott események</span>
            </div>
            <p class="text-6xl font-bold">{{ acceptedEventNum }}</p>
        </div>
    </div>
</template>