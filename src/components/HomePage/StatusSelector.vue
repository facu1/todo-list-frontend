<script setup lang="ts">
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const statuses = [
  { id: "01", name: "Pending", color: "bg-gray", unavailable: false },
  {
    id: "02",
    name: "In Progress",
    color: "bg-in-progress",
    unavailable: false,
  },
  { id: "03", name: "Completed", color: "bg-completed", unavailable: false },
];
const selectedPerson = ref(statuses[0]);
</script>

<template>
  <Listbox v-model="selectedPerson">
    <div class="relative z-50">
      <ListboxButton
        class="px-2 py-1 rounded-xl"
        :class="`${selectedPerson.color} `"
        >{{ selectedPerson.name }}</ListboxButton
      >
      <ListboxOptions
        class="absolute flex flex-col gap-2 right-0 w-32 mt-2 p-2 rounded-xl bg-gray"
      >
        <ListboxOption
          v-for="person in statuses"
          :key="person.id"
          :value="person"
          :class="`rounded-xl`"
        >
          <div class="flex items-center">
            <div
              :class="`${person.color} w-4 h-4 mr-2 border border-solid rounded`"
            />
            <p>{{ person.name }}</p>
          </div>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>
