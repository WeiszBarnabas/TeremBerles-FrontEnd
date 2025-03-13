<script setup>
import InfoButton from '@/components/InfoButton.vue';


defineProps(['form'])
</script>

<template>

    <div>
        {{ form.name }}
    </div>
    <div>
        {{ form.created_at.split("T")[0].replaceAll("-", ".") }}
    </div>
    <div>
        {{ form.id }}
    </div>
    
    


    <div>
        <slot name="backButton"/>

        <div>
            <InfoButton></InfoButton>
        </div>
    </div>

</template>