<script setup>
import InfoButton from '@/components/InfoButton.vue';
import TextInput from '@/components/TextInput.vue';
import { ref } from 'vue';

const props = defineProps(['showUserModal'])
const emit = defineEmits(['close'])

const users = ref([
    { id: 1, name: 'Kiss János', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 2, name: 'Nagy Anna', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 3, name: 'Tóth Béla', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 4, name: 'Szabó Éva', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 5, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 5, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 5, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 5, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 5, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 5, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 5, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 5, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 5, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 5, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
]);

const selectedUsers = ref([]);
const searchInput = ref('');

const search = () => {

};

const save = () => {

}

const close = () => {
    emit('close')
}

</script>

<template>
    <div v-show="showUserModal">
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div class="fixed inset-0 z-10 w-screen">
                <div class="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:max-h-[600px]">
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-scroll">
                            <div class="sm:flex sm:items-start">
                                <div class="w-full">
                                    <div class="flex justify-between items-center mb-4">
                                        <h2 class="text-lg font-semibold text-gray-700">Felhasználók</h2>
                                        <div class="flex w-2/3">
                                            <div class="relative w-full">
                                                <TextInput
                                                    class="block p-2.5 w-full z-20 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Keresés" v-model="searchInput" @change="search" />
                                                <button @click="search"
                                                    class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-600 rounded-e-lg border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                                    <svg class="w-4 h-4" aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 20 20">
                                                        <path stroke="currentColor" stroke-linecap="round"
                                                            stroke-linejoin="round" stroke-width="2"
                                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="overflow-x-auto max-h-[400px]">
                                        <table
                                            class="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
                                            <thead class="bg-gray-100">
                                                <tr>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                        #
                                                    </th>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                        Kép
                                                    </th>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                        ID
                                                    </th>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                        Név
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <input type="checkbox" v-model="selectedUsers" :value="user.id"
                                                            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <img :src="user.image" alt="User Image"
                                                            class="w-10 h-10 rounded-full">
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        {{ user.id }}
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        {{ user.name }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <div class="flex justify-end gap-4 mt-4">
                                <InfoButton @click="close"
                                    class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-4 focus:ring-gray-300">
                                    Mégsem
                                </InfoButton>
                                <InfoButton @click="save"
                                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">
                                    Hozzáad
                                </InfoButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>