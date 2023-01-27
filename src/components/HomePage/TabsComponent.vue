<script lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { ref, computed } from "vue";
import { useTodosStore } from "../../store";
import { TodoState } from "../../types";
import TodosList from "./TodosList.vue";

export default {
  setup() {
    const todosStore = useTodosStore();

    const tabs = ref(["Created", "Completed"]);

    const openTodos = computed(() =>
      todosStore.todos.filter((todo) => todo.state !== TodoState.Completed)
    );

    const closedTodos = computed(() =>
      todosStore.todos.filter((todo) => todo.state === TodoState.Completed)
    );

    return {
      tabs,
      openTodos,
      closedTodos,
    };
  },
  components: {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    TodosList,
  },
};
</script>

<template>
  <div
    class="h-full flex flex-col w-full max-w-md m-auto lg:hidden overflow-hidden"
  >
    <TabGroup>
      <TabList class="flex mt-8">
        <Tab v-for="tab in tabs" :key="tab" as="template" v-slot="{ selected }">
          <button
            class="w-1/2 text-lg xs:text-2xl pb-4 mb-4 border-solid border-b-2"
            :class="[
              selected
                ? 'text-[#A533FF] border-[#A533FF]'
                : 'text-[#777] border-white',
              tab === 'Completed' ? 'text-end' : 'text-start',
            ]"
          >
            {{ tab }}
          </button>
        </Tab>
      </TabList>
      <TabPanels class="h-full overflow-hidden">
        <TabPanel class="h-full flex flex-col overflow-hidden">
          <TodosList :todos="openTodos" />
        </TabPanel>
        <TabPanel class="h-full flex flex-col overflow-hidden">
          <TodosList :todos="closedTodos" showCompleted />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
  <div
    class="hidden lg:flex h-full w-full flex-col overflow-hidden max-w-4xl mx-auto text-center mt-6"
  >
    <div class="flex">
      <div
        v-for="tab in tabs"
        :key="tab"
        class="w-1/2 text-lg xs:text-2xl pb-4 mb-4 lg:mb-0"
      >
        {{ tab }}
      </div>
    </div>
    <div class="h-full overflow-hidden flex gap-8">
      <div class="h-full w-full overflow-hidden">
        <div class="h-full flex flex-col overflow-hidden">
          <TodosList :todos="openTodos" />
        </div>
      </div>
      <div class="h-full w-full overflow-hidden">
        <div class="h-full flex flex-col overflow-hidden">
          <TodosList :todos="closedTodos" showCompleted />
        </div>
      </div>
    </div>
  </div>
</template>
