<template>
    <DashboardLayout>

        <template v-if="!showData" #statistic>
            <StatisticComponent :eventNumber="8"></StatisticComponent>
        </template>


        <div v-if="!showData">
            <IncomeingFormsComponent>
                <template v-for="form in forms">
                    <tr class="hover:bg-gray-100">
                        <td class="p-4">
                            <p
                                class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {{ form.id }}
                            </p>
                        </td>
                        <td class="p-4">
                            <p
                                class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {{ form.event_name }}
                            </p>
                        </td>
                        <td class="p-4">
                            <p
                                class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {{ form.created_at.split("T")[0].replaceAll("-", ".") }}
                            </p>
                        </td>
                        <td class="p-4">
                            <div
                                class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                <div class="text-white bg-green-500 rounded-xl w-fit py-0.5 px-2">
                                    Beérkezett
                                </div>
                            </div>
                        </td>
                        <td class="p-4">
                            <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal">
                                <InfoButton @click="showEventData(form)">Tovább</InfoButton>
                            </a>
                        </td>
                    </tr>
                </template>
            </IncomeingFormsComponent>
        </div>
        <div v-if="showData">

            <FormDataSheetComponent :form="actForm">
                <template #buttons>
                    <div class="flex justify-around">
                        <InfoButton @click="showEventData">Vissza</InfoButton>

                        <div>
                            <InfoButton>Elfogadás</InfoButton>
                            <InfoButton class="mx-3" @click="reject(actForm.id)">Elutasítás</InfoButton>
                            <InfoButton @click="openModal">Módosítás</InfoButton>
                        </div>
                    </div>
                </template>
            </FormDataSheetComponent>
        </div>

        <Modal v-show="showModal">
            <template #buttons>
                <InfoButton @click="showModal = false" >Mégsem</InfoButton>
                <InfoButton class="me-3">Mentés</InfoButton>
            </template>

        </Modal>

    </DashboardLayout>

</template>

<script setup>
import FormDataSheetComponent from './Partials/FormDataSheetComponent.vue';
import IncomeingFormsComponent from '@/views/Dashboard/Partials/IncomeingFormsComponent.vue';
import StatisticComponent from './Partials/StatisticComponent.vue';
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import InfoButton from '@/components/InfoButton.vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import Modal from './Partials/Modal.vue';

const forms = ref();
const actForm = ref();
const showData = ref(false);
const showModal = ref(false);


const store = useUserStore()
const getForms = async () => {
    let res = await axios.get("http://127.0.0.1:8000/api/forms", { headers: { 'Authorization': `Bearer ${store.$state.user.data.token}` } })
    forms.value = res.data.data
}

getForms()

const showEventData = (form) => {
    if (form != null) {
        actForm.value = form
    }

    showData.value = !showData.value
}



const reject = async (formid) => {

    //let res = await axios.post("http://127.0.0.1:8000/api/reject-form", formid, { headers: { 'Authorization': `Bearer ${store.$state.user.data.token}` } })
    showEventData()

}

const openModal = () => {
    showModal.value = showModal


    //todo modification interface
    //let data = "modified data"
    //let res = await axios.post("http://127.0.0.1:8000/api/modify-form", data, { headers: { 'Authorization': `Bearer ${store.$state.user.data.token}` } })
    //showEventData()

}

</script>