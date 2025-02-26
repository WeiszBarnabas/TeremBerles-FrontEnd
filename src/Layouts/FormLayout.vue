<template>


    <div class="py-3 max-w-7xl mx-auto sm:px-6 lg:px-8 h-full">
        <div class="bg-secondary overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-3 text-black flex ">
                <slot name="introduction" />
            </div>
        </div>
    </div>



    <div class="py-3 max-w-7xl mx-auto sm:px-6 lg:px-8 h-full">
        <div class="bg-extra overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-3 text-black flex w-full">
                <slot />
            </div>
        </div>
    </div>


</template>

<script setup>

</script>