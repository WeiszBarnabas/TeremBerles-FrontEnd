<template>
    <DashboardLayout>
        <template v-if="!showData" #statistic>
            <StatisticComponent :eventNumber="numOfEvents" :newEventNum="numOfNewEvents"
                :acceptedEventNum="numOfAcceptedEvents" :endedEventsNum="numOfEndedEvents" />
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
                                    {{ form.status }}
                                </div>
                            </div>
                        </td>
                        <td class="p-4">
                            <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal">
                                <InfoButton @click="showEventData(form.id)">Tovább</InfoButton>
                            </a>
                        </td>
                    </tr>
                </template>
            </IncomeingFormsComponent>
        </div>

        <div v-if="showData">
            <FormDataSheetComponent :form="actForm">
                <template #backButton>
                    <InfoButton class="px-4  " @click="showEventData(-1)">
                        <font-awesome-icon icon="fa-solid fa-x" />
                    </InfoButton>
                </template>
                <template #buttons>
                    <div class="flex justify-around">
                        <InfoButton @click="showEventData(-1)">Vissza</InfoButton>
                        <div v-show="actForm.status != 'Elutasítva'">
                            <InfoButton @click="acceptEvent">Elfogadás</InfoButton>
                            <InfoButton class="mx-3" @click="changeModalVisibility">Elutasítás</InfoButton>
                            <InfoButton @click="">Módosítás</InfoButton>
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

const forms = ref();
const actForm = ref();
const showData = ref(false);
const showModal = ref(false);
const numOfEvents = ref(0);
const numOfNewEvents = ref(0);
const numOfAcceptedEvents = ref(0);
const numOfEndedEvents = ref(0);
const rejectReason = ref("");

const store = useUserStore()

const setStatistic = () => {
    numOfEvents.value = forms.value.length
    numOfNewEvents.value = forms.value.filter(x => x.status == "Beérkezett").length
    numOfAcceptedEvents.value = forms.value.filter(x => x.status == "Jóváhagyva").length
    numOfEndedEvents.value = forms.value.filter(x => x.status == "Lezárt").length
}

const getForms = async () => {
    let res = await axios.get("http://127.0.0.1:8000/api/forms", { headers: { 'Authorization': `Bearer ${store.$state.user.data.token}` } })
    forms.value = res.data.data
    setStatistic()

}

const showEventData = async (formId) => {

    if (formId != -1) {
        let res = await axios.get("http://127.0.0.1:8000/api/form/" + formId, { headers: { 'Authorization': `Bearer ${store.$state.user.data.token}` } })
        actForm.value = res.data
    }

    showData.value = !showData.value

}

const reject = async () => {

    let data = {
        "formId": actForm.value.id,
        "reason": rejectReason.value,
    }

    let res = await axios.patch("http://127.0.0.1:8000/api/reject-form", data, { headers: { 'Authorization': `Bearer ${store.$state.user.data.token}` } })
    rejectReason.value = ""
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

onMounted(() => {
    getForms();
})

</script>