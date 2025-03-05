<template>
    <div class="flex h-screen">
        <div class="flex flex-col bg-primary p-3 w-1/5 h-screen justify-between ">
            <div class="text-gray-100">
                <div class="mb-14 flex justify-center">
                    <slot name="image" />
                </div>
                <div class="flex p-3 mb-1 justify-center hover:bg-slate-600 cursor-pointer">
                    <h1>Beérkezett kérvények</h1>
                </div>
                <div class="flex p-3 mb-1 justify-center hover:bg-slate-600 cursor-pointer">
                    <h1>Lezárt kérvények</h1>
                </div>
            </div>
        </div>
        <div class="w-full overflow-y-auto">
            <div class="flex justify-end items-center h-22 p-5 bg-primary text-white">
                <div class="flex flex-col justify-center items-center me-3">
                    <div>
                        {{ store.$state.user.data.user.name }}
                    </div>
                </div>
                <LogoutButton />
            </div>

            <div class="p-3 ">

                <slot />

            </div>
        </div>
    </div>

</template>

<script setup>
import LogoutButton from '@/components/LogoutButton.vue';
import { useUserStore } from '@/stores/userStore';


const store = useUserStore()

</script>