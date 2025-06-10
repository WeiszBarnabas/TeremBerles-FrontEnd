<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue';
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import Dropdown from '@/components/Dropdown.vue';
import { ref } from 'vue';


const setRole = async (r) => {
    
}

const users = ref([
    { id: 1, name: 'Kiss János', image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/458077149_2649971205204293_3066285500035166784_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=pgcltmb4A8AQ7kNvwGj_ECe&_nc_oc=Admkuoff4T0KOt8zmfq24JS6R6eKFyxXxHc06Zm0DSnM_zjWWsZ98VKbXitCtm2sZPs&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=vKwh4qnPckgAJsad3T-d6A&oh=00_AfOinFkAmDVzE4HzIv6EUkCXhZlV0dHfMyWsQWF_5g1sRQ&oe=68473DB1' },
    { id: 2, name: 'Nagy Anna', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 3, name: 'Tóth Béla', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 4, name: 'Szabó Éva', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 5, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 6, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 7, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 8, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 9, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 10, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 11, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 12, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 13, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 14, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 15, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
    { id: 16, name: 'Varga Péter', image: 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.webp' },
]);



</script>

<template>
    <DashboardLayout>
        <table class="w-full text-left table-auto min-w-max">
            <thead class="bg-gray-100">
                <tr>
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
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-1/7">
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <img :src="user.image" alt="User Image" class="w-10 h-10 rounded-full">
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ user.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ user.name }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <Dropdown align="right" width="200" :mode="true">
                            <template #trigger>
                                <PrimaryButton :id="`dropdownToggleButton-${user.id}`"
                                    :data-dropdown-toggle="`dropdownToggle-${user.id}`">
                                    Kezelés
                                    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </PrimaryButton>
                            </template>

                            <template #content>
                                <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                                    :aria-labelledby="`dropdownToggleButton-${userId}`">
                                    <li>
                                        <div class="flex p-2 rounded-sm hover:bg-gray-100 ">
                                            <label class="inline-flex items-center w-full cursor-pointer">
                                                <input type="checkbox" value="" class="sr-only peer" @change="setRole(1)">
                                                <div
                                                    class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-600 ">
                                                </div>
                                                <span class="ms-3 text-sm font-medium text-gray-900 ">Rendezvény
                                                    szervező</span>
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="flex p-2 rounded-sm hover:bg-gray-100 ">
                                            <label class="inline-flex items-center w-full cursor-pointer">
                                                <input type="checkbox" value="" class="sr-only peer" @change="setRole(2)">
                                                <div
                                                    class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-600 ">
                                                </div>
                                                <span class="ms-3 text-sm font-medium text-gray-900 ">Uni famulus</span>
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="flex p-2 rounded-sm hover:bg-gray-100 ">
                                            <label class="inline-flex items-center w-full cursor-pointer">
                                                <input type="checkbox" value="" class="sr-only peer" @change="setRole(3)">
                                                <div
                                                    class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-600 ">
                                                </div>
                                                <span class="ms-3 text-sm font-medium text-gray-900 ">Jogi
                                                    munkatárs</span>
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="flex p-2 rounded-sm hover:bg-gray-100 ">
                                            <label class="inline-flex items-center w-full cursor-pointer">
                                                <input type="checkbox" value="" class="sr-only peer" @change="setRole(4)">
                                                <div
                                                    class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-600 ">
                                                </div>
                                                <span class="ms-3 text-sm font-medium text-gray-900">Admin</span>
                                            </label>
                                        </div>
                                    </li>
                                </ul>

                            </template>
                        </Dropdown>


                        <!-- <PrimaryButton :id="`dropdownToggleButton-${user.id}`"
                            :data-dropdown-toggle="`dropdownToggle-${user.id}`">
                            Kezelés
                            <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </PrimaryButton>
                        <ModifyRoleDropdown :userId="user.id" /> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </DashboardLayout>

</template>