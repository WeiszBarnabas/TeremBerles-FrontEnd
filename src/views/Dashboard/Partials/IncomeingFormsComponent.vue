<script setup>

</script>

<template>
    <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <table class="w-full text-left table-auto min-w-max">
            <thead>
                <tr>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p class="block  text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            #
                        </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 max-w-1/8">
                        <p class="block  text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70 ">
                            Megnevezés
                        </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 ">
                        <p
                            class="block  text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70 px-2">
                            Állapot
                        </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 ">
                        <p
                            class="block  text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70 px-2">
                            Helyszín
                        </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 ">
                        <p
                            class="block  text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70 px-2">
                            Időpont
                        </p>
                    </th>

                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    </th>
                </tr>
                <tr>
                    <th colspan="10" class="w-full p-3">
                        <slot name="search" />
                    </th>
                </tr>
            </thead>
            <tbody>
                <slot />
            </tbody>
        </table>
    </div>
</template>
