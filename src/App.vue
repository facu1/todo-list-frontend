<script lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import PageLoading from "./components/PageLoading.vue";

export default {
  setup() {
    const { isLoading } = useAuth0();
    return {
      isLoading,
    };
  },
  components: { PageLoading },
};
</script>
<template>
  <PageLoading v-if="isLoading" />
  <router-view></router-view>
</template>

<style scoped>
* {
  color: #333;
}
</style>
