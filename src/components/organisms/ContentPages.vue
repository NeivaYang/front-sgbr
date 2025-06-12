<template>
  <q-page>
    <h6 class="m-0 p-0 q-ml-xl">{{ title }}</h6>
    <q-card bordered class="q-ml-xl q-mr-xl q-mt-md q-mb-md">
      <q-card-section class="text-h6"> sdas</q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ContentPages',

  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
  },
});
</script>
