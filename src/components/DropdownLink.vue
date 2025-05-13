<script setup>

defineProps({
    href: {
        type: String,
        required: false,
    },
});
</script>

<template>
    <a
        :href="href"
        class="block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out hover:bg-gray-400 hover:text-white p-2 rounded-md cursor-pointer"
    >
        <slot />
</a>
</template>
