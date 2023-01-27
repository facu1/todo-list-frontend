<script lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import BackdropComponent from "../components/BackdropComponent.vue";
import MainHeader from "../components/MainHeader.vue";
import ReportContent from "../components/ReportPage/ReportContent.vue";
import { useTodosStore, useUserStore } from "../store";

export default {
  components: {
    MainHeader,
    ReportContent,
    BackdropComponent,
  },
  setup() {
    const todosStore = useTodosStore();
    const userStore = useUserStore();

    const getUserInfoAndTodos = async () => {
      const { getAccessTokenSilently } = useAuth0();
      const token = await getAccessTokenSilently();

      await userStore.getUserInfo(token);
      await todosStore.getTodos(token);
    };

    getUserInfoAndTodos();

    return { todosStore, userStore };
  },
};
</script>

<template>
  <div
    class="flex flex-col p-8 xs:p-10 h-screen text-[#333333] overflow-hidden"
  >
    <MainHeader />
    <ReportContent />
    <BackdropComponent
      v-if="todosStore.isLoading || userStore.isLoading"
      class="z-50"
    />
  </div>
</template>
