<template>
  <q-page>
    <ContentPages :title="'Home'">
      <div class="flex justify-end">
        <q-input
          v-model="giphyStore.searchQuery"
          @blur="giphyStore.fetchGiphies({ query: giphyStore.searchQuery })"
          label="Pesquisar Gifs"
          outlined
          bottom-slots
        >
          <template v-slot:append>
            <q-icon name="close" @click="giphyStore.searchQuery = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
      <div v-if="giphyStore.loading" class="flex flex-col items-center justify-center">
        <q-spinner-grid color="primary" size="5.5em" />
      </div>
      <div v-else>
        <div class="q-pa-md row justify-between">
          <div class="row justify-between q-gutter-sm">
            <q-intersection v-for="gif in giphyStore.giphies" :key="gif.id" class="col-2">
              <q-card flat bordered class="q-ma-sm">
                <img
                  :src="gif.images.fixed_height.url"
                  :alt="gif.title"
                  style="max-width: 200px; max-height: 200; object-fit: cover"
                />
                <q-card-section>
                  <div class="text-h6 truncate">{{ gif.title }}</div>
                </q-card-section>
                <q-card-actions align="left">
                  <q-btn
                    flat
                    round
                    color="red"
                    icon="favorite"
                    @click="
                      giphyStore.addFavorite(gif);
                      showNotification('Gif adicionado aos favoritos!', 'positive');
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
import { defineComponent, onMounted } from 'vue';
import ContentPages from 'components/organisms/ContentPages.vue';
import { useGiphyStore } from 'src/stores/giphyStore';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'HomePage',

  setup() {
    const giphyStore = useGiphyStore();
    const $q = useQuasar();

    onMounted(() => {
      void giphyStore.fetchGiphies({});
    });

    return {
      giphyStore,
      showNotification(
        message: string = 'Gif adicionado aos favoritos!',
        color: string = 'positive',
      ) {
        $q.notify({
          message,
          color,
          position: 'top',
        });
      },
    };
  },

  components: {
    ContentPages,
  },
});
</script>
