import { defineStore } from "pinia";
export const useGeneralStore = defineStore("general", {
  state: () => ({
    isUserLoggedIn: false,
    showAlert: false,
    alertMessage: "",
  }),
  actions: {
    setAlert() {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
  },
  persist: true,
});
