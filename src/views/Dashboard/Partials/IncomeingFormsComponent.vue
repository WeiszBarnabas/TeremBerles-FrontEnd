<script setup>
defineProps(["forms"])
</script>

<template>
    <div></div>
    <div v-for="form in forms.slice().reverse() ">
        <div class="flex justify-evenly items-center border border-transparent border-t-extra  w-full h-10 hover:bg-extra">
            <h3>{{ form.id }}</h3>
            <h3>{{ form.name }}</h3>
            <h3>{{ form.address }}</h3>
            <div class="text-black">
                <font-awesome-icon icon="circle-question" />
            </div>
        </div>
    </div>
</template>
