<script setup>
import ApplicationLogo from './ApplicationLogo.vue';


</script>

<template>
    <div class="flex flex-col bg-primary p-3 w-1/5 h-screen justify-between ">
        <div class="text-gray-100">
            <div class="mb-10 flex justify-center">
                <ApplicationLogo/>
            </div>
            <div class="flex p-3 mb-1 justify-center hover:bg-slate-600 cursor-pointer">
                <h1>Beérkezett kérvények</h1>
            </div>
            <div class="flex p-3 mb-1 justify-center hover:bg-slate-600 cursor-pointer">
                <h1>Lezárt kérvények</h1>
            </div>
        </div>
    </div>
</template>