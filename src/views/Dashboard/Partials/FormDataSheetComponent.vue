<script setup>
import InfoButton from '@/components/InfoButton.vue';
import TextInput from '@/components/TextInput.vue';
import axios from 'axios';
import { ref } from 'vue';

const props = defineProps(['form', 'token'])
const showInput = ref(0)
const form = ref(props.form);
let SavedForm = form.value

const modify = (modifyNum) => {
  showInput.value = modifyNum;
  SavedForm = Object.assign({}, form.value)
  console.log(form.value)

}

const cancelEdit = () => {
  form.value = Object.assign(form.value, SavedForm)
  showInput.value = 0;
}

const acceptEdit = async () => {
  showInput.value = 0;
  try {
    let res = await axios.patch("http://127.0.0.1:8000/api/modify-form", form.value, { headers: { 'Authorization': `Bearer ${props.token}` } });
    console.log('Edit successful:', res.data);
  } catch (error) {
    console.error('Error during edit:', error);
  }
}


</script>


<template>
  <div class="event-details p-8 bg-gray-50 rounded-lg shadow-md">
    <div class="flex justify-between">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ form.event_name }}</h1>
      <slot name="backButton" />
    </div>

    <p class="text-gray-600 mb-6">{{ form.description }}</p>
    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Adatok</h2>
    <ul class="space-y-2 mb-6">
      <li>
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700">Hely:</strong>
          
          <div v-if="showInput == 1" class="flex gap-5">
            <TextInput v-model="form.event_place"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.event_place }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(1)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li>
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700">Cím:</strong>
          <div v-if="showInput == 2" class="flex gap-5">
            <TextInput v-model="form.event_address"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.event_address }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(2)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
          
        </div>
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
      <li><strong class="text-gray-700">Kezdete:</strong> {{ form.start_date.split("T")[0].replace(/-/g, ".")}} {{
        form.start_time.substring(0, form.start_time.length - 3) }} <InfoButton class="hover:bg-transparent py-1">
          <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
        </InfoButton>
      </li>
      <li><strong class="text-gray-700">Vége:</strong> {{ form.end_date.split("T")[0].replace(/-/g, ".")}} {{
        form.end_time.substring(0, form.end_time.length - 3) }} <InfoButton class="hover:bg-transparent py-1">
          <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
        </InfoButton>
      </li>
    </ul>

    <slot name="buttons" />

  </div>
</template>