<template>
  <q-page class="q-ml-xl" style="margin-left: 300px">
    <h6 class="q-ml-xl">{{ title }}</h6>
    <q-card bordered class="q-ml-xl q-mr-xl q-mt-md q-mb-md">
      <q-card-section>
        <slot />
      </q-card-section>
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
