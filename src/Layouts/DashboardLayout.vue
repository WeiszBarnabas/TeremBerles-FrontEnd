<template>
    <div class="flex h-screen">
        <SideBarComponent />
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
import SideBarComponent from '@/components/SideBarComponent.vue';
import { useUserStore } from '@/stores/userStore';


const store = useUserStore()

</script>