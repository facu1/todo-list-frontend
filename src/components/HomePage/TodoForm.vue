<script lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { Dialog as HeadlessDialog, DialogPanel } from "@headlessui/vue";
import { ref } from "vue";
import { useErrorsStore, useTodosStore } from "../../store";
import { NewTodo } from "../../types";
import BackdropComponent from "../BackdropComponent.vue";
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    setIsOpen: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const todosStore = useTodosStore();
    const errorStore = useErrorsStore();
    const { getAccessTokenSilently } = useAuth0();
    const titleInput = ref<string>("");
    const descriptionInput = ref<string>("");
    const titleError = ref<string>("");

    const createNewTodoFunction = () => {
      if (!titleInput.value) {
        titleError.value = "Title is required to create a new to-do";
        return;
      }
      const newTodo: NewTodo = {
        title: titleInput.value,
        description: descriptionInput.value,
      };
      getAccessTokenSilently().then((token) => {
        todosStore.createTodo(token, newTodo).then(() => {
          if (!errorStore.msg) {
            props.setIsOpen(false);
          }
        });
      });
    };

    const closeForm = () => {
      titleInput.value = "";
      descriptionInput.value = "";
      titleError.value = "";
      props.setIsOpen(false);
    };

    return {
      todosStore,
      titleInput,
      descriptionInput,
      createNewTodoFunction,
      titleError,
      closeForm,
    };
  },
  components: { HeadlessDialog, DialogPanel, BackdropComponent },
};
</script>

<template>
  <HeadlessDialog :open="isOpen" @close="closeForm" class="relative z-50">
    <BackdropComponent />
    <div class="fixed inset-0 flex items-center justify-center p-8 xs:p-10">
      <DialogPanel
        class="w-full max-w-sm rounded-xl border border-solid bg-white p-5"
      >
        <p class="text-xl xs:text-2xl font-semibold mb-3">Create new to-do</p>
        <input
          type="text"
          placeholder="Title"
          class="w-full text-xl font-semibold text-[#666666] mb-4"
          v-model="titleInput"
        />
        <div v-if="titleError" class="text-delete mb-4">{{ titleError }}</div>
        <textarea
          placeholder="Description (optional)"
          rows="6"
          class="w-full font-semibold text-[#666666]"
          v-model="descriptionInput"
        />

        <div class="flex justify-between font-semibold xs:text-xl">
          <button
            @click="closeForm"
            class="w-full max-w-[7rem] bg-[#D9D9D9] xs:py-2 px-3 xs:px-7 rounded-xl"
          >
            Cancel
          </button>
          <button
            @click="createNewTodoFunction"
            class="w-full max-w-[7rem] bg-[#A533FF] text-white xs:py-2 px-3 xs:px-7 rounded-xl"
          >
            Save
          </button>
        </div>
      </DialogPanel>
    </div>
  </HeadlessDialog>
</template>
