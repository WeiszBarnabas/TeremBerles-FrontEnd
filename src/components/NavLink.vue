<script setup>
import { computed } from 'vue';


const props = defineProps({
    href: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
    },
});

const classes = computed(() =>
    props.active
        ? 'uppercase inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 dark:border-indigo-600 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
        : 'uppercase inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-300 hover:border-extra focus:outline-none focus:text-gray-300 focus:border-gray-700 transition duration-150 ease-in-out'
);
</script>

<template>
    <RouterLink :to="href" :class="classes">
        <slot />
    </RouterLink>
</template>
