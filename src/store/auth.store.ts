import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";

const testUsers = [{
  email: "user1@test.local",
  name: "User 1",
  password: "123456",
  avatar: "https://robohash.org/user1",
  summary: "This is a professional summary for user 1, it can be long or short, it's up to the user.",
}, {
  email: "user2@test.local",
  name: "User 2",
  password: "123456",
  avatar: "https://robohash.org/user2",
  summary: "This is a professional summary for user 2, it can be long or short, it's up to the user.",
}]

export const useAuthStore = defineStore("auth", () => {
  const isSignedIn: Ref<boolean> = ref(false);
  const loggedUser: Ref<any> = ref(null);

  async function signIn(username: string, password: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = testUsers.find(user => user.email === username && user.password === password) || null;
        if (!user) {
          return resolve();
        }

        loggedUser.value = user;
        isSignedIn.value = true;
        resolve();
      }, 2000);
    });
  }

  function signOut() {
    loggedUser.value = null;
    isSignedIn.value = false;
  }

  return { isSignedIn, loggedUser, signIn, signOut };
});
