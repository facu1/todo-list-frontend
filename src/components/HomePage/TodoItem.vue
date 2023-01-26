<script lang="ts">
import { ref } from "vue";
import HeroIconsPaths from "../HeroIconsPaths.vue";
import DeleteModal from "./DeleteModal.vue";
import StatusSelector from "./StatusSelector.vue";

export default {
  props: {
    status: {
      type: String,
      default: "Pending",
    },
  },
  setup() {
    const expanded = ref<boolean>(false);

    const isOpen = ref(false);

    const setIsOpen = (value: boolean) => {
      isOpen.value = value;
    };

    return {
      expanded,
      isOpen,
      setIsOpen,
    };
  },
  components: {
    HeroIconsPaths,
    DeleteModal,
    StatusSelector,
  },
};
</script>

<template>
  <div class="border border-solid rounded-xl flex flex-col p-5 pb-1">
    <div class="flex justify-between items-center mb-5">
      <p class="text-xl font-semibold">Todo 1</p>
      <StatusSelector />
    </div>
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <div class="flex items-center">
          <HeroIconsPaths icon-name="calendar" />
          <p class="text-sm ml-2">23/01/2023</p>
        </div>
        <div v-if="status === 'Completed'" class="flex items-center ml-3">
          <div class="relative w-6 h-6">
            <HeroIconsPaths
              icon-name="calendarCheck"
              icon-class="w-6 h-6 absolute"
            />
            <HeroIconsPaths
              icon-name="check"
              icon-class="w-5 h-5 top-1 left-1 absolute"
            />
          </div>
          <p class="text-sm ml-2">23/01/2023</p>
        </div>
      </div>
      <button class="text-[#FF0000]" @click="setIsOpen(true)">
        <HeroIconsPaths icon-name="trash" />
      </button>
    </div>
    <div
      class="overflow-hidden mt-2 focus:border-none transition-all"
      :class="`${expanded ? 'max-h-40' : 'max-h-0'}`"
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <button
      class="flex justify-center text-[#A533FF]"
      @click="() => (expanded = !expanded)"
    >
      <HeroIconsPaths
        icon-name="arrowDown"
        :icon-class="`w-6 h-6 transition-all ${
          expanded ? 'rotate-180' : 'rotate-0'
        }`"
      />
    </button>
  </div>
  <DeleteModal :isOpen="isOpen" :setIsOpen="setIsOpen" />
</template>
