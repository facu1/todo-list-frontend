<script lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import TabsComponent from "../components/HomePage/TabsComponent.vue";
import MainHeader from "../components/MainHeader.vue";
import { useTodosStore, useUserStore } from "../store";

export default {
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

    return {};
  },
  components: {
    MainHeader,
    TabsComponent,
  },
};
</script>

<template>
  <div
    class="flex flex-col p-8 xs:p-10 h-screen text-[#333333] overflow-hidden"
  >
    <MainHeader />
    <TabsComponent />
  </div>
</template>
