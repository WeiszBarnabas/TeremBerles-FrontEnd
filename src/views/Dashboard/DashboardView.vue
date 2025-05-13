<template>
    <DashboardLayout>
        <template v-if="!showData" #statistic>
            <StatisticComponent :eventNumber="numOfEvents" :newEventNum="numOfNewEvents"
                :acceptedEventNum="numOfAcceptedEvents" class="mb-5" />
        </template>
        <div v-if="!showData">
            <IncomeingFormsComponent>
                <template #search>
                    <div class="flex justify-end">
                        <div class="flex w-2/5">
                            <div class="relative w-full">
                                <TextInput class="block p-2.5 w-full z-20" placeholder="Keresés" v-model="searchInput"
                                    @change="search" />
                                <button @click="search"
                                    class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                </template>
                <template v-for="form in forms">
                    <tr class="hover:bg-gray-100">
                        <td class="p-4">
                            <p class="block text-sm antialiased font-normal leading-tight text-blue-gray-900">
                                {{ form.id }}
                            </p>
                        </td>
                        <td class="p-4 max-w-xs truncate">
                            <p class="block text-sm antialiased font-normal leading-tight text-blue-gray-900 truncate"
                                :title="form.event_name">
                                {{ form.event_name }}
                            </p>
                        </td>
                        <td class="p-4">
                            <div class="block text-sm antialiased font-normal leading-tight text-blue-gray-900">
                                <div class="text-white bg-green-500 rounded-xl w-fit py-0.5 px-2">
                                    {{ form.status }}
                                </div>
                            </div>
                        </td>
                        <td class="p-4">
                            <p class="block text-sm antialiased font-normal leading-tight text-blue-gray-900">
                                {{ form.event_address }}
                            </p>
                        </td>
                        <td class="p-4">
                            <p class="block text-sm antialiased font-normal leading-tight text-blue-gray-900">
                                {{ form.start_date.split("T")[0].replace(/-/g, ".") }}
                            </p>
                        </td>
                        <td class="p-4">
                            <a href="#" class="block text-sm antialiased font-medium leading-tight">
                                <InfoButton @click="showEventData(form.id)">Tovább</InfoButton>
                            </a>
                        </td>
                    </tr>
                </template>
            </IncomeingFormsComponent>
        </div>

        <div v-if="showData">
            <FormDataSheetComponent :form="actForm" :token="store.$state.user.data.token">
                <template #buttons>
                    <div class="flex justify-end">
                        <InfoButton @click="showEventData(-1)">Vissza</InfoButton>
                        <div v-show="actForm.status != 'Elutasítva'">
                            <InfoButton class="mx-3" @click="changeModalVisibility">Elutasítás</InfoButton>
                            <InfoButton @click="acceptEvent">Elfogadás</InfoButton>
                        </div>
                    </div>
                </template>
            </FormDataSheetComponent>
        </div>

        <Modal v-show="showModal">
            <template #content>
                <div class="w-full">
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">Indoklás</h2>
                    <Textarea rows="10" class="w-full p-1" v-model="rejectReason" />
                </div>
            </template>

            <template #buttons>
                <InfoButton @click="showModal = false">Mégsem</InfoButton>
                <InfoButton class="me-3" @click="save">Mentés</InfoButton>
            </template>

        </Modal>

    </DashboardLayout>

</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import FormDataSheetComponent from './Partials/FormDataSheetComponent.vue';
import IncomeingFormsComponent from '@/views/Dashboard/Partials/IncomeingFormsComponent.vue';
import StatisticComponent from './Partials/StatisticComponent.vue';
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import InfoButton from '@/components/InfoButton.vue';
import Modal from '../../components/Modal.vue';
import Textarea from '../../components/Textarea.vue';
import TextInput from '@/components/TextInput.vue';

const forms = ref();
const searchInput = ref();
const actForm = ref();
const showData = ref(false);
const showModal = ref(false);
const numOfEvents = ref(0);
const numOfNewEvents = ref(0);
const numOfAcceptedEvents = ref(0);
const rejectReason = ref("");

const store = useUserStore()

const setStatistic = () => {
    numOfEvents.value = forms.value.length
    numOfNewEvents.value = forms.value.filter(x => x.status == "Beérkezett").length
    numOfAcceptedEvents.value = forms.value.filter(x => x.status == "Jóváhagyva").length
}

const getForms = async (search = "") => {
    let res = await axios.get(`http://127.0.0.1:8000/api/forms/${search}`, { headers: { 'Authorization': `Bearer ${store.$state.user.data.token}` } })
    forms.value = res.data.data
    if (search == "") {
        setStatistic()

    }
}

const showEventData = async (formId) => {

    if (formId != -1) {
        let res = await axios.get("http://127.0.0.1:8000/api/form/" + formId, { headers: { 'Authorization': `Bearer ${store.$state.user.data.token}` } })
        actForm.value = res.data
    }

    showData.value = !showData.value

}

const reject = async () => {
    try {
        let data = {
            "formId": actForm.value.id,
            "reason": rejectReason.value,
        }

        let res = await axios.patch("http://127.0.0.1:8000/api/reject-form", data, { headers: { 'Authorization': `Bearer ${store.$state.user.data.token}` } })
        rejectReason.value = ""
    } catch (error) {
        console.error("Failed to reject the form:", error)
    }
}

const changeModalVisibility = () => {
    showModal.value = !showModal.value
}

const save = () => {
    reject()
    changeModalVisibility()
    getForms()
    showEventData(-1)
}

const acceptEvent = async () => {
    let res = await axios.patch("http://127.0.0.1:8000/api/accept-form", { "formId": actForm.value.id }, { headers: { 'Authorization': `Bearer ${store.$state.user.data.token}` } })
    getForms()
    showEventData(-1)
}

const search = async () => {
    getForms(searchInput.value)
}

onMounted(() => {
    getForms();

})

</script>


