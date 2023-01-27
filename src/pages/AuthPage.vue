<script lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { watch, ref } from "vue";
import { useRouter } from "vue-router";
import { PathsOfRoutes } from "../types";
import PageLoading from "../components/PageLoading.vue";
import HeroIconsPaths from "../components/HeroIconsPaths.vue";

export default {
  setup() {
    const router = useRouter();
    const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();
    const loginLoading = ref<boolean>(false);
    const login = () => {
      loginLoading.value = true;
      loginWithRedirect();
    };

    watch(isAuthenticated, (newIsAuthenticated, prevIsAuthenticated) => {
      if (newIsAuthenticated && !prevIsAuthenticated)
        setTimeout(() => router.push(PathsOfRoutes.HOME), 1000);
    });

    return {
      isAuthenticated,
      isLoading,
      loginLoading,
      user,
      login,
    };
  },
  components: {
    PageLoading,
    HeroIconsPaths,
  },
};
</script>

<template>
  <div
    v-if="!isAuthenticated && !isLoading"
    class="w-screen h-screen custom-gradient flex flex-col justify-center items-center p-10"
  >
    <p class="text-4xl font-bold pb-12">Todo List</p>
    <p class="text-2xl text-center pb-16">
      A simple “To-Do List” App for creating and managing daily tasks
    </p>
    <button
      class="transition-all px-11 py-3 rounded-2xl flex gap-1 text-white"
      :class="loginLoading ? 'bg-[#BC66FF]' : 'bg-[#A533FF] hover:bg-[#8F00FF]'"
      :disabled="loginLoading"
      @click.prevent="login"
    >
      <p class="text-2xl">Log In</p>
      <HeroIconsPaths
        v-if="loginLoading"
        iconName="loading"
        iconClass="w-8 h-8 animate-spin"
      />
    </button>
  </div>
  <PageLoading v-else-if="isAuthenticated && !isLoading" />
</template>

<style scoped>
.custom-gradient {
  background: linear-gradient(
    180deg,
    #cccccc 0%,
    #ffffff 13.02%,
    #ffffff 87.5%,
    #cccccc 100%
  );
}
</style>
