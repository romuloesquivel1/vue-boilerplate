import { Http } from "@/services/Http";
import type { Post, Comment } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";

// sleep function to simulate network latency
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const usePostsStore = defineStore("posts", () => {
  const posts: Ref<Post[]> = ref([]);

  async function getPosts(
    { start = 0, limit = 10 }: { start?: number; limit?: number }
  ): Promise<void> {
    // await sleep(4000);
    posts.value = await Http.get<Post[]>(`/posts?_start=${start}&_limit=${limit}`);
  }

  async function getPost(id: string): Promise<{ post: Post; comments: Comment[] }> {
    await sleep(2000);

    const post = await Http.get<Post>(`/posts/${id}`);
    const comments = await Http.get<Comment[]>(`/posts/${id}/comments`);

    return { post, comments };
  }

  return { posts, getPosts, getPost };
});
