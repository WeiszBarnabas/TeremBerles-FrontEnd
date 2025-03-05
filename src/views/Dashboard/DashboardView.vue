<template>
    <DashboardLayout>
        <IncomeingFormsComponent :forms="forms">
            <template #nextButton>
                <InfoButton>Tovább</InfoButton>
            </template>
        </IncomeingFormsComponent>



        
    </DashboardLayout>

</template>

<script setup>
import IncomeingFormsComponent from '@/views/Dashboard/Partials/IncomeingFormsComponent.vue';
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import InfoButton from '@/components/InfoButton.vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';

const forms = ref();
const store = useUserStore()
const getForms = async () => {
    let res = await axios.get("http://127.0.0.1:8000/api/forms", { headers: { 'Authorization': `Bearer ${store.$state.user.data.token}` } })
    forms.value = res.data.data
}

getForms()


</script>