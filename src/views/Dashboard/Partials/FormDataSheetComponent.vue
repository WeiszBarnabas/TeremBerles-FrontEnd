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
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Hely:</strong>
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
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Cím:</strong>
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
      <li class="w-full ">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Típus:</strong>
          <div v-if="showInput == 3" class="flex gap-5">
            <TextInput v-model="form.event_type"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.event_type }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(3)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Minősítés:</strong>
          <div v-if="showInput == 4" class="flex gap-5">
            <TextInput v-model="form.event_classification"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.event_classification }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(4)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Idő</h2>
    <ul class="space-y-2 mb-6">
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Kezdete:</strong>
          <div v-if="showInput == 6" class="flex gap-5">
            <TextInput v-model="form.start_date" type="date"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <TextInput v-model="form.start_time" type="time"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.start_date.split("T")[0].replace(/-/g, ".") }}
            {{ form.start_time.substring(0, form.end_time.length - 3) }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(6)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Vége:</strong>
          <div v-if="showInput == 7" class="flex gap-5">
            <TextInput v-model="form.end_date" type="date"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <TextInput v-model="form.end_time" type="time"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.end_date.split("T")[0].replace(/-/g, ".") }}
            {{ form.end_time.substring(0, form.end_time.length - 3) }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(7)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Specifics</h2>
    <ul class="space-y-2 mb-6">
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Résztvevők:</strong>
          <div v-if="showInput == 8" class="flex gap-5">
            <TextInput v-model="form.participants"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.participants }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(8)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Sajtó nyilvános:</strong>
          <div v-if="showInput == 9" class="flex gap-5">
            <TextInput v-model="form.press_public"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.press_public }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(9)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Jellege:</strong>
          <div v-if="showInput == 10" class="flex gap-5">
            <TextInput v-model="form.nature"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.nature }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(10)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Programterv:</strong>
          <div v-if="showInput == 11" class="flex gap-5">
            <TextInput v-model="form.program_plan"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.program_plan }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(11)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Helyszín berendezési módja:</strong>
          <div v-if="showInput == 12" class="flex gap-5">
            <TextInput v-model="form.venue_setup"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.venue_setup }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(12)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Logisztika</h2>
    <ul class="space-y-2 mb-6">
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Szállásigény:</strong>
          <div v-if="showInput == 13" class="flex gap-5">
            <TextInput v-model="form.accommodation_needed"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.accommodation_needed }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(13)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Szállásigény létszáma:</strong>
          <div v-if="showInput == 14" class="flex gap-5">
            <TextInput v-model="form.accommodation_count"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.accommodation_count }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(14)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Parkolóhely igény:</strong>
          <div v-if="showInput == 15" class="flex gap-5">
            <TextInput v-model="form.parking_needed"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.parking_needed }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(15)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Gépkocsiforgalom és parkolóhely igény:</strong>
          <div v-if="showInput == 16" class="flex gap-5">
            <TextInput v-model="form.parking_details"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.parking_details }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(16)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Keletkező hulladék:</strong>
          <div v-if="showInput == 17" class="flex gap-5">
            <TextInput v-model="form.waste_generated"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.waste_generated }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(17)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Hulladékkezelés:</strong>
          <div v-if="showInput == 18" class="flex gap-5">
            <TextInput v-model="form.waste_disposal"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.waste_disposal }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(18)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Hulladékkezelő:</strong>
          <div v-if="showInput == 19" class="flex gap-5">
            <TextInput v-model="form.waste_handler"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.waste_handler }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(19)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Internet igény:</strong>
          <div v-if="showInput == 20" class="flex gap-5">
            <TextInput v-model="form.internet_needed"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.internet_needed }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(20)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Oktatástechnikai támogatás szükséges:</strong>
          <div v-if="showInput == 21" class="flex gap-5">
            <TextInput v-model="form.tech_supportNeeded"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.tech_supportNeeded }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(21)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Oktatástechnikai eszközigény:</strong>
          <div v-if="showInput == 22" class="flex gap-5">
            <TextInput v-model="form.tech_equipment"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.tech_equipment }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(22)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">További követelmények</h2>
    <ul class="space-y-2 mb-6">
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Korlátozott mozgásképesség:</strong>
          <div v-if="showInput == 23" class="flex gap-5">
            <TextInput v-model="form.limited_mobility"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.limited_mobility }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(23)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Fotó/Videó felvétel:</strong>
          <div v-if="showInput == 24" class="flex gap-5">
            <TextInput v-model="form.photo_videoRecording"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.photo_videoRecording }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(24)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Felvételi eszközök:</strong>
          <div v-if="showInput == 25" class="flex gap-5">
            <TextInput v-model="form.recording_tools"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.recording_tools }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(25)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Catering szükséges:</strong>
          <div v-if="showInput == 26" class="flex gap-5">
            <TextInput v-model="form.catering_needed"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.catering_needed }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(26)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Catering típusa:</strong>
          <div v-if="showInput == 27" class="flex gap-5">
            <TextInput v-model="form.catering_type"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.catering_type }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(27)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Építési igény:</strong>
          <div v-if="showInput == 28" class="flex gap-5">
            <TextInput v-model="form.constructionNeeded"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.constructionNeeded }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(28)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Építési időpontok:</strong>
          <div v-if="showInput == 29" class="flex gap-5">
            <TextInput v-model="form.constructionDates"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.constructionDates }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(29)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Alvállalkozók:</strong>
          <div v-if="showInput == 30" class="flex gap-5">
            <TextInput v-model="form.subcontractors"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.subcontractors }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(30)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Biztonsági előírások</h2>
    <ul class="space-y-2 mb-6">
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Tűzveszély:</strong>
          <div v-if="showInput == 31" class="flex gap-5">
            <TextInput v-model="form.fire_hazard"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.fire_hazard }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(31)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Tevékenységek:</strong>
          <div v-if="showInput == 32" class="flex gap-5">
            <TextInput v-model="form.activities"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.activities }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(32)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Vegyi anyagok használata:</strong>
          <div v-if="showInput == 33" class="flex gap-5">
            <TextInput v-model="form.chemical_usage"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.chemical_usage }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(33)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Dekorációk:</strong>
          <div v-if="showInput == 34" class="flex gap-5">
            <TextInput v-model="form.chemical_description"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.chemical_description }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(34)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Szervező adatai</h2>
    <ul class="space-y-2 mb-6">
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Név:</strong>
          <div v-if="showInput == 35" class="flex gap-5">
            <TextInput v-model="form.organizer_name"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.organizer_name }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(35)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Telefonszám:</strong>
          <div v-if="showInput == 36" class="flex gap-5">
            <TextInput v-model="form.organizer_phone"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.organizer_phone }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(36)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>

      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Email:</strong>
          <div v-if="showInput == 37" class="flex gap-5">
            <TextInput v-model="form.organizer_email"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.organizer_email }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(37)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Cím:</strong>
          <div v-if="showInput == 38" class="flex gap-5">
            <TextInput v-model="form.organizer_address"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><font-awesome-icon icon="fa-solid fa-x" /></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" />
            </InfoButton>
          </div>
          <div v-else>
            {{ form.organizer_address }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(38)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
    </ul>

    <slot name="buttons" />

  </div>
</template>