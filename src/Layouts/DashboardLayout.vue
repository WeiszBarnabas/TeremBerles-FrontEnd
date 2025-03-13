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
                <LogoutButton @click="logout"/>
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
import { useRouter } from 'vue-router';

const store = useUserStore()
const router = useRouter()


const logout = () => {
    store.setLoggedIn(false);
    store.setUser(null);

    router.push("/").then(() => {
        window.location.reload();
    });
}

</script>