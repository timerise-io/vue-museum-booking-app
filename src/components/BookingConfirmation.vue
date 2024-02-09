<template>
  <div v-if="!loading && !error" style="text-align: center;">
    <h2>Booking status: {{ booking.status }}</h2>
    <p style="margin-bottom: 8px;">Booking ID: {{ booking.shortId }}</p>
    <div>
      <img :src="booking.qrUrl" alt="QR Code" width="200" />
    </div>
    <a :href="booking.shortUrl" target="_blank">View booking page</a>
  </div>
  <p v-if="loading">Loading booking...</p>
  <p v-if="error">Error loading booking.</p>
</template>

<script lang="ts">
import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '../lib/apolloClient';
import { defineComponent, ref, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { BOOKING_QUERY } from '@/graphql/queries'

export default defineComponent({
  props: {
    bookingId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    provideApolloClient(apolloClient);

    const { result, loading, error } = useQuery(BOOKING_QUERY, () => ({
      bookingId: props.bookingId,
    }));

    const booking = ref<any>({});

    watchEffect(() => {
      if (result.value && result.value.booking) {
        booking.value = result.value.booking;
      }
    });

    return { booking, loading, error };
  },
});
</script>
