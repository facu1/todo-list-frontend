<script lang="ts">
import MainHeader from "../components/MainHeader.vue";
import ReportContent from "../components/ReportPage/ReportContent.vue";

export default {
  components: {
    MainHeader,
    ReportContent,
  },
};
</script>

<template>
  <div
    class="flex flex-col p-8 xs:p-10 h-screen text-[#333333] overflow-hidden"
  >
    <MainHeader />
    <ReportContent />
  </div>
</template>
