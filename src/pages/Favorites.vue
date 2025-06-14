<template>
  <q-page>
    <ContentPages :title="'Favoritos'">
      <div v-if="giphyStore.loading" class="flex items-center justify-center">
        <q-spinner-grid color="primary" size="5.5em" />
      </div>
      <div v-else-if="giphyStore.favorites" class="flex items-center justify-center">
        <div class="q-pa-md row justify-between">
          <div class="row justify-between q-gutter-sm">
            <q-intersection
              v-for="gif in giphyStore.favorites"
              :key="gif.id"
              class="flex justify-end col-2"
            >
              <q-card flat bordered class="q-ma-xs flex items-center justify-center">
                <img
                  :src="gif.images.fixed_height.url"
                  :alt="gif.title"
                  style="width: 200px; height: 200px; object-fit: cover; min-width: 200px"
                  class="q-ma-xs"
                />

                <q-card-actions align="left">
                  <q-btn
                    flat
                    round
                    color="red"
                    icon="close"
                    @click="
                      giphyStore.removeFavorite(gif.id);
                      showNotification('Gif removido dos favoritos!', 'negative');
                    "
                  />
                </q-card-actions>
              </q-card>
            </q-intersection>
          </div>
        </div>
      </div>
      <div
        v-if="giphyStore.favorites.length === 0 && !giphyStore.loading"
        class="flex items-center justify-center"
      >
        <q-banner class="bg-info text-dark flex items-center justify-center">
          <q-icon name="error" size="xl" />
          Você ainda não tem nenhum gif favorito.
        </q-banner>
      </div>
    </ContentPages>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContentPages from 'components/organisms/ContentPages.vue';
import { useGiphyStore } from 'src/stores/giphyStore';
import { showNotification } from 'src/utils/common';

export default defineComponent({
  name: 'FavoritesPage',

  setup() {
    const giphyStore = useGiphyStore();

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
