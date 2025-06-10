<script setup>
import DashboardLayout from "@/Layouts/DashboardLayout.vue";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";
import { onMounted, ref } from "vue";



onMounted(() => {
    getPrices();
})


const store = useUserStore()
const tableData = ref([]);
const editRow = ref(null);

const getPrices = async () => {
    let res = await axios.get(`http://127.0.0.1:8000/api/get-prices`, { headers: { 'Authorization': `Bearer ${store.$state.user.data.token}` } })
    tableData.value = res.data.data
};



const saveRow = async (price) => {
    editRow.value = null;

    let data = {
        'id': price.id,
        'category': price.category,
        'egyetem': price.egyetem,
        'egyetem_hetvege': price.egyetem_hetvege,
        'kulso': price.kulso,
        'kulso_hetvege': price.kulso_hetvege,
    }

    try {
        let res = await axios.post("http://127.0.0.1:8000/api/update-price", data, { headers: { 'Authorization': `Bearer ${store.$state.user.data.token}` } });
        console.log('Edit successful:', res.data);
    } catch (error) {
        console.error('Error during edit:', error);
    }



}

</script>

<template>
    <DashboardLayout>
        <div class="overflow-x-auto">
            <table class="min-w-full border-collapse border border-gray-300">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="border border-gray-300 p-2 text-left">
                            Kategória
                        </th>
                        <th class="border border-gray-300 p-2 text-left">
                            Egyetem
                            <span class="text-[10px] text-gray-500"> (Ft/fő/óra)</span>
                        </th>
                        <th class="border border-gray-300 p-2 text-left">
                            Egyetem (Hétvége)
                            <span class="text-[10px] text-gray-500"> (Ft/fő/óra)</span>
                        </th>
                        <th class="border border-gray-300 p-2 text-left">
                            Külső
                            <span class="text-[10px] text-gray-500"> (Ft/fő/óra)</span>
                        </th>
                        <th class="border border-gray-300 p-2 text-left">
                            Külső (Hétvége)
                            <span class="text-[10px] text-gray-500"> (Ft/fő/óra)</span>
                        </th>
                        <th class="border border-gray-300 p-2 text-left">Művelet</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in tableData" :key="index" class="hover:bg-gray-50">
                        <td class="border border-gray-300 p-2">
                            <input v-if="editRow === index" v-model="row.category"
                                class="w-full border border-gray-300 rounded p-1" />
                            <span v-else>{{ row.category }}</span>
                        </td>
                        <td class="border border-gray-300 p-2">
                            <input v-if="editRow === index" v-model="row.egyetem"
                                class="w-full border border-gray-300 rounded p-1" />
                            <span v-else>{{ row.egyetem }}</span>
                        </td>
                        <td class="border border-gray-300 p-2">
                            <input v-if="editRow === index" v-model="row.egyetem_hetvege"
                                class="w-full border border-gray-300 rounded p-1" />
                            <span v-else>{{ row.egyetem_hetvege }}</span>
                        </td>
                        <td class="border border-gray-300 p-2">
                            <input v-if="editRow === index" v-model="row.kulso"
                                class="w-full border border-gray-300 rounded p-1" />
                            <span v-else>{{ row.kulso }}</span>
                        </td>
                        <td class="border border-gray-300 p-2">
                            <input v-if="editRow === index" v-model="row.kulso_hetvege"
                                class="w-full border border-gray-300 rounded p-1" />
                            <span v-else>{{ row.kulso_hetvege }}</span>
                        </td>
                        <td class="border border-gray-300 p-2">
                            <button v-if="editRow === index" @click="saveRow(row)"
                                class="bg-green-500 text-white px-3 py-1 rounded">
                                Mentés
                            </button>
                            <button v-else @click="editRow = index" class="bg-blue-500 text-white px-3 py-1 rounded">
                                Szerkesztés
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </DashboardLayout>
</template>