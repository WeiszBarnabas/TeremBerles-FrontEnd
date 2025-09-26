<script setup>
import InfoButton from '@/components/InfoButton.vue';
import TextInput from '@/components/TextInput.vue';
import { ref } from 'vue';

const props = defineProps(['showModal'])
const emit = defineEmits(['close'])

const modifyReason = ref('');


const search = () => {

};

const save = () => {

}

const close = () => {
    emit('close')
}

</script>

<template>
    <div v-show="showModal">
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div class="fixed inset-0 z-10 w-screen">
                <div class="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:max-h-[600px]">
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-scroll">
                            <div class="sm:flex sm:items-start">
                                <div class="w-full">
                                    <div class="flex justify-between items-center mb-4">
                                        <h2 class="text-lg font-semibold text-gray-700">Módosítás kérése </h2>
                                    </div>


                                    <div class="overflow-x-auto max-h-[400px]">
                                        <h3>Módosítás leírás</h3>
                                        <Textarea rows="10" class="w-full p-1 border border-gray-400" v-model="modifyReason" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <div class="flex gap-4 mt-4">
                                <InfoButton @click="close"
                                    class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-4 focus:ring-gray-300">
                                    Mégsem
                                </InfoButton>
                                <InfoButton @click="save"
                                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">
                                    Módosítás kérés
                                </InfoButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>