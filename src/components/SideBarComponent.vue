<script setup>
import ApplicationLogo from './ApplicationLogo.vue';


</script>

<template>
    <div class="flex flex-col bg-primary p-3 w-1/5 h-screen justify-between ">
        <div class="text-gray-100">
            <div class="mb-10 flex justify-center">
                <a href="/dashboard">
                    <ApplicationLogo />
                </a>
            </div>
            <div class="flex p-3 mb-1 justify-center hover:bg-slate-600 cursor-pointer" @click="$route.path == '/dashboard'? $router.go() : $router.push('/dashboard')">
                <h1>Beérkezett kérvények</h1>
            </div>
            <RouterLink to="/dashboard/artabla" class="flex p-3 mb-1 justify-center hover:bg-slate-600 cursor-pointer">
                <h1>Ártábla</h1>
            </RouterLink>
              <RouterLink to="/dashboard/jogosultsagok" class="flex p-3 mb-1 justify-center hover:bg-slate-600 cursor-pointer">
                <h1>Jogosultságok</h1>
            </RouterLink>
        </div>
    </div>
</template>