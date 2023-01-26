<script lang="ts">
import HeroIconsPaths from "./HeroIconsPaths.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { PathsOfRoutes } from "../types";
import { useAuth0 } from "@auth0/auth0-vue";
import { ref } from "vue";
import BackdropComponent from "./BackdropComponent.vue";

export default {
  setup() {
    const logoutLoading = ref<boolean>(false);
    const { logout } = useAuth0();

    return {
      PathsOfRoutes,
      logoutLoading,
      logout: () => {
        logoutLoading.value = true;
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        });
      },
    };
  },
  components: {
    HeadlessMenu: Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    HeroIconsPaths,
    BackdropComponent,
  },
};
</script>

<template>
  <div class="flex justify-between items-center w-full max-w-4xl mx-auto">
    <div class="hidden lg:flex gap-11 text-xl w-48">
      <router-link :to="PathsOfRoutes.HOME">
        <div class="flex items-center gap-2 mb-2">
          <HeroIconsPaths iconName="home" iconClass="lg:hidden" />
          <p>Home</p>
        </div>
      </router-link>
      <router-link :to="PathsOfRoutes.REPORT">
        <div class="flex items-center gap-2">
          <HeroIconsPaths iconName="report" iconClass="lg:hidden" />
          <p>Report</p>
        </div>
      </router-link>
    </div>
    <HeadlessMenu as="div" class="relative inline-flex text-left lg:hidden">
      <MenuButton>
        <HeroIconsPaths
          icon-name="menu"
          icon-class="h-8 xs:h-10 w-8 xs:w-10 m-2"
        />
      </MenuButton>
      <MenuItems
        class="absolute left-0 mt-16 p-5 w-40 flex flex-col bg-[#D9D9D9] shadow-lg text-xl font-semibold rounded-xl"
      >
        <MenuItem>
          <router-link :to="PathsOfRoutes.HOME">
            <div class="flex items-center gap-2 mb-2">
              <HeroIconsPaths iconName="home" />
              <p>Home</p>
            </div>
          </router-link>
        </MenuItem>
        <MenuItem>
          <router-link :to="PathsOfRoutes.REPORT">
            <div class="flex items-center gap-2">
              <HeroIconsPaths iconName="report" />
              <p>Report</p>
            </div>
          </router-link>
        </MenuItem>
      </MenuItems>
    </HeadlessMenu>
    <p class="text-2xl xs:text-[2rem] font-bold">Todo List</p>
    <HeadlessMenu as="div" class="relative flex text-left lg:hidden">
      <MenuButton>
        <div class="w-12 xs:w-14 h-12 xs:h-14 bg-[#D9D9D9] rounded-full" />
      </MenuButton>
      <MenuItems
        class="absolute right-0 mt-16 p-5 w-40 flex flex-col bg-[#D9D9D9] shadow-lg text-xl font-semibold rounded-xl"
      >
        <MenuItem>
          <div class="flex items-center gap-2" @click="logout">
            <HeroIconsPaths iconName="logout" />
            <p>Log out</p>
          </div>
        </MenuItem>
      </MenuItems>
    </HeadlessMenu>
    <div class="hidden lg:flex gap-11 text-xl justify-end w-48">
      <div class="flex items-center gap-2 lg:mr-2" @click="logout">
        <HeroIconsPaths iconName="logout" iconClass="lg:hidden" />
        <p>Log out</p>
      </div>
      <div class="w-12 xs:w-14 h-12 xs:h-14 bg-[#D9D9D9] rounded-full" />
    </div>
  </div>
  <BackdropComponent v-if="logoutLoading" class="z-50" />
</template>
