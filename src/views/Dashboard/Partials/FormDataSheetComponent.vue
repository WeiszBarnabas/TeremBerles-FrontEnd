<script setup>
import Dropdown from '@/components/Dropdown.vue';
import DropdownLink from '@/components/DropdownLink.vue';
import InfoButton from '@/components/InfoButton.vue';
import TextInput from '@/components/TextInput.vue';
import axios from 'axios';
import { ref } from 'vue';
import AddUserModal from './AddUserModal.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import ModifyReasonModal from './ModifyReasonModal.vue';
import UniOfferPiceker from './DataSheetParts/UniOfferPiceker.vue';

const props = defineProps(['form', 'token', "showModify",])
const emit = defineEmits(['update:selectedItems'])

const form = ref(props.form);
const showInput = ref(0)
const newCategory = ref('');
const reason = ref('');
const showUserModal = ref(false)
const showModifyReasonModal = ref(false)
const SzerzodesDialog = ref(false)
const selectedOrgani = ref(false)
const modifyDialog = ref(false)
const selectedCategories = ref([]);
const priceCategories = ref([]);
const documents = ref([]);
const SelectedDocument = ref();


let SavedForm = form.value

const closeModal = () => {
  showUserModal.value = false
  showModifyReasonModal.value = false

};

const openAddUser = () => {
  showUserModal.value = true
};

const openModifyReason = () => {
  showModifyReasonModal.value = true
};

const modify = (modifyNum) => {
  showInput.value = modifyNum;
  SavedForm = Object.assign({}, form.value)
  console.log(form.value)

}

const addCategory = () => {
  if (newCategory.value) {
    const newItem = {
      newcat: { ...newCategory.value },
      duration: 1,
      unit: '1',
      price: newCategory.value.egyetem,
      totalPrice: newCategory.value.egyetem * 1
    };
    selectedCategories.value.push(newItem);
    newCategory.value = '';
    emitSelectedItems();
  }
};


const cancelEdit = () => {
  form.value = Object.assign(form.value, SavedForm)
  showInput.value = 0;
}

const acceptEdit = async () => {
  showInput.value = 0;
  try {
    const priceData = selectedCategories.value.map(item => ({
      category: item.newcat.category,
      unit: item.unit,
      duration: item.duration,
      price: item.price * item.duration,
      price_per_unit: item.price,
      time_type: item.unit === '1' ? 'nappali' : 'esti'
    }));

    const formData = {
      ...form.value,
      price_data: priceData
    };

    let res = await axios.patch("http://127.0.0.1:8000/api/modify-form", formData, {
      headers: { 'Authorization': `Bearer ${props.token}` }
    });
    console.log('Edit successful:', res.data);
  } catch (error) {
    console.error('Error during edit:', error);
  }
}


const updatePrice = (item) => {
  item.price = item.unit === '1' ? item.newcat.egyetem : item.newcat.egyetem_hetvege;
  updateTotalPrice(item);
};

const updateTotalPrice = (item) => {
  item.totalPrice = (item.price || 0) * (item.duration || 0);
  emitSelectedItems();
};

const emitSelectedItems = () => {
  try {
    const itemsToEmit = selectedCategories.value.map(item => {
      const price = item.unit === '1'
        ? (item.newcat?.egyetem || item.price || 0)
        : (item.newcat?.egyetem_hetvege || item.price || 0);

      const duration = item.duration || 1;

      return {
        ...item,
        price: price,
        totalPrice: price * duration,
        category: item.newcat?.category || item.category
      };
    });

    emit('update:selectedItems', itemsToEmit);
  } catch (error) {
    console.error('Error in emitSelectedItems:', error);
  }
};

const getPricePerUnit = (item) => {
  try {
    if (item.unit === '1') {
      return item.newcat?.egyetem || item.price || 0;
    } else {
      return item.newcat?.egyetem_hetvege || item.price || 0;
    }
  } catch (error) {
    console.error('Error in getPricePerUnit:', error);
    return 0;
  }
};

const getPrices = async () => {
  let res = await axios.get(`http://127.0.0.1:8000/api/get-prices`, { headers: { 'Authorization': `Bearer ${props.token}` } })
  priceCategories.value = res.data.data

  if (props.form.famulus_offers != null) {
    priceCategories.value.map((x) => {
      newCategory.value = Object.assign({}, x)
      addCategory()
    })

    return

  }


  props.form.map((x) => {
    newCategory.value = Object.assign({}, x)
    addCategory()
  })

};

const removeCategory = (index) => {
  selectedCategories.value.splice(index, 1);
  emitSelectedItems();
};

if (props.showModify == 2) {
  getPrices()
}

const acceptOfferUni = async () => {
  let res = await axios.post("http://127.0.0.1:8000/api/university-accept", { "formId": form.value.id }, { headers: { 'Authorization': `Bearer ${props.token}` } })

  location.reload();

}

const showOffer = async () => {
  //let res = await axios.post("http://127.0.0.1:8000/api/show-uni-offer", { "form": form.value.id }, { headers: { 'Authorization': `Bearer ${props.token}` } })
  let res = await axios.post(
    "http://127.0.0.1:8000/api/show-uni-offer",
    { form: form.value.id },
    {
      headers: { Authorization: `Bearer ${props.token}` },
      responseType: 'blob'
    }
  );

  // Create a blob link to the PDF
  const fileURL = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
  window.open(fileURL, "_blank");


}

const reload = () => {
  location.reload()
}

const acceptEvent = async () => {

  let res = await axios.post("http://127.0.0.1:8000/api/accept-event", { "formId": form.value.id }, { headers: { 'Authorization': `Bearer ${props.token}` } })
  location.reload();
}

const organizations = [
  { 'id': 1, 'name': "Rendezvényszervező" },
  { 'id': 2, 'name': "Uni famulusz" }
]

const ModifyRequest = () => modifyDialog.value = true;
const hideDialog = () => modifyDialog.value = false;

const modReq = async () => {
  let res = await axios.post("http://127.0.0.1:8000/api/modify-request-event", { "formId": form.value.id, 'reason': reason.value, 'organizationId': selectedOrgani.value.id }, { headers: { 'Authorization': `Bearer ${props.token}` } })
  location.reload();
}

const openSzerzodesDialog = async () => {
  let res = await axios.get("http://127.0.0.1:8000/api/get-documents", { headers: { 'Authorization': `Bearer ${props.token}` } })

  documents.value = res.data.documents;



  SzerzodesDialog.value = true

}


const cancel = async (id) => {
  let res = await axios.post("http://127.0.0.1:8000/api/del-doc", { 'docId': id }, { headers: { 'Authorization': `Bearer ${props.token}` } })
  form.value.document = form.value.document.filter(x => x.id != res.data.id)
}

const add = async () => {
  let res = await axios.post("http://127.0.0.1:8000/api/add-doc-event", { "formId": form.value.id, 'docId': SelectedDocument.value }, { headers: { 'Authorization': `Bearer ${props.token}` } })
  form.value.document.push(res.data.document)

}


const addData = ref(false)
const moddocs = ref()
const saveform = ref({})

const openAddData = (docs) => {
  addData.value = true
  moddocs.value = docs
  saveform.value = Object.assign(saveform.value, form.value)
  neededForForm.value = form.value
}

const sendToLaw = async () => {
  let res = await axios.post("http://127.0.0.1:8000/api/send-to-law", { "formId": form.value.id }, { headers: { 'Authorization': `Bearer ${props.token}` } })
  location.reload();


}

const AcceptByLaw = async () => {
  let res = await axios.post("http://127.0.0.1:8000/api/accept-by-law", { "formId": form.value.id }, { headers: { 'Authorization': `Bearer ${props.token}` } })
  location.reload();


}


const neededForForm = ref({})

const setDoc = async () => {

  let res = await axios.post("http://127.0.0.1:8000/api/update-docs", { "docsId": moddocs.value.id, 'data': form.value }, { headers: { 'Authorization': `Bearer ${props.token}` } })
  
  neededForForm.value = res.data;
  
  addData.value = false
}

const cancelEditDocs = async () => {
  form.value = Object.assign(form.value, saveform.value)
  addData.value = false
}
const alairva = async () => {
  let res = await axios.post("http://127.0.0.1:8000/api/accept-by-client", { "formId": form.value.id }, { headers: { 'Authorization': `Bearer ${props.token}` } })
  location.reload();
}

const alairvaUni = async () => {
  let res = await axios.post("http://127.0.0.1:8000/api/accept-by-univerzity", { "formId": form.value.id }, { headers: { 'Authorization': `Bearer ${props.token}` } })
  location.reload();
}


const szerzodesAlairva = async () => {
  let res = await axios.post("http://127.0.0.1:8000/api/alairvaMinden", { "formId": form.value.id }, { headers: { 'Authorization': `Bearer ${props.token}` } })
  location.reload();
}



</script>


<template>
  <div class="event-details p-8 bg-gray-50 rounded-lg shadow-md">
    <div class="flex justify-between">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ form.event_name }}</h1>
      <div>
        <div class="flex">
          <Dropdown align="right" width="48">
            <template #trigger>
              <span class="inline-flex rounded-md">
                <button type="button"
                  class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md bg-extra focus:outline-none transition ease-in-out duration-150 cursor-pointer">
                  ...
                </button>
              </span>
            </template>

            <template #content>
              <DropdownLink @click="openAddUser">Felhasználó hozzáadása </DropdownLink>
              <a :href="'http://127.0.0.1:8000/api/generate-pdf/' + form.id">
                <DropdownLink>PDF letölés</DropdownLink>
              </a>

            </template>
          </Dropdown>
        </div>
      </div>
    </div>





    <div v-if="form.status == 'UF Árajánlat elfogadásra vár'">

      <div class="overflow-x-auto my-8">
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Famulus árajánlat</h3>
        <table class="min-w-full bg-white rounded-lg shadow">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left text-gray-700 font-medium">Név</th>
              <th class="px-4 py-2  text-gray-700 font-medium">Időtartam (óra)</th>
              <th class="px-4 py-2  text-gray-700 font-medium">Egységár (Ft)</th>
              <th class="px-4 py-2  text-gray-700 font-medium">Összesen (Ft)</th>
              <th class="px-4 py-2  text-gray-700 font-medium">Éjszaka</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="offer in form.famulus_offers" :key="offer.id" class="border-b hover:bg-gray-50">
              <td class="px-4 py-2">{{ offer.offer_name }}</td>
              <td class="px-4 py-2">{{ offer.duration }}</td>
              <td class="px-4 py-2">{{ offer.price_per_unit.toLocaleString() }}</td>
              <td class="px-4 py-2">{{ offer.total_price.toLocaleString() }}</td>
              <td class="px-4 py-2">
                <span v-if="offer.night" class="text-green-400 font-bold">Igen</span>
                <span v-else class="text-gray-500">Nem</span>
              </td>
            </tr>
            <tr class="bg-gray-300">
              <td class="px-4 py-2">Összesen</td>
              <td class="px-4 py-2"></td>
              <td class="px-4 py-2"></td>
              <td class="px-4 py-2 font-semibold" colspan="2">{{ form.famulus_offer.toLocaleString() }} Forint</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-full flex justify-end gap-3">

        <Button label="Módosítás kérése" @click="openModifyReason" />
        <Button label="Elfogadás" @click="acceptOfferUni" />

      </div>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.event_place }}
            <InfoButton class=" bg-amber py-1" @click="modify(1)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.event_address }}
            <InfoButton class=" py-1" @click="modify(2)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.event_type }}
            <InfoButton class=" py-1" @click="modify(3)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.event_classification }}
            <InfoButton class=" py-1" @click="modify(4)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.start_date.split("T")[0].replace(/-/g, ".") }}
            {{ form.start_time.substring(0, form.end_time.length - 3) }}
            <InfoButton class=" py-1" @click="modify(6)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.end_date.split("T")[0].replace(/-/g, ".") }}
            {{ form.end_time.substring(0, form.end_time.length - 3) }}
            <InfoButton class=" py-1" @click="modify(7)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
            </InfoButton>
          </div>
        </div>
      </li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Részletek</h2>
    <ul class="space-y-2 mb-6">
      <li class="w-full">
        <div class="flex gap-3 items-center">
          <strong class="text-gray-700 w-1/3">Résztvevők:</strong>
          <div v-if="showInput == 8" class="flex gap-5">
            <TextInput v-model="form.participants"
              class="bg-gray-100 border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 block min-w-xs mt-2 sm:mt-0" />
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.participants }}
            <InfoButton class=" py-1" @click="modify(8)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.press_public }}
            <InfoButton class=" py-1" @click="modify(9)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.nature }}
            <InfoButton class=" py-1" @click="modify(10)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.program_plan }}
            <InfoButton class=" py-1" @click="modify(11)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.venue_setup }}
            <InfoButton class=" py-1" @click="modify(12)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.accommodation_needed }}
            <InfoButton class=" py-1" @click="modify(13)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.accommodation_count }}
            <InfoButton class=" py-1" @click="modify(14)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.parking_needed }}
            <InfoButton class=" py-1" @click="modify(15)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.parking_details }}
            <InfoButton class=" py-1" @click="modify(16)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.waste_generated }}
            <InfoButton class=" py-1" @click="modify(17)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.waste_disposal }}
            <InfoButton class=" py-1" @click="modify(18)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.waste_handler }}
            <InfoButton class=" py-1" @click="modify(19)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.internet_needed }}
            <InfoButton class=" py-1" @click="modify(20)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.tech_supportNeeded }}
            <InfoButton class=" py-1" @click="modify(21)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.tech_equipment }}
            <InfoButton class=" py-1" @click="modify(22)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.limited_mobility }}
            <InfoButton class=" py-1" @click="modify(23)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.photo_videoRecording }}
            <InfoButton class=" py-1" @click="modify(24)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.recording_tools }}
            <InfoButton class=" py-1" @click="modify(25)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.catering_needed }}
            <InfoButton class=" py-1" @click="modify(26)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.catering_type }}
            <InfoButton class=" py-1" @click="modify(27)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.constructionNeeded }}
            <InfoButton class=" py-1" @click="modify(28)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.constructionDates }}
            <InfoButton class=" py-1" @click="modify(29)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.subcontractors }}
            <InfoButton class=" py-1" @click="modify(30)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.fire_hazard }}
            <InfoButton class=" py-1" @click="modify(31)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.activities }}
            <InfoButton class=" py-1" @click="modify(32)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.chemical_usage }}
            <InfoButton class=" py-1" @click="modify(33)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.chemical_description }}
            <InfoButton class=" py-1" @click="modify(34)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.organizer_name }}
            <InfoButton class=" py-1" @click="modify(35)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.organizer_phone }}
            <InfoButton class=" py-1" @click="modify(36)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.organizer_email }}
            <InfoButton class=" py-1" @click="modify(37)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
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
            <InfoButton class="px-3 text-sm" @click="cancelEdit"><i class="pi pi-times"></i></InfoButton>
            <InfoButton class="px-3 text-sm" @click="acceptEdit"><i class="pi pi-check"></i>
            </InfoButton>
          </div>
          <div v-else>
            {{ form.organizer_address }}
            <InfoButton class=" py-1" @click="modify(38)" v-if="showModify != 2 && form.status == 'Beérkezett'">
              <span class="pi pi-pen-to-square"></span>
            </InfoButton>
          </div>
        </div>
      </li>
    </ul>


    <div v-if="showModify == 2" class="border-t">
      <h2 class="text-2xl text-gray-700 mt-20 mb-10">Szolgáltatások</h2>

      <div v-if="form.comment != null" class=" bg-gray-300 p-10 rounded-2xl mb-5">
        <span>Modosítás kérésének oka: </span>
        {{ " " + form.comment }}

      </div>



      <ul class="grid gap-4 mb-6">
        <li v-for="(item, idx) in selectedCategories"
          class="bg-white rounded-lg shadow flex flex-col md:flex-row items-center p-4 gap-4">
          <div class="flex-1 flex flex-col md:flex-row md:items-center gap-4 w-full">
            <div class="font-semibold text-gray-700 md:w-1/4 w-full">{{ item.newcat.category }}</div>
            <div class="flex flex-col justify-between md:flex-row md:items-center gap-2 flex-1">
              <select v-model="item.unit" @change="updatePrice(item)"
                class="border border-gray-300 rounded px-3 py-2 w-1/3">
                <option value="1">Nappal</option>
                <option value="2">Éjszaka</option>
              </select>
              <span class="text-gray-500 text-sm whitespace-nowrap">
                {{ getPricePerUnit(item) }} Ft/fő/{{ item.unit === '1' ? 'nappal' : 'éjszaka' }}
              </span>
              <input type="number" min="1" v-model.number="item.duration" @input="updateTotalPrice(item)"
                class="border border-gray-300 rounded px-3 py-2 w-1/3" placeholder="Időtartam" />
              <span class="text-gray-500 text-sm whitespace-nowrap">
                {{ (item.price * (item.duration || 0)).toLocaleString() }} Ft
              </span>
            </div>
          </div>
          <button class="text-red-500 hover:bg-red-100 rounded-full p-2 ml-auto" @click="removeCategory(idx)"
            title="Törlés">
            <i class="pi pi-trash"></i>
          </button>
        </li>
        <li>
          <div class="">

            <select v-model="newCategory" @change="addCategory" class="bg-white p-2">
              <option value="" hidden>Szolgáltatások</option>
              <option v-for="item in priceCategories" :value="item">{{ item.category }}</option>
            </select>
          </div>
        </li>

      </ul>
    </div>


    <div class="w-full flex justify-between gap-3" v-if="form.status == 'Partneri aláírásra vár'">
      <slot name="buttons" />
      <Button label="Aláírva" @click="alairva" />
    </div>

    <div class="w-full flex justify-between gap-3" v-if="form.status == 'Egyetemi aláírásra vár'">
      <slot name="buttons" />
      <Button label="Aláírva" @click="alairvaUni" />
    </div>

    <div class="w-full flex justify-between gap-3" v-if="form.status == 'Szerződés aláírva'">
      <slot name="buttons" />
      <Button label="Aláírva" @click="szerzodesAlairva" />
    </div>

    <UniOfferPiceker v-if="form.status == 'Árajánlat készítésre vár'" :token="props.token" :formId="form.id"
      @close="reload">
      <slot name="buttons" />
    </UniOfferPiceker>

    <div class="w-full flex justify-between gap-3" v-if="form.status == 'Árajánlat elfogadásra vár'">
      <slot name="buttons" />

      <div class="flex gap-3">
        <Button label="Módosítás kérése" @click="ModifyRequest" />

        <Button label="Árajánlat megtekintése" @click="showOffer" />

        <Button label="Elfogadás" @click="acceptEvent" />
      </div>
    </div>
    <div class="w-full flex justify-between gap-3" v-if="form.status == 'Szerződéses adatokra vár'">
      <slot name="buttons" />

      <div class="flex gap-3">
        <Button label="Szerződések" icon="" @click="openSzerzodesDialog" />
        <!-- <Button label="Átnézésre küld" icon="" @click="sendToLaw" /> -->
      </div>
    </div>
    <div class="w-full flex justify-between gap-3" v-if="form.status == 'Szerződés áttnézésre vár'">
      <slot name="buttons" />

      <div class="flex gap-3">
        <Button label="Szerződések" icon="" @click="openSzerzodesDialog" />
        <Button label="Elfogad" icon="" @click="AcceptByLaw" v-if="showModify == 3" />
      </div>


    </div>



    <slot name="buttons"
      v-if="form.status == 'Megvalósulásra vár' || form.status == 'Beérkezett' || form.status == 'UF Árajánlatra vár' || form.status == 'UF Árajánlat elfogadásra vár'" />


  </div>

  <Dialog v-model:visible="SzerzodesDialog" :style="{ width: '90rem', }" header="Szerződések" :modal="true">

    <div class="flex gap-3 mb-3" v-if="form.status == 'Szerződéses adatokra vár'">

      <Select v-model="SelectedDocument" :options="documents" optionLabel="name" optionValue="id"
        placeholder="Kérem válasszon" class="w-full" emptyFilterMessage="Nincs megjeleníthető adat"
        emptyMessage="Nincs megjeleníthető adat" />

      <Button label="Hozzáad" icon="pi pi-check" @click="add" />
    </div>

    <DataTable ref="dt" :value="form.document" dataKey="id" :rows="5" class="min-h-[20rem]">

      <Column field="document_type.name" header="Szerződés" sortable style="max-width: 50%"></Column>
      <Column field="" header="Adatok" sortable style="max-width: 20%" v-if="form.status == 'Szerződéses adatokra vár'">
        <template #body="slotProps">
          <Button label="" icon="pi pi-plus" @click="openAddData(slotProps.data)" />
        </template>
      </Column>
      <!-- <Column field="filled" header="Generálható" sortable style="max-width: 20%"
        v-if="form.status == 'Szerződéses adatokra vár'">
        <template #body="slotProps">
          <i v-if="slotProps.data.filled" class="pi pi-check text-green-500 font-extrabold"></i>
          <i v-else class="pi pi-times text-red-500 font-extrabold "></i>
        </template>
      </Column> -->
      <Column header="Mégsem" style="width: 5%" v-if="form.status == 'Szerződéses adatokra vár'">
        <template #body="slotProps">
          <Button severity="danger" icon="pi pi-trash" @click="cancel(slotProps.data.id)" class="" />
        </template>
      </Column>
      <Column header="Letöltés" style="width: 5%">
        <template #body="slotProps">
          
          <Button as="a" label="" icon="pi pi-download" :href="'http://127.0.0.1:8000/api/generate-docx/' + form.id + '/' + slotProps.data.document_types_id" />
        </template>
      </Column>
      <Column header="Feltöltés" style="width: 5%" v-if="form.status == 'Szerződés áttnézésre vár' && showModify == 3">
        <template #body="slotProps">
          <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="*" :maxFileSize="1000000" @upload="onUpload"
            :auto="true" chooseLabel="Tallózás" chooseIcon="pi pi-folder-open" />
          <!-- <Button as="a" label="" icon="pi pi-upload" :href="'http://127.0.0.1:8000/api/generate-docx/' + form.id" /> -->
        </template>
      </Column>

    </DataTable>

    <template #footer v-if="form.status == 'Szerződéses adatokra vár'">
      <Button label="Mégsem" icon="pi pi-times" text @click="SzerzodesDialog = false" />
      <Button label="Elfogadás" icon="pi pi-check" @click="sendToLaw" />
    </template>

    <template #footer v-if="form.status == 'Szerződés áttnézésre vár'">
      <Button label="Bezár" icon="pi pi-times" text @click="SzerzodesDialog = false" />
    </template>

    <template #empty> Nincs szerződés hozzá rendelve a rendezvényhez. </template>
  </Dialog>


  <Dialog v-model:visible="modifyDialog" :style="{ width: '70rem' }" header="Módosítás kérése" :modal="true">

    <div>
      <Select v-model="selectedOrgani" :options="organizations" optionLabel="name" optionValue="id"
        placeholder="Kérem válasszon" class="w-full" emptyFilterMessage="Nincs megjeleníthető adat"
        emptyMessage="Nincs megjeleníthető adat" />

      <label for="name" class="block font-bold mb-3">Indoklás</label>
      <textarea rows="10" class="w-full p-1 border border-gray-400" v-model="reason"></textarea>
    </div>


    <template #footer>
      <Button label="Mégsem" icon="pi pi-times" text @click="hideDialog" />
      <Button label="Mentés" icon="pi pi-check" @click="modReq" />
    </template>
  </Dialog>

  <Dialog v-model:visible="addData" :style="{ width: '70rem' }" header="Dokumentum adatok" :modal="true">

    <div>
      <div class="my-1">
        <div>Törzskönyvi nyilvántartási szám</div>
        <InputText id="name" v-model.trim="neededForForm.torzskonyvi_nyil_szam" required="true" fluid />
      </div>
      <div class="my-1">
        <div>1. valami szám</div>
        <InputText id="name" v-model.trim="neededForForm.targyegy" required="true" fluid />
      </div>
      <div class="my-1">
        <div>1. valami száma 2</div>
        <InputText id="name" v-model.trim="neededForForm.targyketto" required="true" fluid />
      </div>
      <div class="my-1">
        <div>Meghatározás</div>
        <InputText id="name" v-model.trim="neededForForm.meghatarozas" required="true" fluid />
      </div>

    </div>

    <template #footer>
      <Button label="Mégsem" icon="pi pi-times" text @click="cancelEditDocs" />
      <Button label="Mentés" icon="pi pi-check" @click="setDoc" />
    </template>
  </Dialog>


  <ModifyReasonModal :token="token" :form="form.id" :showModal="showModifyReasonModal" @save="reload"
    @close="closeModal" />
  <AddUserModal :showUserModal="showUserModal" @close="closeModal" />

</template>