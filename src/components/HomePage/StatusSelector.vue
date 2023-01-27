<script lang="ts">
import { ref, defineComponent, PropType } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { ITodo, TodoState } from "../../types";
import { useTodosStore } from "../../store";
import { useAuth0 } from "@auth0/auth0-vue";

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<ITodo>,
      required: true,
    },
  },
  setup(props) {
    const todosStore = useTodosStore();
    const { getAccessTokenSilently } = useAuth0();
    let statuses: { label: TodoState; bg: string }[] = [];
    let todoColor = "";

    switch (props.todo.state) {
      case TodoState["In Progress"]:
        todoColor = "bg-in-progress";
        statuses = [
          {
            label: TodoState.Pending,
            bg: "bg-gray",
          },
          {
            label: TodoState.Completed,
            bg: "bg-completed",
          },
        ];
        break;
      case TodoState.Pending:
        todoColor = "bg-gray";
        statuses = [
          {
            label: TodoState["In Progress"],
            bg: "bg-in-progress",
          },
        ];
        break;
    }

    const selectedPerson = ref(statuses[0]);

    const updateState = async (status: TodoState) => {
      const token = await getAccessTokenSilently();
      const updatedTodo: ITodo = {
        ...props.todo,
        state: status,
      };
      todosStore.updateTodoState(token, updatedTodo);
    };

    return {
      todoColor,
      statuses,
      selectedPerson,
      updateState,
    };
  },
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  },
});
</script>

<template>
  <Listbox v-model="selectedPerson">
    <div class="relative z-10">
      <ListboxButton class="px-2 py-1 rounded-xl" :class="todoColor">{{
        todo.state
      }}</ListboxButton>
      <ListboxOptions
        class="absolute flex flex-col gap-2 right-0 mt-2 w-32 p-2 rounded-xl bg-gray"
      >
        <ListboxOption
          v-for="status in statuses"
          :key="status.label"
          :value="status"
          :class="`rounded-xl`"
          @click="updateState(status.label)"
        >
          <div class="flex items-center cursor-pointer">
            <div
              :class="`${status.bg} w-4 h-4 mr-2 border border-solid rounded`"
            />
            <p>{{ status.label }}</p>
          </div>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>
