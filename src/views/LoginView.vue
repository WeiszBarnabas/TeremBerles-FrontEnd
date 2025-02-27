<template>
    <div class="flex items-center justify-center min-h-screen min-w-screen ">
        <div class="flex items-center justify-center bg-secondary min-h-72 w-1/2 rounded-lg ">
            <div class="w-full">
                <div class="flex justify-center items-center gap-7 mb-10">
                    <div class="">E-mail</div>
                    <TextInput class="block w-1/3" v-model="email" id="name" />
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
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';


const email = ref("");

const router = useRouter();
const store = useUserStore();

const login = async () => {

    let data = {
        "email": "albert@kazmer.com",
        "password": "jelszo1"
    }

    try {
        const res = await axios.post("http://127.0.0.1:8000/api/login", data)
        store.setUser(res)
        store.setLoggedIn(true)
        router.push("/dashboard")
    } catch (error) {


    }




}




</script>