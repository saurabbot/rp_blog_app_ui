import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
  }),
  actions: {
    resetUser() {
      (this.$state.email = ""),
        (this.$state.id = null),
        (this.$state.first_name = ""),
        (this.$state.last_name = "");
    },
  },
  persist: true,
});
