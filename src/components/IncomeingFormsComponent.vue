<script setup>
defineProps(["forms"])
</script>

<template>
    <div v-for="form in forms">
        <div class=" flex border justify-evenly w-full">
            <h3>{{ form.name }}</h3>
            <h3>{{ form.id }}</h3>
            <h3>{{ form.place }}</h3>
        </div>
    </div>
</template>
