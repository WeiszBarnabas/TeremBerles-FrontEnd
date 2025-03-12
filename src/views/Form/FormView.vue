<script setup>
import FormLayout from '@/Layouts/FormLayout.vue';
import ApplicationLayout from '@/Layouts/ApplicationLayout.vue';
import FormIntrodiction from './Partials/FormIntrodiction.vue';
import TextInput from '@/components/TextInput.vue';
import Textarea from '@/components/Textarea.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import axios from 'axios';
import { ref } from "vue";

const formData = ref({
  eventDetails: {
    name: "",
    description: "",
    place: "",
    address: ""
  },
  eventType: "",
  eventClassification: "",
  timing: {
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: ""
  },
  specifics: {
    participants: "",
    pressPublic: "",
    nature: "",
    programPlan: "",
    venueSetup: ""
  },
  logistics: {
    accommodationNeeded: "",
    accommodationCount: "",
    parkingNeeded: "",
    parkingDetails: "",
    wasteGenerated: "",
    wasteDisposal: "",
    wasteHandler: "",
    internetNeeded: "",
    techSupportNeeded: "",
    techEquipment: ""
  },
  additionalRequirements: {
    limitedMobility: "",
    photoVideoRecording: "",
    recordingTools: "",
    cateringNeeded: "",
    cateringType: [],
    constructionNeeded: "",
    constructionDates: {
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: ""
    },
    subcontractors: "",
    highAltitudeWork: "",
    scaffoldingNeeded: "",
    manualMaterialHandling: "",
    mechanicalMaterialHandling: "",
    mechanicalEquipment: [],
    mechanicalOtherTool: "",
    cleaningBefore: "",
    cleaningDuring: "",
    electricalNeeded: [],
    powerCabinet: "",
    powerDemand: ""
  },
  safetyCompliance: {
    fireHazard: "",
    fireHazardDescription: "",
    activities: [],
    chemicalUsage: "",
    chemicalDescription: "",
    decorations: ""
  },
  organizerDetails: {
    name: "",
    phone: "",
    email: "",
    address: "",
    additionalOrganizer: "",
    additionalOrganizerDetails: {
      name: "",
      neptunCode: "",
      phone: "",
      email: "",
      address: ""
    }
  },
  clientDetails: {
    name: "",
    address: "",
    taxNumber: "",
    phone: "",
    email: ""
  },
  fileUploads: {
    eventNotificationForm: null,
    venueLayout: null
  },
  agreements: {
    dataProtection: false,
    eventRegulations: false
  }
});

const currentStep = ref(0);
const totalSteps = 10;

const recaptchaToken = ref("");

const verifyRecaptcha = async () => {
  try {
    recaptchaToken.value = await new Promise((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha.execute("6LfZm-MqAAAAAFC8LhmritWz5OJeR3IecxBf8rmb", { action: "submit" }).then(resolve).catch(reject);
      });
    });
    const response = await axios.post("http://127.0.0.1:8000/api/verify-recaptcha", { token: recaptchaToken.value });
    console.log("reCAPTCHA válasz:", response.data);
    return response.data;
  } catch (error) {
    console.error("Hiba a reCAPTCHA ellenőrzése során:", error);
  }
};

const send = async () => {
  const recaptchaValue = await verifyRecaptcha();

  if (recaptchaValue.success) {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/send-form", formData.value);
      console.log("Form submitted:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }
};

const nextStep = () => {
  if (currentStep.value < totalSteps - 1) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
};

const goToStep = (step) => {
  currentStep.value = step;
};
</script>

<template>
  <ApplicationLayout>
    <div class="bg-white max-w-5xl w-full mx-auto p-6 rounded-lg shadow-lg">
      <h1 class="font-bold text-2xl text-black my-6 text-center">Rendezvénybejelentő űrlap</h1>

      <div class="flex justify-between mb-6">
        <div v-for="(step, index) in totalSteps" :key="index" @click="goToStep(index)"
          class="flex items-center cursor-pointer">
          <div :class="{ 'bg-blue-500': currentStep === index, 'bg-gray-300': currentStep !== index }"
            class="w-8 h-8 rounded-full flex items-center justify-center text-white">
            {{ index + 1 }}
          </div>
        </div>
      </div>

      <FormLayout>
        <div v-if="currentStep === 0" class="space-y-6">
          <FormIntrodiction />
        </div>

        <div v-if="currentStep === 1" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">A rendezvény adatai</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény neve <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.eventDetails.name"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény leírása <span
                  class="text-red-600">*</span></div>
              <Textarea v-model="formData.eventDetails.description"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény helyszíne <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.eventDetails.place"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény pontos címe <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.eventDetails.address"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block sm:w-3/4 w-full mt-2 sm:mt-0"
                placeholder="9026 Győr, Egyetem tér 1." />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény típusa <span
                  class="text-red-600">*</span></div>


              <select id="event_type" class="border border-primary p-1.5 rounded-md text-black block sm:w-3/4 w-full mt-2 sm:mt-0 " v-model="formData.eventType" :class="{'text-gray-600':!formData.eventType}" >
                <option value="" selected hidden disabled>Típusok</option>
                <option value="0">Egyetemi szervezésű rendezvények</option>
                <option value="1">Hallgatói rendezvények</option>
                <option value="2">Külső szervezésű rendezvények</option>
                <option value="3">Sportrendezvények</option>
              </select>

              <!-- <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.eventType" class="mr-2" type="radio"
                    value="university"> Egyetemi szervezésű rendezvények</label>
                <label class="flex items-center"><input v-model="formData.eventType" class="mr-2" type="radio"
                    value="student"> Hallgatói rendezvények</label>
                <label class="flex items-center"><input v-model="formData.eventType" class="mr-2" type="radio"
                    value="external"> Külső szervezésű rendezvények</label>
                <label class="flex items-center"><input v-model="formData.eventType" class="mr-2" type="radio"
                    value="sports"> Sportrendezvények</label>
              </div> -->
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény minősítése <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.eventClassification" class="mr-2" type="radio"
                    value="public"> Nyilvános</label>
                <label class="flex items-center"><input v-model="formData.eventClassification" class="mr-2" type="radio"
                    value="private"> Zártkörű</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény kezdő dátuma <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.timing.startDate" type="date"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény kezdő időpontja <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.timing.startTime" type="time"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény záró dátuma <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.timing.endDate" type="date"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény záró időpontja <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.timing.endTime" type="time"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
          </div>
        </div>

        <div v-if="currentStep === 2" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">A rendezvény részletei</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Résztvevők várható létszáma (fő) <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.specifics.participants"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Sajtónyilvános rendezvény? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.specifics.pressPublic" type="radio"
                    value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.specifics.pressPublic" type="radio" value="no"
                    class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény jellege <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.specifics.nature"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0"
                placeholder="Például: konferencia, workshop, koncert, stb." />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Részletes programterv <span
                  class="text-red-600">*</span></div>
              <Textarea v-model="formData.specifics.programPlan"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0"
                rows="3" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Helyszín berendezési módja <span
                  class="text-red-600">*</span></div>
              <Textarea v-model="formData.specifics.venueSetup"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0"
                rows="3" />
            </div>
            <div class="sm:w-3/4 w-full text-sm text-gray-500 mt-1">Csatolva is megfelelő, ha nem tudja megadni.</div>
          </div>
        </div>

        <div v-if="currentStep === 3" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">Szállás és parkolás</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Szállásigény? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.logistics.accommodationNeeded" type="radio"
                    value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.logistics.accommodationNeeded" type="radio"
                    value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.logistics.accommodationNeeded === 'yes'"
              class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Szállásigény létszáma <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.logistics.accommodationCount" type="number"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Parkolóhely igény? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.logistics.parkingNeeded" type="radio"
                    value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.logistics.parkingNeeded" type="radio"
                    value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.logistics.parkingNeeded === 'yes'"
              class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Gépkocsiforgalom és parkolóhely igény <span
                  class="text-red-600">*</span></div>
              <Textarea v-model="formData.logistics.parkingDetails"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0"
                rows="3" />
            </div>
          </div>
        </div>

        <div v-if="currentStep === 4" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">Hulladékkezelés</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Keletkezik hulladék? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.logistics.wasteGenerated" type="radio"
                    value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.logistics.wasteGenerated" type="radio"
                    value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.logistics.wasteGenerated === 'yes'"
              class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Hulladék elszállításának módja <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.logistics.wasteDisposal" type="radio"
                    value="self" class="mr-2"> Saját úton</label>
                <label class="flex items-center"><input v-model="formData.logistics.wasteDisposal" type="radio"
                    value="university" class="mr-2"> Egyetem által biztosítva</label>
              </div>
            </div>
            <div v-if="formData.logistics.wasteGenerated === 'yes'"
              class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Ki végzi a hulladék elszállítását? <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.logistics.wasteHandler"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
          </div>
        </div>

        <div v-if="currentStep === 5" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">Technikai igények</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Szükséges internetkapcsolat (WiFi)? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.logistics.internetNeeded" type="radio"
                    value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.logistics.internetNeeded" type="radio"
                    value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">
                Oktatástechnikai támogatás szükséges? <span class="text-red-600">*</span>
              </div>
              <div class="rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0">
                <label class="flex items-center"><input v-model="formData.logistics.techSupportNeeded" type="radio"
                    value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.logistics.techSupportNeeded" type="radio"
                    value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="sm:w-3/4 w-full text-sm text-gray-500 mt-1">
              laptop, projektor, prezenter, stb.
            </div>

            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Oktatástechnikai eszközigény <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.logistics.techEquipment"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
          </div>
        </div>

        <div v-if="currentStep === 6" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">Egyéb igények</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Korlátozott mozgású résztvevők? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.limitedMobility"
                    type="radio" value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.limitedMobility"
                    type="radio" value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">
                Fotó/videófelvétel? <span class="text-red-600">*</span>
              </div>
              <div class="rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.photoVideoRecording"
                    type="radio" value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.photoVideoRecording"
                    type="radio" value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="sm:w-3/4 w-full text-sm text-gray-500 mt-1">
              Fényképezőgép, videokamera, GoPro, drón, stb.
            </div>

            <div v-if="formData.additionalRequirements.photoVideoRecording === 'yes'"
              class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Felvétel eszközei <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.additionalRequirements.recordingTools"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Catering szükséges? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cateringNeeded"
                    type="radio" value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cateringNeeded"
                    type="radio" value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.additionalRequirements.cateringNeeded === 'yes'"
              class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Catering típusa <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cateringType"
                    type="checkbox" value="cold" class="mr-2"> Hideg étel</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cateringType"
                    type="checkbox" value="hot" class="mr-2"> Meleg étel</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cateringType"
                    type="checkbox" value="drinks" class="mr-2"> Kávé, tea, üdítő</label>
              </div>
            </div>
            <div v-if="formData.additionalRequirements.cateringNeeded === 'yes'"
              class="sm:w-3/4 w-full text-sm text-gray-500 mt-1">Egyetemi catering partnerekkel egyeztetünk.</div>
          </div>
        </div>

        <div v-if="currentStep === 7" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">Építési és bontási munkálatok</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Építési/bontási munkálatok várhatóak? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.constructionNeeded"
                    type="radio" value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.constructionNeeded"
                    type="radio" value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.additionalRequirements.constructionNeeded === 'yes'" class="space-y-6">
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Terület igénybevételének dátuma <span
                    class="text-red-600">*</span></div>
                <TextInput v-model="formData.additionalRequirements.constructionDates.startDate" type="date"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Terület igénybevételének időpontja <span
                    class="text-red-600">*</span></div>
                <TextInput v-model="formData.additionalRequirements.constructionDates.startTime" type="time"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Terület visszaadásának dátuma <span
                    class="text-red-600">*</span></div>
                <TextInput v-model="formData.additionalRequirements.constructionDates.endDate" type="date"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Terület visszaadásának időpontja <span
                    class="text-red-600">*</span></div>
                <TextInput v-model="formData.additionalRequirements.constructionDates.endTime" type="time"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Alvállalkozók <span
                    class="text-red-600">*</span></div>
                <TextInput v-model="formData.additionalRequirements.subcontractors"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Magasban végzett tevékenység? <span
                    class="text-red-600">*</span></div>
                <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.highAltitudeWork"
                      type="radio" value="yes" class="mr-2"> Igen</label>
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.highAltitudeWork"
                      type="radio" value="no" class="mr-2"> Nem</label>
                </div>
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Állvány szükséges? <span
                    class="text-red-600">*</span></div>
                <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.scaffoldingNeeded"
                      type="radio" value="yes" class="mr-2"> Igen</label>
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.scaffoldingNeeded"
                      type="radio" value="no" class="mr-2"> Nem</label>
                </div>
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Kézi anyagmozgatás? <span
                    class="text-red-600">*</span></div>
                <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                  <label class="flex items-center"><input
                      v-model="formData.additionalRequirements.manualMaterialHandling" type="radio" value="yes"
                      class="mr-2"> Igen</label>
                  <label class="flex items-center"><input
                      v-model="formData.additionalRequirements.manualMaterialHandling" type="radio" value="no"
                      class="mr-2"> Nem</label>
                </div>
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Gépi anyagmozgatás? <span
                    class="text-red-600">*</span></div>
                <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                  <label class="flex items-center"><input
                      v-model="formData.additionalRequirements.mechanicalMaterialHandling" type="radio" value="yes"
                      class="mr-2"> Igen</label>
                  <label class="flex items-center"><input
                      v-model="formData.additionalRequirements.mechanicalMaterialHandling" type="radio" value="no"
                      class="mr-2"> Nem</label>
                </div>
              </div>
              <div v-if="formData.additionalRequirements.mechanicalMaterialHandling === 'yes'"
                class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Gépi anyagmozgatás eszközei <span
                    class="text-red-600">*</span></div>
                <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.mechanicalEquipment"
                      type="checkbox" value="forklift" class="mr-2"> Targonca</label>
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.mechanicalEquipment"
                      type="checkbox" value="crane" class="mr-2"> Daru</label>
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.mechanicalEquipment"
                      type="checkbox" value="other" class="mr-2"> Egyéb emelő eszköz</label>
                </div>
              </div>
              <div v-if="formData.additionalRequirements.mechanicalEquipment.includes('other')"
                class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Egyéb eszköz <span
                    class="text-red-600">*</span></div>
                <TextInput v-model="formData.additionalRequirements.mechanicalOtherTool"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Takarítás a rendezvény előtt? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cleaningBefore"
                    type="radio" value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cleaningBefore"
                    type="radio" value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Takarítási ügyelet a rendezvény alatt? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cleaningDuring"
                    type="radio" value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cleaningDuring"
                    type="radio" value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Villanyszerelői ügyelet szükséges? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.electricalNeeded"
                    type="checkbox" value="before" class="mr-2"> Rendezvény előtt</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.electricalNeeded"
                    type="checkbox" value="during" class="mr-2"> Rendezvény közben</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.electricalNeeded"
                    type="checkbox" value="after" class="mr-2"> Rendezvény után</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.electricalNeeded"
                    type="checkbox" value="none" class="mr-2"> Nem szükséges</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvényszekrényből áram vételezése? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.powerCabinet"
                    type="radio" value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.powerCabinet"
                    type="radio" value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Áramigény <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.additionalRequirements.powerDemand"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
          </div>
        </div>

        <div v-if="currentStep === 8" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">Biztonság és megfelelőség</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Tűzveszélyes tevékenység várható? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.safetyCompliance.fireHazard" type="radio"
                    value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.safetyCompliance.fireHazard" type="radio"
                    value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.safetyCompliance.fireHazard === 'yes'"
              class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Tűzveszély leírása <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.safetyCompliance.fireHazardDescription"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div v-if="formData.safetyCompliance.fireHazard === 'yes'"
              class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Várható tevékenységek <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.safetyCompliance.activities" type="checkbox"
                    value="dust" class="mr-2"> Por</label>
                <label class="flex items-center"><input v-model="formData.safetyCompliance.activities" type="checkbox"
                    value="smoke" class="mr-2"> Füst</label>
                <label class="flex items-center"><input v-model="formData.safetyCompliance.activities" type="checkbox"
                    value="vapor" class="mr-2"> Páraképződés</label>
                <label class="flex items-center"><input v-model="formData.safetyCompliance.activities" type="checkbox"
                    value="none" class="mr-2"> Egyik sem</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Vegyi anyag felhasználása? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.safetyCompliance.chemicalUsage" type="radio"
                    value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.safetyCompliance.chemicalUsage" type="radio"
                    value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.safetyCompliance.chemicalUsage === 'yes'"
              class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Vegyi tevékenység leírása <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.safetyCompliance.chemicalDescription"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Dekoráció a légtérben? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.safetyCompliance.decorations" type="radio"
                    value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.safetyCompliance.decorations" type="radio"
                    value="no" class="mr-2"> Nem</label>
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 9" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">Szervező és megrendelő adatok</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Teljes név <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.organizerDetails.name"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Telefonszám <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.organizerDetails.phone" type="tel"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">E-mail cím <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.organizerDetails.email" type="email"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Lakcím <span class="text-red-600">*</span>
              </div>
              <TextInput v-model="formData.organizerDetails.address"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">További szervező van? <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.organizerDetails.additionalOrganizer"
                    type="radio" value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.organizerDetails.additionalOrganizer"
                    type="radio" value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.organizerDetails.additionalOrganizer === 'yes'" class="space-y-6">
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">További szervező neve <span
                    class="text-red-600">*</span></div>
                <TextInput v-model="formData.organizerDetails.additionalOrganizerDetails.name"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Neptun kód <span
                    class="text-red-600">*</span></div>
                <TextInput v-model="formData.organizerDetails.additionalOrganizerDetails.neptunCode"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Telefonszám <span
                    class="text-red-600">*</span></div>
                <TextInput v-model="formData.organizerDetails.additionalOrganizerDetails.phone" type="tel"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">E-mail cím <span
                    class="text-red-600">*</span></div>
                <TextInput v-model="formData.organizerDetails.additionalOrganizerDetails.email" type="email"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Lakcím <span class="text-red-600">*</span>
                </div>
                <TextInput v-model="formData.organizerDetails.additionalOrganizerDetails.address"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
            </div>
            <div class="p-6">
              <div class="font-bold text-lg text-black">Megrendelő (jogi háttér esetén)</div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Név/Cégnév <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.clientDetails.name"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Cím <span class="text-red-600">*</span>
              </div>
              <TextInput v-model="formData.clientDetails.address"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Adószám <span class="text-red-600">*</span>
              </div>
              <TextInput v-model="formData.clientDetails.taxNumber"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Telefonszám <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.clientDetails.phone" type="tel"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">E-mail cím <span
                  class="text-red-600">*</span></div>
              <TextInput v-model="formData.clientDetails.email" type="email"
                class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="p-6">
              <div class="font-bold text-lg text-black">Fájlfeltöltés és egyezmények</div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">
                Rendezvénybejelentő nyomtatvány <span class="text-red-600">*</span>
              </div>
              <div class="sm:w-3/4 w-full">
                <input type="file" @change="formData.fileUploads.eventNotificationForm = $event.target.files[0]"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black w-full mt-2 sm:mt-0" />
                <div class="text-sm text-gray-500 mt-1">Max. méret 6Mb</div>
              </div>
            </div>

            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">
                Helyszín berendezési rajz (opcionális)
              </div>
              <div class="sm:w-3/4 w-full">
                <input type="file" @change="formData.fileUploads.venueLayout = $event.target.files[0]"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black w-full mt-2 sm:mt-0" />
                <div class="text-sm text-gray-500 mt-1">Max. méret 6Mb</div>
              </div>
            </div>

            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">
                Adatkezelési hozzájárulás <span class="text-red-600">*</span>
              </div>
              <div class="sm:w-3/4 w-full">
                <label class="flex items-center rounded-md p-2 text-black w-full mt-2 sm:mt-0">
                  <input v-model="formData.agreements.dataProtection" type="checkbox" class="mr-2"> Elfogadom
                </label>
                <div class="text-sm text-gray-500 mt-1">
                  Az űrlap kitöltésével büntetőjogi felelősségem tudatában kijelentem, hogy az adatok valósak, és
                  hozzájárulok az adatkezeléshez a 1992. évi LXIII. törvény szerint.
                </div>
              </div>
            </div>

            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">
                Rendezvényszabályzat elfogadása <span class="text-red-600">*</span>
              </div>
              <div class="sm:w-3/4 w-full">
                <label class="flex items-centerrounded-md p-2 text-black w-full mt-2 sm:mt-0">
                  <input v-model="formData.agreements.eventRegulations" type="checkbox" class="mr-2"> Elfogadom
                </label>
                <div class="text-sm text-gray-500 mt-1">
                  A szabályzat <a href="https://munkatars.sze.hu/downloadmanager/details/id/43020/m/13936"
                    target="_blank" class="text-blue-500">ide kattintva</a> érhető el.
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="flex justify-between mt-6">
          <PrimaryButton @click="prevStep" v-if="currentStep > 0">Előző</PrimaryButton>
          <PrimaryButton @click="nextStep" v-if="currentStep < totalSteps - 1" class="ml-auto">Következő</PrimaryButton>
          <PrimaryButton @click="send" v-if="currentStep === totalSteps - 1" class="ml-auto">Beküldés</PrimaryButton>
        </div>
      </FormLayout>
    </div>
  </ApplicationLayout>
</template>