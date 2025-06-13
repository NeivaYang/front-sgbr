// src/stores/userStore.ts
import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';

interface User {
  name: string;
  about: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: LocalStorage.getItem('user'),
  }),

  actions: {
    setUser(data: User) {
      this.user = data;
      LocalStorage.set('user', data);
    },
  },

  getters: {
    userName: (state) => state.user?.name || '',
    userAbout: (state) => state.user?.about || '',
  },
});
