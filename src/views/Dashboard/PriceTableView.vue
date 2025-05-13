<script setup>
import DashboardLayout from "@/Layouts/DashboardLayout.vue";
import { ref } from "vue";

const tableData = ref([
    {
        category: "Eseti beltéri takarítás óradíja",
        egyetem: "3000",
        egyetem_hetvege: "3500",
        kulso: "3800",
        kulso_hetvege: "4800",
    },
    {
        category: "Eseti recepció/porta óradíja",
        egyetem: "3000",
        egyetem_hetvege: "3500",
        kulso: "3800",
        kulso_hetvege: "4800",
    },
    {
        category: "Eseti kültéri takarítás óradíja",
        egyetem: "3000",
        egyetem_hetvege: "3500",
        kulso: "3800",
        kulso_hetvege: "4800",
    },
    {
        category: "Eseti karbantartási feladatok óradíja",
        egyetem: "3900",
        egyetem_hetvege: "4500",
        kulso: "5000",
        kulso_hetvege: "6000",
    },
    {
        category: "Eseti gondnoksági feladatok óradíja",
        egyetem: "3900",
        egyetem_hetvege: "4500",
        kulso: "5000",
        kulso_hetvege: "6000",
    },
    {
        category: "Rendezvény biztonságszervezés, biztonsági dokumentáció díja, kiemelt helyszín",
        egyetem: "85000",
        egyetem_hetvege: "85000",
        kulso: "110000",
        kulso_hetvege: "110000",
    },
    {
        category: "Rendezvény biztonságszervezés, biztonsági dokumentáció díja, általános helyszín",
        egyetem: "50000",
        egyetem_hetvege: "50000",
        kulso: "70000",
        kulso_hetvege: "70000",
    },
    {
        category: "Rendezvénybiztos szolgáltatás díja (rendezvényeken felmerülő biztonsági feladatok koordinálása, min. 4 óra)",
        egyetem: "5500",
        egyetem_hetvege: "5500",
        kulso: "6000",
        kulso_hetvege: "6000",
    },
    {
        category: "Rendezvényeken, indokolt esetben egyéb helyszíneken biztonsági személyzet díja (min. 4 óra)",
        egyetem: "3500",
        egyetem_hetvege: "3500",
        kulso: "3900",
        kulso_hetvege: "3900",
    },
    {
        category: "Zenés-táncos rendezvényeken, indokolt esetben kiemelt helyszíneken biztonsági személyzet díja (min. 4 óra)",
        egyetem: "3900",
        egyetem_hetvege: "4500",
        kulso: "4500",
        kulso_hetvege: "4500",
    },
    {
        category: "Tűz- munkavédelmi szolgáltatás díja",
        egyetem: "8500",
        egyetem_hetvege: "8500",
        kulso: "10000",
        kulso_hetvege: "11000",
    },
    {
        category: "Biztonságtechnikai szolgáltatás díja",
        egyetem: "8500",
        egyetem_hetvege: "8500",
        kulso: "10000",
        kulso_hetvege: "11000",
    },
]);

const editRow = ref(null);

function saveRow(index) {
    editRow.value = null;
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
                            <input
                                v-if="editRow === index"
                                v-model="row.category"
                                class="w-full border border-gray-300 rounded p-1"
                            />
                            <span v-else>{{ row.category }}</span>
                        </td>
                        <td class="border border-gray-300 p-2">
                            <input
                                v-if="editRow === index"
                                v-model="row.egyetem"
                                class="w-full border border-gray-300 rounded p-1"
                            />
                            <span v-else>{{ row.egyetem }}</span>
                        </td>
                        <td class="border border-gray-300 p-2">
                            <input
                                v-if="editRow === index"
                                v-model="row.egyetem_hetvege"
                                class="w-full border border-gray-300 rounded p-1"
                            />
                            <span v-else>{{ row.egyetem_hetvege }}</span>
                        </td>
                        <td class="border border-gray-300 p-2">
                            <input
                                v-if="editRow === index"
                                v-model="row.kulso"
                                class="w-full border border-gray-300 rounded p-1"
                            />
                            <span v-else>{{ row.kulso }}</span>
                        </td>
                        <td class="border border-gray-300 p-2">
                            <input
                                v-if="editRow === index"
                                v-model="row.kulso_hetvege"
                                class="w-full border border-gray-300 rounded p-1"
                            />
                            <span v-else>{{ row.kulso_hetvege }}</span>
                        </td>
                        <td class="border border-gray-300 p-2">
                            <button
                                v-if="editRow === index"
                                @click="saveRow(index)"
                                class="bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Mentés
                            </button>
                            <button
                                v-else
                                @click="editRow = index"
                                class="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Szerkesztés
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </DashboardLayout>
</template>