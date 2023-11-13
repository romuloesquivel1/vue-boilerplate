<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const { isSignedIn, loggedUser } = storeToRefs(authStore);
const defaultNavs = [{ title: "HOME", to: { name: "home" } }];
const navs = ref(defaultNavs);

const onSignOut = async () => {
  authStore.signOut();
  await router.push({ name: "home" });
};
</script>

<template>
  <div
    class="h-[48px] flex items-center shadow border-b border-surface-border"
  >
    <nav class="flex container mx-auto justify-between">
      <div class="r">
        <router-link
          :to="nav.to"
          v-for="(nav, ix) in navs"
          :key="ix"
          class="text-lg mx-4 font-bold hover:text-brand-300"
          >{{ nav.title }}
        </router-link>
      </div>
      <router-link :to="{ name: 'login' }" v-if="!isSignedIn"
                   class="text-lg mx-4 font-bold hover:text-brand-300"
      >LOGIN</router-link>
      <div class="text-lg mx-4 font-bold" v-else>
        <div class="flex items-center">
          <p class="mr-4">{{ $translate('greetings.welcome') + ' ' + loggedUser.name }}</p>
          <router-link :to="{ name: 'profile' }"
            class="text-lg mx-4 font-bold hover:text-brand-300"
          >PROFILE</router-link>
          <a href="#" @click="onSignOut" class="text-lg mx-4 font-bold hover:text-brand-300">SIGN OUT</a>
        </div>
      </div>
    </nav>
  </div>
  <div class="container mx-auto">
    <router-view />
  </div>
</template>
