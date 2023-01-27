<script lang="ts">
import { ref, defineComponent, PropType } from "vue";
import HeroIconsPaths from "../HeroIconsPaths.vue";
import DeleteModal from "./DeleteModal.vue";
import StatusSelector from "./StatusSelector.vue";
import { useTodosStore, useUserStore } from "../../store";
import { ITodo, TodoState } from "../../types";
import { useAuth0 } from "@auth0/auth0-vue";

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<ITodo>,
      required: true,
    },
  },
  setup(props) {
    const userStore = useUserStore();
    const todosStore = useTodosStore();
    const { getAccessTokenSilently } = useAuth0();
    const expanded = ref<boolean>(false);
    const isOpen = ref(false);
    const setIsOpen = (value: boolean) => (isOpen.value = value);
    const deleteTodo = async () => {
      todosStore.removeTodo(await getAccessTokenSilently(), props.todo.id);
      isOpen.value = false;
    };

    return {
      userStore,
      TodoState,
      expanded,
      isOpen,
      setIsOpen,
      deleteTodo,
    };
  },
  components: {
    HeroIconsPaths,
    DeleteModal,
    StatusSelector,
  },
});
</script>

<template>
  <div
    class="border border-solid rounded-xl flex flex-col p-5 pb-1"
    :key="`${todo.id}_${todo.state}`"
  >
    <div class="flex justify-between items-center mb-5">
      <p class="text-xl font-semibold">{{ todo.title }}</p>
      <StatusSelector v-if="todo.state !== TodoState.Completed" :todo="todo" />
      <div class="px-2 py-1 rounded-xl bg-completed" v-else>
        {{ todo.state }}
      </div>
    </div>
    <div class="flex justify-between items-center">
      <div class="flex flex-col xs:flex-row items-center">
        <div class="flex items-center">
          <HeroIconsPaths icon-name="calendar" />
          <p class="text-sm ml-2">{{ todo.created }}</p>
        </div>
        <div
          v-if="todo.state === TodoState.Completed"
          class="flex items-center xs:ml-3"
        >
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
          <p class="text-sm ml-2">{{ todo.dateOfCompleted }}</p>
        </div>
      </div>
      <button class="text-[#FF0000]" @click="setIsOpen(true)">
        <HeroIconsPaths icon-name="trash" />
      </button>
    </div>
    <div class="flex flex-col" v-if="todo.description">
      <div
        class="overflow-hidden mt-2 focus:border-none transition-all"
        :class="`${expanded ? 'max-h-40' : 'max-h-0'}`"
      >
        <p>{{ todo.description }}</p>
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
  </div>
  <DeleteModal
    :isOpen="isOpen"
    :setIsOpen="setIsOpen"
    :deleteFunction="deleteTodo"
  />
</template>
