<script setup lang="ts">
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { loggedUser } = storeToRefs(authStore);
</script>

<template>
  <Transition name="fade">
    <div class="my-8 items-center">
      <div class="flex flex-col mb-8 items-center">
        <h3 class="text-5xl font-bold">Profile</h3>
      </div>
      <div v-if="loggedUser" class="p-4 bg-white rounded shadow-md">
        <div class="grid grid-cols-5 gap-3">
          <div class="text-center rounded bg-green-500">
            <img class="w-32 h-32 rounded-full object-cover mb-4 mx-auto" :src="loggedUser.avatar" alt="Profile picture">
            <h2 class="text-2xl font-bold text-black">{{ loggedUser.name }}</h2>
          </div>
          <div class="col-span-4">
            <p class="text-gray-600">Email: {{ loggedUser.email }}</p>
            <p class="text-gray-600">{{ loggedUser.summary }}</p>
          </div>
        </div>
      </div>
      <div v-else class="p-4 bg-red-100 rounded shadow-md">
        <p class="text-red-600">User not logged in</p>
      </div>
    </div>
  </Transition>
</template>
