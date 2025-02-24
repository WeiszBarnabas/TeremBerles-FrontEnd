<script setup>
import { onMounted, ref } from 'vue';

const model = defineModel({
    type: String,
    required: true,
});

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <input class="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest  bg-white focus:bg-white  active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition ease-in-out duration-150" v-model="model" ref="input" maxlength="255"/>
</template>
