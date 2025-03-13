<template>
    <DashboardLayout>
        <StatisticComponent :eventNumber="forms.length" v-if="!showData">

        </StatisticComponent>

        <IncomeingFormsComponent v-if="!showData">
            <template v-for="form in forms">
                <tr class="hover:bg-gray-100">
                    <td class="p-4">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {{ form.id }}
                        </p>
                    </td>
                    <td class="p-4">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {{ form.name }}
                        </p>
                    </td>
                    <td class="p-4">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {{ form.created_at.split("T")[0].replaceAll("-",".") }}
                        </p>
                    </td>
                    <td class="p-4">
                        <div class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            <div class="text-white bg-green-500 rounded-xl w-fit py-0.5 px-2">
                                allaasdasdsapot
                            </div>
                        </div>
                    </td>
                    <td class="p-4">
                        <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal">
                            <InfoButton @click="showEventData(form)" >Tovább</InfoButton>
                        </a>
                    </td>
                </tr>
            </template>
        </IncomeingFormsComponent>

        <FormDataSheetComponent v-if="showData" :form="actForm">
            <template #backButton>
                <InfoButton @click="showEventData">Vissza</InfoButton>
            </template>
        </FormDataSheetComponent>
    </DashboardLayout>

</template>

<script setup>
import StatisticComponent from './Partials/StatisticComponent.vue';
import FormDataSheetComponent from './Partials/FormDataSheetComponent.vue';
import IncomeingFormsComponent from '@/views/Dashboard/Partials/IncomeingFormsComponent.vue';
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import InfoButton from '@/components/InfoButton.vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';

const forms = ref();
const actForm = ref();
const showData = ref(false);
const store = useUserStore()
const getForms = async () => {
    let res = await axios.get("http://127.0.0.1:8000/api/forms", { headers: { 'Authorization': `Bearer ${store.$state.user.data.token}` } })
    forms.value = res.data.data
}

getForms()

const showEventData = (form) => {

    actForm.value = form

    showData.value = !showData.value
}

</script>