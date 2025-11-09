<template>
    <DashboardLayout>
        <template v-if="!showData" #statistic>
            <StatisticComponent :eventNumber="numOfEvents" :newEventNum="numOfNewEvents"
                :acceptedEventNum="numOfAcceptedEvents" class="mb-5" />
        </template>
        <div v-if="!showData">
                <!-- <template v-for="form in forms">
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
                                
                            </p>
                        </td>
                        <td class="p-4">
                            <a href="#" class="block text-sm antialiased font-medium leading-tight">
                                <InfoButton @click="showEventData(form.id)">Tovább</InfoButton>
                            </a>
                        </td>
                    </tr>
                </template> -->

                <Crud :products="forms" class="max-w-full" @show="(id) =>{showEventData(id)}"/>

        </div>



        <div v-if="showData">
            <FormDataSheetComponent :form="actForm" :token="store.$state.user.data.token"
                :showModify="store.$state.user.data.user.role" @update:selectedItems="(items) => selectedItems = items">
                <template #buttons>
                    <div class="flex justify-end">
                        <InfoButton @click="showEventData(-1)">Vissza</InfoButton>

                        <div v-if="store.$state.user.data.user.role == 2" class="ml-3">
                            <InfoButton @click="createOffer" class="bg-blue-500 hover:bg-blue-600 text-white">
                                Ajánlat készítés
                            </InfoButton>
                        </div>

                        <div v-else v-show="actForm.status == 'Beérkezett'" class="ml-3">
                            <InfoButton class="mr-3" @click="changeModalVisibility">Elutasítás</InfoButton>
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
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import FormDataSheetComponent from './Partials/FormDataSheetComponent.vue';

import StatisticComponent from './Partials/StatisticComponent.vue';
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import InfoButton from '@/components/InfoButton.vue';
import Modal from '../../components/Modal.vue';
import Textarea from '../../components/Textarea.vue';
import Crud from '@/views/Dashboard/Partials/Crud.vue';

const forms = ref([]);
const searchInput = ref("");
const actForm = ref({});
const showData = ref(false);
const showModal = ref(false);
const rejectReason = ref("");
const numOfEvents = ref(0);
const numOfNewEvents = ref(0);
const numOfAcceptedEvents = ref(0);
const selectedItems = ref([]);

const store = useUserStore()
const router = useRouter();

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
    getForms()
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

const search = () => {
    getForms(searchInput.value);
}

const createOffer = async () => {
    try {
        if (!selectedItems.value || selectedItems.value.length === 0) {
            alert('Kérjük adjon hozzá szolgáltatásokat az ajánlathoz!');
            return;
        }

        const formData = {
            formId: actForm.value.id,
            offer_data: selectedItems.value.map(item => ({
                category: item.newcat?.category || item.category,
                unit: item.unit === '1' ? 'day' : 'night',
                duration: item.duration,
                price_per_unit: item.unit === '1' ? item.newcat.egyetem : item.newcat.egyetem_hetvege,
                total_price: (item.unit === '1' ? item.newcat.egyetem : item.newcat.egyetem_hetvege) * item.duration
            }))
        };

        console.log('Sending offer data:', formData);

        const response = await axios.post('http://127.0.0.1:8000/api/accept-famulus-offer', formData, {
            headers: {
                'Authorization': `Bearer ${store.$state.user.data.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        getForms();
        showEventData(-1)
    } catch (error) {
        console.error('Error creating offer:', error.response?.data || error.message);

        let errorMessage = 'Hiba történt az ajánlat létrehozása során';
        if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }

        alert(`Hiba: ${errorMessage}`);
    }
};

onMounted(() => {
    getForms();

})

</script>
