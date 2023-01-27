import { defineStore } from "pinia";

export const useErrorsStore = defineStore("errors", {
  state: () => ({ msg: "" }),
  getters: {},
  actions: {
    setErrorMessage(msg: string) {
      this.msg = msg;
      setTimeout(() => {
        this.msg = "";
      }, 3000);
    },
  },
});
