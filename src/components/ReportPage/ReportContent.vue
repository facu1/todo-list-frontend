<script setup lang="ts"></script>

<template>
  <div class="overflow-y-auto">
    <p class="text-2xl font-semibold mt-8 mb-4">Report</p>
    <div class="flex flex-col border border-solid rounded-xl p-5">
      <div class="flex flex-col text-center mb-5">
        <p class="mb-3">Average task completion</p>
        <p class="text-2xl font-semibold text-[#A533FF]">1 h 3 m</p>
      </div>
      <div class="flex flex-col text-center mb-5">
        <p class="mb-3">Average task completion</p>
        <p class="text-2xl font-semibold text-[#A533FF]">45%</p>
      </div>
      <div class="flex justify-between mb-2">
        <p class="text-lg">Created</p>
        <p class="text-lg font-semibold">100</p>
      </div>
      <hr class="border-[#333]" />
      <div class="flex justify-between mb-2">
        <p class="text-lg">Pending</p>
        <p class="text-lg font-semibold">20</p>
      </div>
      <hr class="border-[#333]" />
      <div class="flex justify-between mb-2">
        <p class="text-lg">In Progress</p>
        <p class="text-lg font-semibold">20</p>
      </div>
      <hr class="border-[#333]" />
      <div class="flex justify-between mb-2">
        <p class="text-lg">Completed</p>
        <p class="text-lg font-semibold">15</p>
      </div>
      <hr class="border-[#333]" />
      <div class="flex justify-between mb-2">
        <p class="text-lg">Deleted</p>
        <p class="text-lg font-semibold">45</p>
      </div>
    </div>
  </div>
</template>
