<script setup>
import FormLayout from '@/Layouts/FormLayout.vue';
import ApplicationLayout from '@/Layouts/ApplicationLayout.vue';
import FormIntrodiction from './Partials/FormIntrodiction.vue';
import TextInput from '@/components/TextInput.vue';
import Textarea from '@/components/Textarea.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import axios from 'axios';

import { ref } from "vue";

const testData = {
    "name": "teszt form készités",
    "description": "egy testelésből kódba égetettt leírás",
    "place": "valami szakatt termet adjatok",
    "address": "9026 Győr, Egyetem tér 1.",
}

const recaptchaToken = ref("");

const verifyRecaptcha = async () => {
  try {
    recaptchaToken.value = await new Promise((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha.execute("6LfZm-MqAAAAAFC8LhmritWz5OJeR3IecxBf8rmb", { action: "submit" }).then(resolve).catch(reject);
      });
    });

    const response = await axios.post("http://127.0.0.1:8000/api/verify-recaptcha", {
      token: recaptchaToken.value,
    });

    console.log("reCAPTCHA válasz:", response.data);
  } catch (error) {
    console.error("Hiba a reCAPTCHA ellenőrzése során:", error);
  }
};

const send = async () => {
    await verifyRecaptcha();

    if(recaptchaToken.value){
        let response = await axios.post("http://127.0.0.1:8000/api/send-form",testData);
    }
}

</script>

<template class="">
    <ApplicationLayout>
        <div>
            <h1 class="flex justify-center font-bold text-3xl my-3">Rendezvénybejelentő űrlap - Széchenyi István Egyetem
            </h1>
        </div>


        <FormLayout>

            <template #introduction>
                <FormIntrodiction />
            </template>

            <div class="w-full">
                <div class="">
                    <div class="p-3">
                        <div class="capitalize">A rendezvény adatai</div>
                    </div>
                    <div class="mx-auto w-4/5">

                        <div>
                            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                                <div class="sm:w-1/3 w-full">
                                    Rendezvény neve <span class="text-red-600">*</span>
                                </div>
                                <TextInput class="block sm:w-3/4 w-full mt-2 sm:mt-0" />
                            </div>


                            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                                <div class="sm:w-1/3 w-full">
                                    Rendezvény leírása
                                    <span class="text-red-600">*</span>
                                </div>
                                <Textarea class="block sm:w-3/4 w-full mt-2 sm:mt-0" />
                            </div>

                            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                            
                                <div class="sm:w-1/3 w-full">
                                    Rendezvény helyszíne
                                    <span class="text-red-600">*</span>
                                </div>
                                <TextInput class="block sm:w-3/4 w-full mt-2 sm:mt-0" />
                            </div>

                            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                            
                                <div class="sm:w-1/3 w-full">
                                    Rendezvény pontos címe
                                    <span class="text-red-600">*</span>
                                </div>
                                    <TextInput class="block sm:w-3/4 w-full mt-2 sm:mt-0" placeholder="9026 Győr, Egyetem tér 1." />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-3">
                    <div class="capitalize">A rendezvény tipusa</div>
                </div>
                
                <div class="flex justify-center">
                    <PrimaryButton @click="send">Beküldés</PrimaryButton>
                </div>
            </div>


        </FormLayout>

    </ApplicationLayout>


</template>
