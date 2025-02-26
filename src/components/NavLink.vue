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
        ? 'uppercase inline-flex items-center px-1 pt-1 border-b-2 border-secondary text-sm font-medium leading-5 text-white focus:outline-none focus:border-secondary transition duration-150 ease-in-out'
        : 'uppercase inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-white hover:text-secondary hover:border-secondary focus:outline-none focus:text-secondary focus:border-secondary transition duration-150 ease-in-out'
);
</script>

<template>
    <RouterLink :to="href" :class="classes">
        <slot />
    </RouterLink>
</template>
