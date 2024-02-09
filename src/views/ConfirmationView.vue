<script setup lang="ts">
import BookingConfirmation from '../components/BookingConfirmation.vue'
import { defineProps } from 'vue';
const props = defineProps({
  bookingId: {
    type: String,
    required: true
  }
});
</script>

<template>
  <main>
    <BookingConfirmation :bookingId="props.bookingId" />
  </main>
</template>
