<script setup>
import PrimaryButton from "@/components/PrimaryButton.vue";
import axios from "axios";
import { ref, computed } from "vue";

const props = defineProps(["token", 'formId']);
const emit = defineEmits(['close'])

const priceCategories = ref([]);
const selectedCategories = ref([]);
const newCategory = ref("");


const getPrices = async () => {
    const res = await axios.get(
        "http://127.0.0.1:8000/api/get-uni-prices",
        { headers: { Authorization: `Bearer ${props.token}` } }
    );
    priceCategories.value = res.data.data;


    selectedCategories.value = priceCategories.value.map(item => ({
        ...item,
        quantity: 1,
        excluding_vat: Number(item.excluding_vat ?? 0),
        vat: Number(item.vat ?? 0)
    }));
};


const calcGross = (item) => {
    const net = item.excluding_vat || 0;
    const vat = item.vat || 0;
    return (net + net * vat / 100) * item.quantity;
};


const removeCategory = (idx) => {
    selectedCategories.value.splice(idx, 1);
};


const addCategory = () => {
    if (!newCategory.value) return;
    selectedCategories.value.push({
        ...newCategory.value,
        quantity: 1,
        excluding_vat: Number(newCategory.value.excluding_vat ?? 0),
        vat: Number(newCategory.value.vat ?? 0)
    });
    newCategory.value = "";
};


const grandTotal = computed(() =>
    selectedCategories.value.reduce((sum, item) => sum + calcGross(item), 0)
);

getPrices();


const acceptOffer = async () => {
    const res = await axios.post("http://127.0.0.1:8000/api/send-uni-prices", {"data": selectedCategories.value, "form": props.formId} ,{ headers: { Authorization: `Bearer ${props.token}` } });
    emit('close')
}






</script>


<template>
    <div class="border-t pt-10">
        <h2 class="text-2xl font-bold mb-8">Szolgáltatások</h2>

        <ul class="grid gap-6">
            <li v-for="(item, idx) in selectedCategories" :key="item.id"
                class="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row md:items-center justify-between gap-5">


                <div class="flex flex-col md:flex-row md:items-center gap-6 flex-1">
                    <div class="md:w-1/3">
                        <p class="text-lg font-semibold">{{ item.name }}</p>
                        <p class="text-sm text-gray-500">
                            ÁFA: <span class="font-medium">{{ item.vat }}%</span>
                        </p>
                    </div>

                    <div class="flex flex-col justify-end md:flex-row items-center gap-4 flex-1">
                        <input type="number" min="1" v-model.number="item.quantity"
                            class="border border-gray-300 rounded-lg px-4 py-2 w-32 focus:ring-2 focus:ring-indigo-400" />

                        <div class="text-gray-700 text-sm">
                            Nettó:
                            <span class="font-medium">
                                {{ (item.excluding_vat * item.quantity).toLocaleString() }} Ft
                            </span><br>
                            Bruttó:
                            <span class="font-medium">
                                {{ calcGross(item).toLocaleString() }} Ft
                            </span>
                        </div>
                    </div>
                </div>


                <button @click="removeCategory(idx)" class="text-red-500 hover:bg-red-100 rounded-full p-3 transition"
                    title="Törlés">
                    <i class="pi pi-trash text-xl"></i>
                </button>
            </li>


            <li>
                <select v-model="newCategory" @change="addCategory"
                    class="bg-white border border-gray-300 rounded-xl px-4 py-3 w-full shadow-sm focus:ring-2 focus:ring-indigo-400">
                    <option value="" hidden>➕ Új szolgáltatás hozzáadása</option>
                    <option v-for="item in priceCategories" :key="item.id" :value="item">
                        {{ item.name }}
                    </option>
                </select>
            </li>
        </ul>


        <div class="mt-8 p-4 bg-gray-50 rounded-x items-center flex justify-end gap-4">
            <p class="text-xl font-bold">
                Összesen (Bruttó): {{ grandTotal.toLocaleString() }} Ft
            </p>
        </div>

        <div class="flex justify-between ">
            <slot/>
            <Button label="Elfogadás" @click="acceptOffer"/>
        </div>
    </div>
</template>
