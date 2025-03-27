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
    venueSetup: "",
    venueSetupService: ""
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
    techEquipment: "",
    securityServiceNeeded: ""
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
    powerDemand: "",
    includeInEventRecommendation: "",
    includeInCentralCalendar: ""
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

const isInternalEvent = () => {
  return ["university", "universityStudent", "universitySports"].includes(formData.value.eventType);
};

const isExternalEvent = () => {
  return ["externalSports", "external"].includes(formData.value.eventType);
};

const validateStep = (step) => {
  let errors = [];

  if (step === 1) {
    if (!formData.value.eventDetails.name) errors.push("Rendezvény neve kötelező.");
    if (!formData.value.eventDetails.description) errors.push("Rendezvény leírása kötelező.");
    if (!formData.value.eventDetails.place) errors.push("Rendezvény helyszíne kötelező.");
    if (!formData.value.eventDetails.address) errors.push("Rendezvény pontos címe kötelező.");
    if (!formData.value.eventType) errors.push("Rendezvény típusa kötelező.");
    if (!formData.value.eventClassification) errors.push("Rendezvény minősítése kötelező.");
    if (!formData.value.timing.startDate) errors.push("Rendezvény kezdő dátuma kötelező.");
    if (!formData.value.timing.startTime) errors.push("Rendezvény kezdő időpontja kötelező.");
    if (!formData.value.timing.endDate) errors.push("Rendezvény záró dátuma kötelező.");
    if (!formData.value.timing.endTime) errors.push("Rendezvény záró időpontja kötelező.");
  }

  if (step === 2) {
    if (!formData.value.specifics.participants) errors.push("Résztvevők várható létszáma kötelező.");
    if (!formData.value.specifics.pressPublic) errors.push("Sajtónyilvános rendezvény kérdés megválaszolása kötelező.");
    if (!formData.value.specifics.nature) errors.push("Rendezvény jellege kötelező.");
    if (!formData.value.specifics.programPlan) errors.push("Részletes programterv kötelező.");
    if (!formData.value.specifics.venueSetup) errors.push("Helyszín berendezési módja kötelező.");
    if (!formData.value.specifics.venueSetupService) errors.push("Helyszín berendezési módja (kiválasztás) kötelező.");
  }

  if (step === 3) {
    if (!formData.value.logistics.accommodationNeeded) errors.push("Szállásigény kérdés megválaszolása kötelező.");
    if (formData.value.logistics.accommodationNeeded === "yes" && !formData.value.logistics.accommodationCount) {
      errors.push("Szállásigény létszáma kötelező.");
    }
    if (!formData.value.logistics.parkingNeeded) errors.push("Parkolóhely igény kérdés megválaszolása kötelező.");
    if (formData.value.logistics.parkingNeeded === "yes" && !formData.value.logistics.parkingDetails) {
      errors.push("Gépkocsiforgalom és parkolóhely igény leírása kötelező.");
    }
    if (!formData.value.logistics.securityServiceNeeded) errors.push("Portaszolgálat igénylése kérdés megválaszolása kötelező.");
  }

  if (step === 4) {
    if (!formData.value.logistics.wasteGenerated) errors.push("Keletkezik hulladék kérdés megválaszolása kötelező.");
    if (formData.value.logistics.wasteGenerated === "yes") {
      if (!formData.value.logistics.wasteDisposal) errors.push("Hulladék elszállításának módja kötelező.");
      if (!formData.value.logistics.wasteHandler) errors.push("Hulladék elszállítójának megadása kötelező.");
    }
  }

  if (step === 5) {
    if (!formData.value.logistics.internetNeeded) errors.push("Internetkapcsolat szükségességének megválaszolása kötelező.");
    if (!formData.value.logistics.techSupportNeeded) errors.push("Oktatástechnikai támogatás szükségességének megválaszolása kötelező.");
    if (!formData.value.logistics.techEquipment) errors.push("Oktatástechnikai eszközigény megadása kötelező.");
  }

  if (step === 6) {
    if (!formData.value.additionalRequirements.limitedMobility) errors.push("Korlátozott mozgású résztvevők kérdés megválaszolása kötelező.");
    if (!formData.value.additionalRequirements.photoVideoRecording) errors.push("Fotó/videófelvétel kérdés megválaszolása kötelező.");
    if (formData.value.additionalRequirements.photoVideoRecording === "yes" && !formData.value.additionalRequirements.recordingTools) {
      errors.push("Felvétel eszközeinek megadása kötelező.");
    }
    if (!formData.value.additionalRequirements.cateringNeeded) errors.push("Catering szükségességének megválaszolása kötelező.");
    if (formData.value.additionalRequirements.cateringNeeded === "yes" && formData.value.additionalRequirements.cateringType.length === 0) {
      errors.push("Catering típusának kiválasztása kötelező.");
    }
    if (isInternalEvent()) {
      if (!formData.value.additionalRequirements.includeInEventRecommendation) errors.push("Heti eseményajánlóban való szereplés kérdés megválaszolása kötelező.");
      if (!formData.value.additionalRequirements.includeInCentralCalendar) errors.push("Központi rendezvénynaptárban való szereplés kérdés megválaszolása kötelező.");
    }
  }

  if (step === 7) {
    if (!formData.value.additionalRequirements.constructionNeeded) errors.push("Építési/bontási munkálatok kérdés megválaszolása kötelező.");
    if (formData.value.additionalRequirements.constructionNeeded === "yes") {
      if (!formData.value.additionalRequirements.constructionDates.startDate) errors.push("Terület igénybevételének dátuma kötelező.");
      if (!formData.value.additionalRequirements.constructionDates.startTime) errors.push("Terület igénybevételének időpontja kötelező.");
      if (!formData.value.additionalRequirements.constructionDates.endDate) errors.push("Terület visszaadásának dátuma kötelező.");
      if (!formData.value.additionalRequirements.constructionDates.endTime) errors.push("Terület visszaadásának időpontja kötelező.");
      if (!formData.value.additionalRequirements.subcontractors) errors.push("Alvállalkozók megadása kötelező.");
      if (!formData.value.additionalRequirements.highAltitudeWork) errors.push("Magasban végzett tevékenység kérdés megválaszolása kötelező.");
      if (!formData.value.additionalRequirements.scaffoldingNeeded) errors.push("Állvány szükségességének megválaszolása kötelező.");
      if (!formData.value.additionalRequirements.manualMaterialHandling) errors.push("Kézi anyagmozgatás kérdés megválaszolása kötelező.");
      if (!formData.value.additionalRequirements.mechanicalMaterialHandling) errors.push("Gépi anyagmozgatás kérdés megválaszolása kötelező.");
      if (formData.value.additionalRequirements.mechanicalMaterialHandling === "yes" && formData.value.additionalRequirements.mechanicalEquipment.length === 0) {
        errors.push("Gépi anyagmozgatás eszközeinek kiválasztása kötelező.");
      }
      if (formData.value.additionalRequirements.mechanicalEquipment.includes("other") && !formData.value.additionalRequirements.mechanicalOtherTool) {
        errors.push("Egyéb eszköz megadása kötelező.");
      }
    }
    if (!formData.value.additionalRequirements.cleaningBefore) errors.push("Takarítás a rendezvény előtt kérdés megválaszolása kötelező.");
    if (!formData.value.additionalRequirements.cleaningDuring) errors.push("Takarítási ügyelet a rendezvény alatt kérdés megválaszolása kötelező.");
    if (!formData.value.additionalRequirements.electricalNeeded.length) errors.push("Villanyszerelői ügyelet szükségességének megválaszolása kötelező.");
    if (!formData.value.additionalRequirements.powerCabinet) errors.push("Rendezvényszekrényből áram vételezése kérdés megválaszolása kötelező.");
    if (!formData.value.additionalRequirements.powerDemand) errors.push("Áramigény megadása kötelező.");
  }

  if (step === 8) {
    if (!formData.value.safetyCompliance.fireHazard) errors.push("Tűzveszélyes tevékenység kérdés megválaszolása kötelező.");
    if (formData.value.safetyCompliance.fireHazard === "yes") {
      if (!formData.value.safetyCompliance.fireHazardDescription) errors.push("Tűzveszély leírása kötelező.");
      if (!formData.value.safetyCompliance.activities.length) errors.push("Várható tevékenységek kiválasztása kötelező.");
    }
    if (!formData.value.safetyCompliance.chemicalUsage) errors.push("Vegyi anyag felhasználása kérdés megválaszolása kötelező.");
    if (formData.value.safetyCompliance.chemicalUsage === "yes" && !formData.value.safetyCompliance.chemicalDescription) {
      errors.push("Vegyi tevékenység leírása kötelező.");
    }
    if (!formData.value.safetyCompliance.decorations) errors.push("Dekoráció a légtérben kérdés megválaszolása kötelező.");
  }

  if (step === 9) {
    if (!formData.value.organizerDetails.name) errors.push("Teljes név kötelező.");
    if (!formData.value.organizerDetails.phone) errors.push("Telefonszám kötelező.");
    if (!formData.value.organizerDetails.email) errors.push("E-mail cím kötelező.");
    if (!formData.value.organizerDetails.address) errors.push("Lakcím kötelező.");
    if (isInternalEvent() && !formData.value.organizerDetails.workNumber) errors.push("Munkaszám kötelező belső rendezvény esetén.");
    if (!formData.value.organizerDetails.additionalOrganizer) errors.push("További szervező kérdés megválaszolása kötelező.");
    if (formData.value.organizerDetails.additionalOrganizer === "yes") {
      if (!formData.value.organizerDetails.additionalOrganizerDetails.name) errors.push("További szervező neve kötelező.");
      if (!formData.value.organizerDetails.additionalOrganizerDetails.neptunCode) errors.push("Neptun kód kötelező.");
      if (!formData.value.organizerDetails.additionalOrganizerDetails.phone) errors.push("További szervező telefonszáma kötelező.");
      if (!formData.value.organizerDetails.additionalOrganizerDetails.email) errors.push("További szervező e-mail címe kötelező.");
      if (!formData.value.organizerDetails.additionalOrganizerDetails.address) errors.push("További szervező lakcíme kötelező.");
    }
    if (isExternalEvent()) {
      if (!formData.value.clientDetails.name) errors.push("Megrendelő neve/cégneve kötelező külső rendezvény esetén.");
      if (!formData.value.clientDetails.address) errors.push("Megrendelő címe kötelező külső rendezvény esetén.");
      if (!formData.value.clientDetails.taxNumber) errors.push("Adószám kötelező külső rendezvény esetén.");
      if (!formData.value.clientDetails.phone) errors.push("Megrendelő telefonszáma kötelező külső rendezvény esetén.");
      if (!formData.value.clientDetails.email) errors.push("Megrendelő e-mail címe kötelező külső rendezvény esetén.");
    }
    if (!formData.value.fileUploads.eventNotificationForm) errors.push("Rendezvénybejelentő nyomtatvány feltöltése kötelező.");
    if (!formData.value.agreements.dataProtection) errors.push("Adatkezelési hozzájárulás elfogadása kötelező.");
    if (!formData.value.agreements.eventRegulations) errors.push("Rendezvényszabályzat elfogadása kötelező.");
  }

  return errors;
};

const validateAllSteps = () => {
  let allErrors = [];
  for (let step = 1; step <= 9; step++) {
    const stepErrors = validateStep(step);
    allErrors = allErrors.concat(stepErrors);
  }
  return allErrors;
};

const nextStep = () => {
  errorMessage.value = "";
  const errors = validateStep(currentStep.value);
  if (errors.length > 0) {
    errorMessage.value = errors.join(" ");
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
  if (errors.length > 3) {
    errorMessage.value = "Kérem, töltse ki a hiányzó mezőket!";
    return;
  }
  else{
    errorMessage.value = errors.join(" ");
    return;
  }
  const recaptchaValue = await verifyRecaptcha();
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
        <div v-for="(step, index) in totalSteps" :key="index" @click="goToStep(index)"
          class="flex items-center cursor-pointer">
          <div :class="{ 'bg-blue-500': currentStep === index, 'bg-gray-300': currentStep !== index }"
            class="w-8 h-8 rounded-full flex items-center justify-center text-white">
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
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Helyszín berendezési módja (kiválasztás) <span
                  class="text-red-600">*</span></div>
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
            <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Portaszolgálat igénylése a rendezvény idejére <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.logistics.securityServiceNeeded" type="radio" value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.logistics.securityServiceNeeded" type="radio" value="no" class="mr-2"> Nem</label>
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
            <div v-if="isInternalEvent()" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Szerepeljen a rendezvény a heti eseményajánlóban? (közösségi média) <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.includeInEventRecommendation" type="radio" value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.includeInEventRecommendation" type="radio" value="no" class="mr-2"> Nem</label>
              </div>
            </div>
            <div v-if="isInternalEvent()" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Szerepeljen a rendezvény a központi rendezvénynaptárban? (uni.sze.hu) <span
                  class="text-red-600">*</span></div>
              <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                <label class="flex items-center"><input v-model="formData.additionalRequirements.includeInCentralCalendar" type="radio" value="yes" class="mr-2"> Igen</label>
                <label class="flex items-center"><input v-model="formData.additionalRequirements.includeInCentralCalendar" type="radio" value="no" class="mr-2"> Nem</label>
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
            <div v-if="isInternalEvent()" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="sm:w-1/3 w-full font-medium text-black text-base">Munkaszám <span class="text-red-600">*</span></div>
              <TextInput v-model="formData.organizerDetails.workNumber"
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
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Lakcím <span
                    class="text-red-600">*</span></div>
                <TextInput v-model="formData.organizerDetails.additionalOrganizerDetails.address"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
            </div>
            <div v-if="isExternalEvent()" class="space-y-6">
              <div class="p-6">
                <div class="font-bold text-lg text-black">Megrendelő (jogi háttér esetén)</div>
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Név/cégnév <span
                    class="text-red-600">*</span></div>
                <TextInput v-model="formData.clientDetails.name"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Cím <span
                    class="text-red-600">*</span></div>
                <TextInput v-model="formData.clientDetails.address"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Adószám <span
                    class="text-red-600">*</span></div>
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
            </div>
            <div class="space-y-6">
              <div class="p-6">
                <div class="font-bold text-lg text-black">Csatolmányok</div>
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvénybejelentő nyomtatvány <span
                    class="text-red-600">*</span></div>
                <input type="file" @change="formData.fileUploads.eventNotificationForm = $event.target.files[0]"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Helyszín alaprajza</div>
                <input type="file" @change="formData.fileUploads.venueLayout = $event.target.files[0]"
                  class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black block sm:w-3/4 w-full mt-2 sm:mt-0" />
              </div>
            </div>
            <div class="space-y-6">
              <div class="p-6">
                <div class="font-bold text-lg text-black">Hozzájárulások</div>
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Adatkezelési hozzájárulás <span
                    class="text-red-600">*</span></div>
                <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                  <label class="flex items-center">
                    <input v-model="formData.agreements.dataProtection" type="checkbox" class="mr-2">
                    Hozzájárulok az adatkezeléshez
                  </label>
                </div>
              </div>
              <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div class="sm:w-1/3 w-full font-medium text-black text-base">Rendezvényszabályzat elfogadása <span
                    class="text-red-600">*</span></div>
                <div class="block sm:w-3/4 w-full mt-2 sm:mt-0 space-y-0">
                  <label class="flex items-center">
                    <input v-model="formData.agreements.eventRegulations" type="checkbox" class="mr-2">
                    Elfogadom a rendezvényszabályzatot
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between mt-6">
          <PrimaryButton v-if="currentStep > 0" @click="prevStep" class="bg-gray-500 hover:bg-gray-600">
            Előző
          </PrimaryButton>
          <div v-else></div>
          <PrimaryButton v-if="currentStep < totalSteps - 1" @click="nextStep" class="bg-blue-500 hover:bg-blue-600">
            Következő
          </PrimaryButton>
          <PrimaryButton v-else @click="send" class="bg-green-500 hover:bg-green-600">
            Küldés
          </PrimaryButton>
        </div>
      </FormLayout>
    </div>
  </ApplicationLayout>
</template>