<script lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { ref } from "vue";
import TodosList from "./TodosList.vue";

export default {
  setup() {
    const tabs = ref(["Created", "Completed"]);

    return {
      tabs,
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
  <div class="h-full flex flex-col overflow-hidden">
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
          <TodosList />
        </TabPanel>
        <TabPanel class="h-full flex flex-col overflow-hidden">
          <TodosList typesOfTodos="Completed" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
