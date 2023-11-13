<script setup lang="ts">
import Comment from "@/components/Comment.vue";
import Loader from "@/components/Loader.vue";
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { useRoute } from "vue-router";
import type { Post, Comment as CommentType } from "@/types";
import { usePostsStore } from "@/store";

const route = useRoute();
const postStore = usePostsStore();

const id = route.params.id as string;

let loading = ref(false);

const post: Ref<Post | null> = ref(null);
const comments: Ref<CommentType[]> = ref([]);

onMounted(async () => {
  document.title = `Post ${id} - VB`;
  loading.value = true;

  const res = await postStore.getPost(id);
  post.value = res.post;
  comments.value = res.comments;

  loading.value = false;
});
</script>

<template>
  <Transition name="fade">
    <div v-if="id && loading" class="flex flex-col items-center justify-center h-screen">
      <Loader/>
      <strong class='mt-3'>Loading post {{ id }}...</strong>
    </div>
    <div id="post" v-else-if="post" class="mt-8 flex flex-col items-center">
      <div class="p-4 w-[900px] rounded">
        <p class="text-4xl font-bold">{{ post.title }}</p>
        <p class="mt-6 text-lg">{{ post.body }}</p>
      </div>
      <div class="my-4 h-[1px] w-[900px] bg-surface-border"></div>
      <h3 class="text-xl font-bold">Comments</h3>
      <div class="mt-2 w-[800px]">
        <Comment
            class="post-comment"
            v-for="(comment, ix) in comments"
            :key="ix"
            :comment="comment"
        />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.post-comment {
  &:not(:last-of-type) {
    @apply border-b border-surface-border;
  }
}
</style>
