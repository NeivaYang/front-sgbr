<template>
  <q-page>
    <ContentPages :title="'Favoritos'"></ContentPages>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContentPages from 'components/organisms/ContentPages.vue';

export default defineComponent({
  name: 'FavoritesPage',

  components: {
    ContentPages,
  },
});
</script>
