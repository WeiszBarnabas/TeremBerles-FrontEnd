<script setup>
import InfoButton from '@/components/InfoButton.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';

defineProps(["forms"])
</script>

<template>
    <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <table class="w-full text-left table-auto min-w-max">
            <thead>
                <tr>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p
                            class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            #
                        </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p
                            class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Megnevezés
                        </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p
                            class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Cím
                        </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 ">
                        <p
                            class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70 px-2">
                            Állapot
                        </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p
                            class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">

                        </p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="form in forms" class="hover:bg-gray-100">
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
                            {{ form.address }}
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
                            <slot name="nextButton" />
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
