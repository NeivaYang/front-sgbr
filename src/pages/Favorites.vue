<template>
  <q-page>
    <ContentPages :title="'Favoritos'">
      <div v-if="giphyStore.loading" class="flex flex-col items-center justify-center">
        <q-spinner-grid color="primary" size="5.5em" />
      </div>
      <div v-else>
        <div class="q-pa-md row justify-between">
          <div class="row justify-between q-gutter-sm">
            <q-intersection v-for="gif in giphyStore.favorites" :key="gif.id" class="col-2">
              <q-card flat bordered class="q-ma-sm">
                <img
                  :src="gif.images.fixed_height.url"
                  :alt="gif.title"
                  style="max-width: 200px; max-height: 200px; object-fit: cover"
                />
                <q-card-section>
                  <div class="text-h6 truncate">{{ gif.title }}</div>
                </q-card-section>
                <q-card-actions align="left">
                  <q-btn
                    flat
                    round
                    color="red"
                    icon="close"
                    @click="
                      giphyStore.removeFavorite(gif.id);
                      showNotification('Gif removido doss favoritos!', 'negative');
                    "
                  />
                </q-card-actions>
              </q-card>
            </q-intersection>
          </div>
        </div>
      </div>
    </ContentPages>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContentPages from 'components/organisms/ContentPages.vue';
import { useGiphyStore } from 'src/stores/giphyStore';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'FavoritesPage',

  setup() {
    const giphyStore = useGiphyStore();
    const $q = useQuasar();

    // Optionally, if you have a function to load favorites from an API or LocalStorage, call it here
    // For example: onMounted(() => void giphyStore.fetchFavorites());

    const showNotification = (message: string, color: string) => {
      $q.notify({
        message,
        color,
        position: 'top',
      });
    };

    return {
      giphyStore,
      showNotification,
    };
  },

  components: {
    ContentPages,
  },
});
</script>
