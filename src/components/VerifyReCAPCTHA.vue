<script setup>
import { ref } from "vue";
import PrimaryButton from '@/components/PrimaryButton.vue';
import axios from "axios";

const recaptchaToken = ref("");

const verifyRecaptcha = async () => {
  try {
    recaptchaToken.value = await new Promise((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha.execute("6LfZm-MqAAAAAFC8LhmritWz5OJeR3IecxBf8rmb", { action: "submit" }).then(resolve).catch(reject);
      });
    });

    const response = await axios.post("http://127.0.0.1:8000/api/verify-recaptcha", {
      token: recaptchaToken.value,
    });

    console.log("reCAPTCHA válasz:", response.data);
  } catch (error) {
    console.error("Hiba a reCAPTCHA ellenőrzése során:", error);
  }
};
</script>

<template>
  <PrimaryButton @click="verifyRecaptcha">reCAPTCHA ellenőrzés</PrimaryButton>
</template>