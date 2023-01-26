<script lang="ts">
import { ref } from "vue";
import HeroIconsPaths from "../HeroIconsPaths.vue";
import TodoForm from "./TodoForm.vue";
import TodoItem from "./TodoItem.vue";

export default {
  props: {
    typesOfTodos: {
      type: String,
      default: "Pending",
    },
  },
  setup() {
    const isOpen = ref(false);

    const setIsOpen = (value: boolean) => {
      isOpen.value = value;
    };

    return { isOpen, setIsOpen };
  },
  components: {
    HeroIconsPaths,
    TodoItem,
    TodoForm,
  },
};
</script>

<template>
  <div class="max-h-full overflow-y-auto">
    <div class="flex flex-col gap-4">
      <TodoItem :status="typesOfTodos" />
      <TodoItem :status="typesOfTodos" />
      <TodoItem :status="typesOfTodos" />
    </div>
  </div>
  <div v-if="typesOfTodos !== 'Completed'" class="mt-4">
    <button
      class="flex w-full justify-center bg-[#A533FF] text-white p-3 rounded-xl mt-auto"
      @click="() => setIsOpen(true)"
    >
      <HeroIconsPaths icon-name="plus" icon-class="w-7 h7" />
    </button>
  </div>
  <TodoForm :isOpen="isOpen" :setIsOpen="setIsOpen" />
</template>
