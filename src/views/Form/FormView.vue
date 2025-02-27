<script setup>
import FormLayout from '@/Layouts/FormLayout.vue';
import ApplicationLayout from '@/Layouts/ApplicationLayout.vue';
import FormIntrodiction from './Partials/FormIntrodiction.vue';
import TextInput from '@/components/TextInput.vue';
import Textarea from '@/components/Textarea.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import axios from 'axios';

const testData = {
    "name": "teszt form készités",
    "description": "egy testelésből kódba égetettt leírás",
    "place": "valami szakatt termet adjatok",
    "address": "9026 Győr, Egyetem tér 1.",
}


const send = async () => {
    let response = await axios.post("http://127.0.0.1:8000/api/send-form",testData);
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
                        <div class="capitalize font-bold">A rendezvény adatai</div>
                    </div>
                    <div class="mx-auto w-3/5">

                        <div>
                            <div class="flex justify-between items-center mb-3">
                                <div>
                                    Rendezvény neve
                                    <span class="text-red-600">*</span>
                                </div>
                                <TextInput class="block w-1/3" />
                            </div>

                            <div class="flex justify-between items-center mb-3">
                                <div>
                                    Rendezvény leírása
                                    <span class="text-red-600">*</span>
                                </div>
                                <Textarea class="block w-1/3" />
                            </div>

                            <div class="flex justify-between items-center mb-3">
                                <div>
                                    Rendezvény helyszíne
                                    <span class="text-red-600">*</span>
                                </div>
                                <TextInput class="block w-1/3" />
                            </div>

                            <div class="flex justify-between items-center mb-3">
                                <div>
                                    Rendezvény pontos címe
                                    <span class="text-red-600">*</span>
                                </div>
                                <div class="w-1/3">
                                    <TextInput class="block w-full" placeholder="9026 Győr, Egyetem tér 1." />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-3">
                    <div class="capitalize font-bold">A rendezvény tipusa</div>
                </div>

                <div class="flex justify-center">
                    <PrimaryButton @click="send">Beküldés</PrimaryButton>
                </div>
            </div>


        </FormLayout>

    </ApplicationLayout>


</template>
