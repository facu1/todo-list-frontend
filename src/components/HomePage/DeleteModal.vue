<script lang="ts">
import { Dialog as HeadlessDialog, DialogPanel } from "@headlessui/vue";
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
    deleteFunction: {
      type: Function,
      required: true,
    },
  },
  components: { HeadlessDialog, DialogPanel, BackdropComponent },
};
</script>

<template>
  <HeadlessDialog
    :open="isOpen"
    @close="() => setIsOpen(false)"
    class="relative z-50"
  >
    <BackdropComponent />
    <div class="fixed inset-0 flex items-center justify-center p-8 xs:p-10">
      <DialogPanel
        class="w-full max-w-sm rounded-xl border border-solid bg-white p-5 text-[#333]"
      >
        <p class="text-xl xs:text-2xl font-semibold mb-3">Delete to-do</p>
        <p class="text-xl mb-5">Are you sure you want to delete the to-do?</p>

        <div class="flex justify-between font-semibold xs:text-xl">
          <button
            @click="setIsOpen(false)"
            class="w-full max-w-[7rem] bg-[#D9D9D9] xs:py-2 px-3 xs:px-7 rounded-xl"
          >
            Cancel
          </button>
          <button
            @click="() => deleteFunction()"
            class="w-full max-w-[7rem] bg-[#A533FF] text-white xs:py-2 px-3 xs:px-7 rounded-xl"
          >
            Delete
          </button>
        </div>
      </DialogPanel>
    </div>
  </HeadlessDialog>
</template>
