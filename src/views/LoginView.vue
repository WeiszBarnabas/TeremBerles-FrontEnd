<template>
    <div class="flex items-center justify-center min-h-screen min-w-screen ">
        <div class="flex items-center justify-center bg-secondary min-h-72 w-1/2 rounded-lg ">
            <div class="w-full">
                <div class="flex justify-center items-center gap-7 mb-10">
                    <div class="">Felhasználónév</div>
                    <TextInput class="block w-1/3" v-model="name" id="name"/>
                </div>

                <div class="flex justify-center ">
                    <PrimaryButton @click="login">
                        bejelentkezés
                    </PrimaryButton>
                </div>

            </div>
        </div>
    </div>


</template>


<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue';
import TextInput from '@/components/TextInput.vue';
import { ref } from 'vue';
import axios from 'axios';


const name = ref("");


const login = () => {
    
}




</script>