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
    pressPublic: false,
    nature: "",
    programPlan: "",
    venueSetup: "",
    venueSetupService: ""
  },
  logistics: {
    accommodationNeeded: false,
    accommodationCount: "",
    parkingNeeded: false,
    parkingDetails: "",
    wasteGenerated: false,
    wasteDisposal: "",
    wasteHandler: "",
    internetNeeded: false,
    techSupportNeeded: false,
    techEquipment: "",
    securityServiceNeeded: false
  },
  additionalRequirements: {
    limitedMobility: false,
    photoVideoRecording: false,
    recordingTools: "",
    cateringNeeded: false,
    cateringType: [],
    constructionNeeded: false,
    constructionDates: {
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: ""
    },
    subcontractors: "",
    highAltitudeWork: false,
    scaffoldingNeeded: false,
    manualMaterialHandling: false,
    mechanicalMaterialHandling: false,
    mechanicalEquipment: [],
    mechanicalOtherTool: "",
    cleaningBefore: false,
    cleaningDuring: false,
    electricalNeeded: [],
    powerCabinet: false,
    powerDemand: "",
    includeInEventRecommendation: false,
    includeInCentralCalendar: false
  },
  safetyCompliance: {
    fireHazard: false,
    fireHazardDescription: "",
    activities: [],
    chemicalUsage: false,
    chemicalDescription: "",
    decorations: false
  },
  organizerDetails: {
    name: "",
    phone: "",
    email: "",
    address: "",
    additionalOrganizer: false,
    additionalOrganizerDetails: {
      name: "",
      neptunCode: "",
      phone: "",
      email: "",
      address: ""
    },
    workNumber: ""
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
const errorMessage = ref("");

// const verifyRecaptcha = async () => {
//   try {
//     recaptchaToken.value = await new Promise((resolve, reject) => {
//       grecaptcha.ready(() => {
//         grecaptcha.execute("6LfZm-MqAAAAAFC8LhmritWz5OJeR3IecxBf8rmb", { action: "submit" }).then(resolve).catch(reject);
//       });
//     });
//     const response = await axios.post("http://127.0.0.1:8000/api/verify-recaptcha", { token: recaptchaToken.value });
//     console.log("reCAPTCHA response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error verifying reCAPTCHA:", error);
//   }
// };

const isInternalEvent = () => ["university", "universityStudent", "universitySports"].includes(formData.value.eventType);
const isExternalEvent = () => ["externalSports", "external"].includes(formData.value.eventType);

const validateStep = (step) => {
  const errors = [];

  const checkField = (field, message) => {
    if (!field || (Array.isArray(field) && field.length === 0)) {
      errors.push(message);
    }
  };

  switch (step) {
    case 2:
      checkField(formData.value.eventDetails.name, "A rendezvény neve kötelező.");
      checkField(formData.value.eventDetails.description, "A rendezvény leírása kötelező.");
      checkField(formData.value.eventDetails.place, "A rendezvény helyszíne kötelező.");
      checkField(formData.value.eventDetails.address, "A rendezvény pontos címe kötelező.");
      checkField(formData.value.eventType, "A rendezvény típusa kötelező.");
      checkField(formData.value.eventClassification, "A rendezvény minősítése kötelező.");
      checkField(formData.value.timing.startDate, "A kezdő dátum kötelező.");
      checkField(formData.value.timing.startTime, "A kezdő időpont kötelező.");
      checkField(formData.value.timing.endDate, "A záró dátum kötelező.");
      checkField(formData.value.timing.endTime, "A záró időpont kötelező.");
      break;

    case 3:
      checkField(formData.value.specifics.participants, "A résztvevők száma kötelező.");
      checkField(formData.value.specifics.nature, "A rendezvény jellege kötelező.");
      checkField(formData.value.specifics.programPlan, "A részletes programterv kötelező.");
      checkField(formData.value.specifics.venueSetup, "A helyszín berendezési módja kötelező.");
      checkField(formData.value.specifics.venueSetupService, "A helyszín berendezési módjának kiválasztása kötelező.");
      break;

    case 4:
      if (formData.value.logistics.accommodationNeeded) {
        checkField(formData.value.logistics.accommodationCount, "A szállásigény létszáma kötelező.");
      }
      if (formData.value.logistics.parkingNeeded) {
        checkField(formData.value.logistics.parkingDetails, "A parkolóhely igény részletei kötelezőek.");
      }
      break;

    case 5:
      if (formData.value.logistics.wasteGenerated) {
        checkField(formData.value.logistics.wasteDisposal, "A hulladék elszállításának módja kötelező.");
        checkField(formData.value.logistics.wasteHandler, "A hulladék elszállítását végző személy neve kötelező.");
      }
      break;

    case 6:
      checkField(formData.value.logistics.techEquipment, "Az oktatástechnikai eszközigény megadása kötelező.");
      break;

    case 7:
      if (formData.value.additionalRequirements.photoVideoRecording) {
        checkField(formData.value.additionalRequirements.recordingTools, "A felvétel eszközei kötelezőek.");
      }
      if (formData.value.additionalRequirements.cateringNeeded) {
        checkField(formData.value.additionalRequirements.cateringType, "A catering típusa kötelező.");
      }
      break;

    case 8:
      if (formData.value.additionalRequirements.constructionNeeded) {
        checkField(formData.value.additionalRequirements.constructionDates.startDate, "A terület igénybevételének dátuma kötelező.");
        checkField(formData.value.additionalRequirements.constructionDates.startTime, "A terület igénybevételének időpontja kötelező.");
        checkField(formData.value.additionalRequirements.constructionDates.endDate, "A terület visszaadásának dátuma kötelező.");
        checkField(formData.value.additionalRequirements.constructionDates.endTime, "A terület visszaadásának időpontja kötelező.");
        checkField(formData.value.additionalRequirements.subcontractors, "Az alvállalkozók megadása kötelező.");
      }
      if (formData.value.additionalRequirements.mechanicalMaterialHandling) {
        checkField(formData.value.additionalRequirements.mechanicalEquipment, "A gépi anyagmozgatás eszközei kötelezőek.");
        if (formData.value.additionalRequirements.mechanicalEquipment.includes("other")) {
          checkField(formData.value.additionalRequirements.mechanicalOtherTool, "Az egyéb eszköz megadása kötelező.");
        }
      }
      checkField(formData.value.additionalRequirements.electricalNeeded, "A villanyszerelői ügyelet kiválasztása kötelező.");
      checkField(formData.value.additionalRequirements.powerDemand, "Az áramigény megadása kötelező.");
      break;

    case 9:
      if (formData.value.safetyCompliance.fireHazard) {
        checkField(formData.value.safetyCompliance.fireHazardDescription, "A tűzveszély leírása kötelező.");
        checkField(formData.value.safetyCompliance.activities, "A várható tevékenységek kiválasztása kötelező.");
      }
      if (formData.value.safetyCompliance.chemicalUsage) {
        checkField(formData.value.safetyCompliance.chemicalDescription, "A vegyi tevékenység leírása kötelező.");
      }
      break;

    case 10:
      checkField(formData.value.organizerDetails.name, "A szervező neve kötelező.");
      checkField(formData.value.organizerDetails.phone, "A telefonszám kötelező.");
      checkField(formData.value.organizerDetails.email, "Az e-mail cím kötelező.");
      checkField(formData.value.organizerDetails.address, "A lakcím kötelező.");
      if (isInternalEvent()) {
        checkField(formData.value.organizerDetails.workNumber, "A munkaszám kötelező belső rendezvény esetén.");
      }
      if (formData.value.organizerDetails.additionalOrganizer) {
        checkField(formData.value.organizerDetails.additionalOrganizerDetails.name, "A további szervező neve kötelező.");
        checkField(formData.value.organizerDetails.additionalOrganizerDetails.neptunCode, "A Neptun kód kötelező.");
        checkField(formData.value.organizerDetails.additionalOrganizerDetails.phone, "A telefonszám kötelező.");
        checkField(formData.value.organizerDetails.additionalOrganizerDetails.email, "Az e-mail cím kötelező.");
        checkField(formData.value.organizerDetails.additionalOrganizerDetails.address, "A lakcím kötelező.");
      }
      if (isExternalEvent()) {
        checkField(formData.value.clientDetails.name, "A megrendelő neve kötelező külső rendezvény esetén.");
        checkField(formData.value.clientDetails.address, "A megrendelő címe kötelező.");
        checkField(formData.value.clientDetails.taxNumber, "Az adószám kötelező.");
        checkField(formData.value.clientDetails.phone, "A telefonszám kötelező.");
        checkField(formData.value.clientDetails.email, "Az e-mail cím kötelező.");
      }
      checkField(formData.value.fileUploads.eventNotificationForm, "A rendezvénybejelentő nyomtatvány csatolása kötelező.");
      checkField(formData.value.agreements.dataProtection, "Az adatkezelési hozzájárulás kötelező.");
      checkField(formData.value.agreements.eventRegulations, "A rendezvényszabályzat elfogadása kötelező.");
      break;
  }

  return errors;
};

const validateAllSteps = () => {
  let allErrors = [];
  for (let step = 1; step <= 9; step++) {
    allErrors = allErrors.concat(validateStep(step));
  }
  return allErrors;
};

const nextStep = () => {
  errorMessage.value = "";
  const errors = validateStep(currentStep.value + 1);
  if (errors.length) {
    errorMessage.value = errors[0];
    return;
  }
  if (currentStep.value < totalSteps - 1) currentStep.value++;
};

const prevStep = () => {
  errorMessage.value = "";
  if (currentStep.value > 0) currentStep.value--;
};

const goToStep = (step) => {
  errorMessage.value = "";
  currentStep.value = step;
};

const send = async () => {
  errorMessage.value = "";
  const errors = validateAllSteps();
  if (errors.length) {
    errorMessage.value = errors.length > 1 ? "Kérjük, töltsön ki minden kötelező mezőt!" : errors[0];
    return;
  }
  //const recaptchaValue = await verifyRecaptcha();
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/send-form", formData.value);
    console.log("Form submitted:", response.data);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
</script>

<template>
  <ApplicationLayout>
    <div class="bg-white max-w-5xl w-full mx-auto p-6 rounded-lg shadow-lg">
      <h1 class="font-bold text-2xl text-black my-6 text-center">Rendezvénybejelentő űrlap</h1>

      <div class="flex justify-between mb-6">
        <div v-for="(step, index) in totalSteps" :key="index" @click="goToStep(index)" class="flex items-center cursor-pointer">
          <div :class="{ 'bg-blue-500': currentStep === index, 'bg-gray-300': currentStep !== index }" class="w-8 h-8 rounded-full flex items-center justify-center text-white">
            {{ index + 1 }}
          </div>
        </div>
      </div>

      <div v-if="errorMessage" class="text-red-600 text-center mb-4">
        {{ errorMessage }}
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
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény neve <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.eventDetails.name" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény leírása <span class="text-red-600">*</span></div>
              <Textarea v-model="formData.eventDetails.description" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény helyszíne <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.eventDetails.place" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény pontos címe <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.eventDetails.address" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block sm:w-3/4 w-full mt-2 sm:mt-0" placeholder="9026 Győr, Egyetem tér 1." />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény típusa <span class="text-red-600">*</span></div>
              <select id="event_type" class="border border-primary p-1.5 rounded-md text-black block sm:w-3/4 w-full mt-2 sm:mt-0" v-model="formData.eventType" :class="{'text-gray-600': !formData.eventType}">
                <option value="" selected hidden disabled>Típusok</option>
                <option value="university">Egyetemi szervezésű rendezvény</option>
                <option value="universityStudent">Egyetemi szervezésű hallgatói rendezvény</option>
                <option value="universitySports">Egyetemi szervezésű sportrendezvény</option>
                <option value="externalSports">Külső szervezésű sportrendezvény</option>
                <option value="external">Külső szervezésű rendezvény</option>
              </select>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény minősítése <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.eventClassification" class="mr-2" type="radio" value="nyilvános"> Nyilvános</label>
                <label class="flex items-center"><input v-model="formData.eventClassification" class="mr-2" type="radio" value="zártkörü"> Zártkörű</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény kezdő dátuma <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.timing.startDate" type="date" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény kezdő időpontja <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.timing.startTime" type="time" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény záró dátuma <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.timing.endDate" type="date" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény záró időpontja <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.timing.endTime" type="time" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
          </div>
        </div>

        <div v-if="currentStep === 2" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">A rendezvény részletei</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Résztvevők várható létszáma (fő) <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.specifics.participants" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Sajtónyilvános rendezvény? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.specifics.pressPublic" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.specifics.pressPublic" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvény jellege <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.specifics.nature" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" placeholder="Például: konferencia, workshop, koncert, stb." />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Részletes programterv <span class="text-red-600">*</span></div>
              <Textarea v-model="formData.specifics.programPlan" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" rows="3" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Helyszín berendezési módja <span class="text-red-600">*</span></div>
              <Textarea v-model="formData.specifics.venueSetup" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" rows="3" />
            </div>
            <div class="sm:w-3/4 w-full text-sm text-gray-500 mt-1">Csatolva is megfelelő, ha nem tudja megadni.</div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Helyszín berendezési módja (kiválasztás) <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.specifics.venueSetupService" type="radio" value="uniwork" class="mr-2"> Igénybe veszem az Uniwork diákmunka szolgáltatást a berendezéshez</label>
                <label class="flex items-center"><input v-model="formData.specifics.venueSetupService" type="radio" value="self" class="mr-2"> Saját úton rendezem be a termet</label>
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 3" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">Szállás és parkolás</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Szállásigény? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.logistics.accommodationNeeded" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.logistics.accommodationNeeded" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.logistics.accommodationNeeded" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Szállásigény létszáma <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.logistics.accommodationCount" type="number" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Parkolóhely igény? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.logistics.parkingNeeded" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.logistics.parkingNeeded" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.logistics.parkingNeeded" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Gépkocsiforgalom és parkolóhely igény <span class="text-red-600">*</span></div>
              <Textarea v-model="formData.logistics.parkingDetails" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" rows="3" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Portaszolgálat igénylése a rendezvény idejére <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.logistics.securityServiceNeeded" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.logistics.securityServiceNeeded" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 4" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">Hulladékkezelés</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Keletkezik hulladék? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.logistics.wasteGenerated" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.logistics.wasteGenerated" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.logistics.wasteGenerated" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Hulladék elszállításának módja <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.logistics.wasteDisposal" type="radio" value="self" class="mr-2"> Saját úton</label>
                <label class="flex items-center"><input v-model="formData.logistics.wasteDisposal" type="radio" value="university" class="mr-2"> Egyetem által biztosítva</label>
              </div>
            </div>
            <div v-if="formData.logistics.wasteGenerated" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Ki végzi a hulladék elszállítását? <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.logistics.wasteHandler" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
          </div>
        </div>

        <div v-if="currentStep === 5" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">Technikai igények</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Szükséges internetkapcsolat (WiFi)? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.logistics.internetNeeded" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.logistics.internetNeeded" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Oktatástechnikai támogatás szükséges? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.logistics.techSupportNeeded" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.logistics.techSupportNeeded" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="sm:w-3/4 w-full text-sm text-gray-500 mt-1">laptop, projektor, prezenter, stb.</div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Oktatástechnikai eszközigény <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.logistics.techEquipment" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
          </div>
        </div>

        <div v-if="currentStep === 6" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">Egyéb igények</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Korlátozott mozgású résztvevők? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.limitedMobility" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.limitedMobility" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Fotó/videófelvétel? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.photoVideoRecording" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.photoVideoRecording" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="sm:w-3/4 w-full text-sm text-gray-500 mt-1">Fényképezőgép, videokamera, GoPro, drón, stb.</div>
            <div v-if="formData.additionalRequirements.photoVideoRecording" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Felvétel eszközei <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.additionalRequirements.recordingTools" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Catering szükséges? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cateringNeeded" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cateringNeeded" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.additionalRequirements.cateringNeeded" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Catering típusa <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cateringType" type="checkbox" value="cold" class="mr-2"> Hideg étel</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cateringType" type="checkbox" value="hot" class="mr-2"> Meleg étel</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cateringType" type="checkbox" value="drinks" class="mr-2"> Kávé, tea, üdítő</label>
              </div>
            </div>
            <div v-if="formData.additionalRequirements.cateringNeeded" class="sm:w-3/4 w-full text-sm text-gray-500 mt-1">Egyetemi catering partnerekkel egyeztetünk.</div>
            <div v-if="isInternalEvent()" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Szerepeljen a rendezvény a heti eseményajánlóban? (közösségi média) <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.includeInEventRecommendation" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.includeInEventRecommendation" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="isInternalEvent()" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Szerepeljen a rendezvény a központi rendezvénynaptárban? (uni.sze.hu) <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.includeInCentralCalendar" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.includeInCentralCalendar" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 7" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">Építési és bontási munkálatok</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Építési/bontási munkálatok várhatóak? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.constructionNeeded" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.constructionNeeded" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.additionalRequirements.constructionNeeded" class="space-y-6">
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Terület igénybevételének dátuma <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.additionalRequirements.constructionDates.startDate" type="date" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Terület igénybevételének időpontja <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.additionalRequirements.constructionDates.startTime" type="time" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Terület visszaadásának dátuma <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.additionalRequirements.constructionDates.endDate" type="date" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Terület visszaadásának időpontja <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.additionalRequirements.constructionDates.endTime" type="time" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Alvállalkozók <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.additionalRequirements.subcontractors" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Magasban végzett tevékenység? <span class="text-red-600">*</span></div>
                <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.highAltitudeWork" type="radio" :value="true" class="mr-2"> Igen</label>
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.highAltitudeWork" type="radio" :value="false" class="mr-2"> Nem</label>
                </div>
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Állvány szükséges? <span class="text-red-600">*</span></div>
                <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.scaffoldingNeeded" type="radio" :value="true" class="mr-2"> Igen</label>
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.scaffoldingNeeded" type="radio" :value="false" class="mr-2"> Nem</label>
                </div>
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Kézi anyagmozgatás? <span class="text-red-600">*</span></div>
                <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.manualMaterialHandling" type="radio" :value="true" class="mr-2"> Igen</label>
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.manualMaterialHandling" type="radio" :value="false" class="mr-2"> Nem</label>
                </div>
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Gépi anyagmozgatás? <span class="text-red-600">*</span></div>
                <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.mechanicalMaterialHandling" type="radio" :value="true" class="mr-2"> Igen</label>
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.mechanicalMaterialHandling" type="radio" :value="false" class="mr-2"> Nem</label>
                </div>
              </div>
              <div v-if="formData.additionalRequirements.mechanicalMaterialHandling" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Gépi anyagmozgatás eszközei <span class="text-red-600">*</span></div>
                <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.mechanicalEquipment" type="checkbox" value="forklift" class="mr-2"> Targonca</label>
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.mechanicalEquipment" type="checkbox" value="crane" class="mr-2"> Daru</label>
                  <label class="flex items-center"><input v-model="formData.additionalRequirements.mechanicalEquipment" type="checkbox" value="other" class="mr-2"> Egyéb emelő eszköz</label>
                </div>
              </div>
              <div v-if="formData.additionalRequirements.mechanicalEquipment.includes('other')" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Egyéb eszköz <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.additionalRequirements.mechanicalOtherTool" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Takarítás a rendezvény előtt? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cleaningBefore" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cleaningBefore" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Takarítási ügyelet a rendezvény alatt? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cleaningDuring" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.cleaningDuring" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Villanyszerelői ügyelet szükséges? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.electricalNeeded" type="checkbox" value="before" class="mr-2"> Rendezvény előtt</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.electricalNeeded" type="checkbox" value="during" class="mr-2"> Rendezvény közben</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.electricalNeeded" type="checkbox" value="after" class="mr-2"> Rendezvény után</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.electricalNeeded" type="checkbox" value="none" class="mr-2"> Nem szükséges</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvényszekrényből áram vételezése? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.powerCabinet" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.powerCabinet" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Áramigény <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.additionalRequirements.powerDemand" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
          </div>
        </div>

        <div v-if="currentStep === 8" class="space-y-6">
          <div class="p-6">
            <div class="font-bold text-lg text-black">Biztonság és megfelelőség</div>
          </div>
          <div class="space-y-6">
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Tűzveszélyes tevékenység várható? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.safetyCompliance.fireHazard" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.safetyCompliance.fireHazard" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.safetyCompliance.fireHazard" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Tűzveszély leírása <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.safetyCompliance.fireHazardDescription" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div v-if="formData.safetyCompliance.fireHazard" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Várható tevékenységek <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.safetyCompliance.activities" type="checkbox" value="dust" class="mr-2"> Por</label>
                <label class="flex items-center"><input v-model="formData.safetyCompliance.activities" type="checkbox" value="smoke" class="mr-2"> Füst</label>
                <label class="flex items-center"><input v-model="formData.safetyCompliance.activities" type="checkbox" value="vapor" class="mr-2"> Páraképződés</label>
                <label class="flex items-center"><input v-model="formData.safetyCompliance.activities" type="checkbox" value="none" class="mr-2"> Egyik sem</label>
              </div>
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Vegyi anyag felhasználása? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.safetyCompliance.chemicalUsage" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.safetyCompliance.chemicalUsage" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.safetyCompliance.chemicalUsage" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Vegyi tevékenység leírása <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.safetyCompliance.chemicalDescription" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Dekoráció a légtérben? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.safetyCompliance.decorations" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.safetyCompliance.decorations" type="radio" :value="false" class="mr-2"> Nem</label>
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
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Teljes név <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.organizerDetails.name" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Telefonszám <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.organizerDetails.phone" type="tel" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">E-mail cím <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.organizerDetails.email" type="email" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Lakcím <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.organizerDetails.address" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div v-if="isInternalEvent()" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Munkaszám <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.organizerDetails.workNumber" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
            </div>
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">További szervező van? <span class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.organizerDetails.additionalOrganizer" type="radio" :value="true" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.organizerDetails.additionalOrganizer" type="radio" :value="false" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="formData.organizerDetails.additionalOrganizer" class="space-y-6">
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">További szervező neve <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.organizerDetails.additionalOrganizerDetails.name" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Neptun kód <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.organizerDetails.additionalOrganizerDetails.neptunCode" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Telefonszám <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.organizerDetails.additionalOrganizerDetails.phone" type="tel" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">E-mail cím <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.organizerDetails.additionalOrganizerDetails.email" type="email" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Lakcím <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.organizerDetails.additionalOrganizerDetails.address" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
            </div>
            <div v-if="isExternalEvent()" class="space-y-6">
              <div class="p-6">
                <div class="font-bold text-lg text-black">Megrendelő (jogi háttér esetén)</div>
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Név/cégnév <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.clientDetails.name" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Cím <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.clientDetails.address" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Adószám <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.clientDetails.taxNumber" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Telefonszám <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.clientDetails.phone" type="tel" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">E-mail cím <span class="text-red-600">*</span></div>
                <TextInput v-model="formData.clientDetails.email" type="email" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
            </div>
            <div class="space-y-6">
              <div class="p-6">
                <div class="font-bold text-lg text-black">Csatolmányok</div>
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvénybejelentő nyomtatvány <span class="text-red-600">*</span></div>
                <input type="file" @change="formData.fileUploads.eventNotificationForm = $event.target.files[0]" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Helyszín alaprajza</div>
                <input type="file" @change="formData.fileUploads.venueLayout = $event.target.files[0]" class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
            </div>
            <div class="space-y-6">
              <div class="p-6">
                <div class="font-bold text-lg text-black">Hozzájárulások</div>
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Adatkezelési hozzájárulás <span class="text-red-600">*</span></div>
                <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                  <label class="flex items-center"><input v-model="formData.agreements.dataProtection" type="checkbox" class="mr-2"> Hozzájárulok az adatkezeléshez</label>
                </div>
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvényszabályzat elfogadása <span class="text-red-600">*</span></div>
                <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                  <label class="flex items-center"><input v-model="formData.agreements.eventRegulations" type="checkbox" class="mr-2"> Elfogadom a rendezvényszabályzatot</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between mt-6">
          <PrimaryButton v-if="currentStep > 0" @click="prevStep" class="bg-gray-500 hover:bg-gray-600">Előző</PrimaryButton>
          <div v-else></div>
          <PrimaryButton v-if="currentStep < totalSteps - 1" @click="nextStep" class="bg-blue-500 hover:bg-blue-600">Következő</PrimaryButton>
          <PrimaryButton v-else @click="send" class="bg-green-500 hover:bg-green-600">Küldés</PrimaryButton>
        </div>
      </FormLayout>
    </div>
  </ApplicationLayout>
</template>