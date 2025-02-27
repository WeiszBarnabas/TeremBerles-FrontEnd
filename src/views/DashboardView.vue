<template>
    <DashboardLayout>
        <template #image>
            <ApplicationLogo />
            <!-- <img src="../assets/egyetemi logo/allo_RGB/sze_logo_allo_RGB_dark_blue_bg.png" alt="" class="w-1/2"> -->
        </template>



        <IncomeingFormsComponent :forms="forms"/>

    </DashboardLayout>

</template>

<script setup>
import ApplicationLogo from '@/components/ApplicationLogo.vue';
import IncomeingFormsComponent from '@/components/IncomeingFormsComponent.vue';
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
import { ref } from 'vue';

const forms = ref();
const store = useUserStore()
const getForms = async () => {
    let res = await axios.get("http://127.0.0.1:8000/api/forms",{ headers: {'Authorization': `Bearer ${store.$state.user.data.token}`}})
    forms.value = res.data .data
}

getForms()


</script>