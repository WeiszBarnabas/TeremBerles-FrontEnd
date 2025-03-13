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
    <textarea
        class="bg-white rounded-md border border-primary focus:border-indigo-500  focus:ring-indigo-500 shadow-sm"
        v-model="model"
        ref="input"
        cols="30"
        rows="3"
    />
</template>
