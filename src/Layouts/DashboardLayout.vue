<template>

    <div class=" overflow-hidden">
        <div class="text-gray-100 flex">
            <div class="bg-primary p-3 w-1/5 h-screen flex flex-col justify-between">

                <div class="w-full">
                    <div class="mb-14 flex justify-center">
                        <slot name="image" />
                    </div>
                    <div class="flex p-3 mb-1 border border-secondary justify-center hover:bg-slate-600 cursor-pointer">
                        <h1>Áttekintés</h1>
                    </div>
                    <div class="flex p-3 mb-1 border border-secondary justify-center hover:bg-slate-600 cursor-pointer">
                        <h1>Beérkezett kérvények</h1>
                    </div>
                    <div class="flex p-3 mb-1 border border-secondary justify-center hover:bg-slate-600 cursor-pointer">
                        <h1>Lezárt kérvények</h1>
                    </div>

                </div>

                <div class="w-full">
                    <div
                        class="flex text-red-600 p-3 mb-1 border border-red-600 justify-center hover:bg-red-600 hover:text-white cursor-pointer">
                        <h1>Kijelentkezés</h1>
                    </div>
                </div>

            </div>

            <div class="p-3 border w-full h-screen">

                <slot />

            </div>

        </div>
    </div>

</template>

<script setup>


</script>