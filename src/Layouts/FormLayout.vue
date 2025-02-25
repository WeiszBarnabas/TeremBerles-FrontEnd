<template>
    <div class="max-w-2/3 mx-auto border rounded-2xl from-blue-600 to-blue-400 bg-gradient-to-l">
        <div class="max-w-4/5 mx-auto">
            <slot />
            <div class="flex justify-end">
                <PrimaryButton class=""><slot name="buttonText"/></PrimaryButton>
            </div>
        </div>

    </div>
</template>

<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue';

</script>