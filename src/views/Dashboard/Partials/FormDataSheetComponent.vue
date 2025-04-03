<script setup>
import InfoButton from '@/components/InfoButton.vue';
import Modal from '@/components/Modal.vue';
import TextInput from '@/components/TextInput.vue';
import { ref } from 'vue';

const props = defineProps(['form'])


const showInput = ref(true)
const form = ref(props.form);
let SavedForm = form.value

const modify = () => {
  showInput.value = false;
  SavedForm =  Object.assign({}, form.value)
  console.log(form.value)

}

const cancelEdit = () => {
  form.value = Object.assign(form.value, SavedForm) 
  showInput.value = true;
}

const acceptEdit = () => {
  showInput.value = true;
  
}


</script>


<template>
  <div class="event-details p-8 bg-gray-50 rounded-lg shadow-md">
    <div class="flex justify-between">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ form.event_name }}</h1>
      <slot name="backButton"/>
    </div>
    <p class="text-gray-600 mb-6">{{ form.description }}</p>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Adatok</h2>
    <ul class="space-y-2 mb-6">
      <li>
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700">Hely:</strong>
          <div v-if="showInput">
            {{ form.event_place }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
          <div v-else class="flex gap-5">
            <TextInput v-model="form.event_place"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x"/></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check"/></InfoButton>
          </div>
          
        </div>
      </li>
      <li>
        <strong class="text-gray-700">Cím:</strong>
        {{ form.event_address }}
        <InfoButton class="hover:bg-transparent py-1">
          <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
        </InfoButton>
      </li>
      <li>
        <strong class="text-gray-700">Típus:</strong>
        {{ form.event_type }}
        <InfoButton class="hover:bg-transparent py-1">
          <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
        </InfoButton>
      </li>
      <li>
        <div>
          <strong class="text-gray-700">Minősítés:</strong>
          {{ form.event_classification }}
          <InfoButton class="hover:bg-transparent py-1">
            <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
          </InfoButton>
        </div>
      </li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Idő</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Kezdete:</strong> {{ form.start_date }} {{
        form.start_time.substring(0, form.start_time.length - 3) }} <InfoButton class="hover:bg-transparent py-1">
          <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
        </InfoButton>
      </li>
      <li><strong class="text-gray-700">Vége:</strong> {{ form.end_date }} {{
        form.end_time.substring(0, form.start_time.length - 3) }} <InfoButton class="hover:bg-transparent py-1">
          <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
        </InfoButton>
      </li>
    </ul>

    <slot name="buttons" />

  </div>

  <!-- <Modal v-show="showModal">
    <template #content>
      <TextInput v-model="showModal"
        class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block sm:w-3/4 w-full mt-2 sm:mt-0" />

    </template>
  </Modal> -->

</template>