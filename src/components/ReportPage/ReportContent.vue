<script lang="ts">
import { computed } from "vue";
import { useTodosStore, useUserStore } from "../../store";
import { TodoState } from "../../types";

export default {
  setup() {
    const userStore = useUserStore();
    const todosStore = useTodosStore();

    const avgTC = computed(() => {
      const times = todosStore.todos.map((todo) => {
        const createdTime = new Date(todo.created).getTime();
        const completedTime = todo.dateOfCompleted
          ? new Date(todo.dateOfCompleted).getTime()
          : new Date().getTime();
        return completedTime - createdTime;
      });

      if (!times.length) return "- h - m";

      let avg = 0;
      for (const time of times) {
        avg += time;
      }
      avg /= times.length;
      const [hh, mm] = new Date(avg).toISOString().substring(11, 16).split(":");
      return `${hh} h ${mm} m`;
    });

    const avgTD = computed(() => {
      const todos = todosStore.todos.length;
      const todosDeleted = userStore.deletedTodos;
      const todosTotal = todos + todosDeleted;
      return `${((todosDeleted * 100) / todosTotal).toFixed(2)}%`;
    });

    const stats = computed(() => ({
      Created: todosStore.todos.length + userStore.deletedTodos,
      Pending: todosStore.todos.filter(
        ({ state }) => state === TodoState.Pending
      ).length,
      InProgress: todosStore.todos.filter(
        ({ state }) => state === TodoState["In Progress"]
      ).length,
      Completed: todosStore.todos.filter(
        ({ state }) => state === TodoState.Completed
      ).length,
      Deleted: userStore.deletedTodos,
    }));

    return { userStore, todosStore, avgTC, avgTD, stats };
  },
};
</script>

<template>
  <div class="overflow-y-auto w-full max-w-xs mx-auto">
    <p class="text-2xl font-semibold mt-8 lg:mt-6 mb-4 lg:text-center">
      Report
    </p>
    <div class="flex flex-col border border-solid rounded-xl p-5">
      <div class="flex flex-col text-center mb-5">
        <p class="mb-3">Average time task completion</p>
        <p class="text-2xl font-semibold text-[#A533FF]">{{ avgTC }}</p>
      </div>
      <div class="flex flex-col text-center mb-5">
        <p class="mb-3">Average tasks deleted</p>
        <p class="text-2xl font-semibold text-[#A533FF]">{{ avgTD }}</p>
      </div>
      <div class="flex justify-between mb-2">
        <p class="text-lg">Created</p>
        <p class="text-lg font-semibold">{{ stats.Created }}</p>
      </div>
      <hr class="border-[#333]" />
      <div class="flex justify-between mb-2">
        <p class="text-lg">Pending</p>
        <p class="text-lg font-semibold">{{ stats.Pending }}</p>
      </div>
      <hr class="border-[#333]" />
      <div class="flex justify-between mb-2">
        <p class="text-lg">InProgress</p>
        <p class="text-lg font-semibold">{{ stats.InProgress }}</p>
      </div>
      <hr class="border-[#333]" />
      <div class="flex justify-between mb-2">
        <p class="text-lg">Completed</p>
        <p class="text-lg font-semibold">{{ stats.Completed }}</p>
      </div>
      <hr class="border-[#333]" />
      <div class="flex justify-between mb-2">
        <p class="text-lg">Deleted</p>
        <p class="text-lg font-semibold">{{ stats.Deleted }}</p>
      </div>
    </div>
  </div>
</template>
