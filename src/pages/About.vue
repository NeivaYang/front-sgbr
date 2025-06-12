<template>
  <q-page>
    <ContentPages :title="'Sobre'"></ContentPages>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContentPages from 'components/organisms/ContentPages.vue';

export default defineComponent({
  name: 'AboutPage',

  components: {
    ContentPages,
  },
});
</script>
