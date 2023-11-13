<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore, useBannerStore } from "@/store";
import { onMounted } from "vue";
import { errorBanner } from "@/utils";

const router = useRouter();
const authStore = useAuthStore();
const bannerStore = useBannerStore();

const isProcessing = ref(false);
const username = ref("");
const password = ref("");
const id_banner = ref('');

async function signIn() {
  isProcessing.value = true;
  await authStore.signIn(username.value, password.value);
  isProcessing.value = false;
  if (authStore.loggedUser) {
    bannerStore.removeBanner(id_banner)
    await router.push({ name: "home" });
  }
  else
    errorBanner("Invalid username or password", 5000);
}

onMounted(() => {
  id_banner.value = router.currentRoute.value.query.id_banner as string;
  document.getElementById("username")?.focus();
});
</script>

<template>
  <div id="login" class="mt-8 flex flex-col items-center">
    <h3 class="text-5xl font-bold">Login</h3>
    <div class="form w-[500px] mt-8 p-4  border border-surface-border rounded">
      <div class="form-group">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          class="form-input"
          v-model="username"
          required
          :disabled="isProcessing"
        />
      </div>
      <div class="form-group mt-4">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="form-input"
          v-model="password"
          required @keydown="e => e.key === 'Enter' && signIn()"
          :disabled="isProcessing"
        />
      </div>
      <button @click="signIn" :disabled="isProcessing"
       class="button mt-8 w-full">
        {{ isProcessing ? "Signing-in..." : "Sign In" }}
      </button>
    </div>

    <router-link :to="{ name: 'home' }" class="mt-8 flex items-center hover:text-brand-400">
      <svg class="w-4 h-4">
        <use href="#back" />
      </svg>
      <p class="ml-2">back to Home</p>
    </router-link>
  </div>
</template>
