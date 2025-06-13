<template>
  <q-page>
    <ContentPages :title="'Sobre'">
      <h6 class="flex justify-center text-center">
        {{ userStore.user.about }}. E este é um projeto com o propósito de testar habilidades
        front-end utilizando Quasar Framework.
      </h6>
    </ContentPages>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContentPages from 'components/organisms/ContentPages.vue';
import { useUserStore } from 'src/stores/userStore';

export default defineComponent({
  name: 'AboutPage',

  components: {
    ContentPages,
  },

  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    };
  },
});
</script>
