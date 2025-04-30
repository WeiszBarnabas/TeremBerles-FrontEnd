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
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" /></InfoButton>
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
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" /></InfoButton>
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
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" /></InfoButton>
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
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" /></InfoButton>
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
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" /></InfoButton>
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
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" /></InfoButton>
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
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" /></InfoButton>
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
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" /></InfoButton>
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
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><font-awesome-icon icon="fa-solid fa-check" /></InfoButton>
          </div>
          <div v-else>
            {{ form.parking_details }}
            <InfoButton class="hover:bg-transparent py-1" @click="modify(16)">
              <font-awesome-icon class="text-secondary" icon="fa-solid fa-pen-to-square" />
            </InfoButton>
          </div>
        </div>
      </li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Logistics</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Szállásigény:</strong> {{ form.accommodation_needed }}</li>
      <li><strong class="text-gray-700">Szállásigény létszáma:</strong> {{ form.accommodation_count }}</li>
      <li><strong class="text-gray-700">Parkolóhely igény:</strong> {{ form.parking_needed }}</li>
      <li><strong class="text-gray-700">Gépkocsiforgalom és parkolóhely igény:</strong> {{ form.parking_details }}</li>
      <li><strong class="text-gray-700">Waste Generated:</strong> {{ form.waste_generated }}</li>
      <li><strong class="text-gray-700">Waste Disposal:</strong> {{ form.waste_disposal }}</li>
      <li><strong class="text-gray-700">Waste Handler:</strong> {{ form.waste_handler }}</li>
      <li><strong class="text-gray-700">Internet Needed:</strong> {{ form.internet_needed }}</li>
      <li><strong class="text-gray-700">Tech Support Needed:</strong> {{ form.tech_supportNeeded }}</li>
      <li><strong class="text-gray-700">Tech Equipment:</strong> {{ form.tech_equipment }}</li>
    </ul>

    <!-- <h2 class="text-2xl font-semibold text-gray-700 mb-4">Additional Requirements</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Limited Mobility:</strong> {{ form.limited_mobility }}</li>
      <li><strong class="text-gray-700">Photo/Video Recording:</strong> {{ form.photo_videoRecording }}</li>
      <li><strong class="text-gray-700">Recording Tools:</strong> {{ form.recording_tools }}</li>
      <li><strong class="text-gray-700">Catering Needed:</strong> {{ form.catering_needed }}</li>
      <li><strong class="text-gray-700">Catering Type:</strong> {{ form.catering_type }}</li>
      <li><strong class="text-gray-700">Construction Needed:</strong> {{ form.constructionNeeded }}</li>
      <li><strong class="text-gray-700">Construction Dates:</strong> {{ form.constructionDates }} to {{ form.constructionDates }}</li>
      <li><strong class="text-gray-700">Subcontractors:</strong> {{ form.subcontractors }}</li>
      <li><strong class="text-gray-700">High Altitude Work:</strong> {{ form.highAltitudeWork }}</li>
      <li><strong class="text-gray-700">Scaffolding Needed:</strong> {{ form.scaffoldingNeeded }}</li>
      <li><strong class="text-gray-700">Manual Material Handling:</strong> {{ form.manualMaterialHandling }}</li>
      <li><strong class="text-gray-700">Mechanical Material Handling:</strong> {{ form.mechanicalMaterialHandling }}</li>
      <li><strong class="text-gray-700">Mechanical Equipment:</strong> {{ form.mechanicalEquipment }}</li>
      <li><strong class="text-gray-700">Cleaning Before:</strong> {{ form.cleaningBefore }}</li>
      <li><strong class="text-gray-700">Cleaning During:</strong> {{ form.cleaningDuring }}</li>
      <li><strong class="text-gray-700">Electrical Needed:</strong> {{ form.electricalNeeded }}</li>
      <li><strong class="text-gray-700">Power Cabinet:</strong> {{ form.powerCabinet }}</li>
      <li><strong class="text-gray-700">Power Demand:</strong> {{ form.powerDemand }}</li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Safety Compliance</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Fire Hazard:</strong> {{ form.safetyCompliance.fireHazard }}</li>
      <li><strong class="text-gray-700">Activities:</strong> {{ form.safetyCompliance.activities }}</li>
      <li><strong class="text-gray-700">Chemical Usage:</strong> {{ form.safetyCompliance.chemicalUsage }}</li>
      <li><strong class="text-gray-700">Decorations:</strong> {{ form.safetyCompliance.decorations }}</li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Organizer Details</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Name:</strong> {{ form.organizerDetails.name }}</li>
      <li><strong class="text-gray-700">Phone:</strong> {{ form.organizerDetails.phone }}</li>
      <li><strong class="text-gray-700">Email:</strong> {{ form.organizerDetails.email }}</li>
      <li><strong class="text-gray-700">Address:</strong> {{ form.organizerDetails.address }}</li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Client Details</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Name:</strong> {{ form.clientDetails.name }}</li>
      <li><strong class="text-gray-700">Address:</strong> {{ form.clientDetails.address }}</li>
      <li><strong class="text-gray-700">Tax Number:</strong> {{ form.clientDetails.taxNumber }}</li>
      <li><strong class="text-gray-700">Phone:</strong> {{ form.clientDetails.phone }}</li>
      <li><strong class="text-gray-700">Email:</strong> {{ form.clientDetails.email }}</li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">File Uploads</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Event Notification Form:</strong> {{ form.fileUploads.eventNotificationForm || 'Not uploaded' }}</li>
      <li><strong class="text-gray-700">Venue Layout:</strong> {{ form.fileUploads.venueLayout || 'Not uploaded' }}</li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Agreements</h2>
    <ul class="space-y-2">
      <li><strong class="text-gray-700">Data Protection:</strong> {{ form.agreements.dataProtection ? 'Agreed' : 'Not agreed' }}</li>
      <li><strong class="text-gray-700">Event Regulations:</strong> {{ form.agreements.eventRegulations ? 'Agreed' : 'Not agreed' }}</li>
    </ul> -->


    <slot name="buttons" />

  </div>
</template>