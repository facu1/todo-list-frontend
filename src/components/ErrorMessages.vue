<script lang="ts">
import { useErrorsStore } from "../store";

export default {
  setup() {
    const errorStore = useErrorsStore();
    return { errorStore };
  },
};
</script>

<template>
  <div v-if="errorStore.msg" class="relative z-50">
    <div class="fixed inset-0 flex items-end justify-center p-8 xs:p-10">
      <div class="w-full max-w-sm rounded-xl border border-solid bg-white p-5">
        {{ errorStore.msg }}
      </div>
    </div>
  </div>
</template>
