<template>
  <div>
    <h2>Select a slot to book</h2>
    <ul>
      <li v-for="slot in service.slots" :key="slot.slotId">
        <a
          @click="handleSlotSelect(slot.slotId)"
        >
          {{ new Date(slot.dateTimeFrom).toLocaleString() }}
      </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '../lib/apolloClient';
import { defineComponent, ref, watchEffect } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { SERVICE_QUERY } from '@/graphql/queries'
import { BOOKING_CREATE_MUTATION } from '@/graphql/mutations'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    serviceId: String
  },
  setup(props) {
    provideApolloClient(apolloClient);
    const router = useRouter()
    const selectedSlot = ref<string | null>(null)
    const { result, loading, error } = useQuery(SERVICE_QUERY, () => ({
      serviceId: props.serviceId,
      slotType: 'AVAILABLE'
    }))

    const service = ref<any>({});

    watchEffect(() => {
      if (result.value && result.value.service) {
        service.value = result.value.service;
      }
    });

    const {
      mutate: createBooking,
      loading: bookingLoading,
      error: bookingError
    } = useMutation(BOOKING_CREATE_MUTATION)

    const handleSlotSelect = async (slotId: string) => {
      selectedSlot.value = slotId;
      try {
        const result = await createBooking({ serviceId: props.serviceId, slots: [slotId] });
        if (result && 'data' in result) {
          const { data } = result;
          if (data.bookingCreate && data.bookingCreate.bookingId) {
            router.push(`/confirmation/${data.bookingCreate.bookingId}`);
          }
        } else {
          console.error('No data returned from booking creation');
        }
      } catch (error) {
        console.error('Error creating booking:', error);
        // Handle booking error here
      }
    };

    return {
      service,
      loading,
      error,
      bookingLoading,
      bookingError,
      selectedSlot,
      handleSlotSelect
    }
  }
})
</script>
