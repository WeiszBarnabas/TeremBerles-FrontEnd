<script setup>
import ApplicationLogo from '@/components/ApplicationLogo.vue';
import NavLink from '@/components/NavLink.vue';

</script>

<template>
    <div>
        <div class="min-h-screen">
            <nav class="bg-primary">
                <!-- Primary Navigation Menu -->
                <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="h-16">
                        <div class="flex justify-between">
                            <!-- Logo -->
                            <div class="shrink-0 flex items-center">
                                <RouterLink to="/">
                                    <ApplicationLogo
                                        class="block h-16 w-auto fill-current text-gray-200" />
                                </RouterLink>
                            </div>

                            <!-- Navigation Links -->
                            <div class="space-x-8 sm:-my-px sm:ms-10  flex items-center ">
                                <NavLink href="/form">
                                    ürlap
                                </NavLink>
                                <a href="/login" class="text-white rounded-md w-12 h-12 flex justify-center items-center hover:bg-gray-500">
                                    <font-awesome-icon icon="fa-solid fa-user"/>
                                </a>
                            </div>
                        </div>
                </div>
                </div>
            </nav>

            <!-- Page Heading -->
            <header class="bg-white dark:bg-gray-800 shadow" v-if="$slots.header">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <!-- Page Content -->
            <main class="">
                <slot />
            </main>
        </div>
    </div>
</template>


<script setup>

</script>