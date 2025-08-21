<script setup>
import { usePostsStore } from "@/stores/posts";
import { onMounted, ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const { getAllPosts, deletePost } = usePostsStore();
const posts = ref([]);
const authStore = useAuthStore();
const loading = ref(true);


onMounted(async () => {
   loading.value = true;
  posts.value = await getAllPosts();
  loading.value = false;
});

const userPosts = computed(() =>
  posts.value.filter(post => post.user_id === authStore.user.id)
);

const removeProduct = async (post) => {
  posts.value = posts.value.filter(p => p.id !== post.id);
  await deletePost(post);
};
</script>

<template>
  <main class="p-6">
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else>
      <div v-if="userPosts.length > 0" class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-center flex-1 text-blue-700">
          Product List
        </h1>
        <RouterLink
          to="/create"
          class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-200 ml-4"
        >
          + Add Product
        </RouterLink>
      </div>

      <div v-if="userPosts.length === 0" class="text-center mt-2">
        <h2 class="mb-4 text-xl text-gray-600 font-medium">There are no products</h2>
        <RouterLink
          to="/create"
          class="mt-4 ml-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-200 ml-4"
        >
          + Add Product
        </RouterLink>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full border border-gray-300 shadow-md rounded-lg">
          <thead class="bg-blue-600 text-white">
            <tr>
              <th class="px-6 py-3 text-left">#</th>
              <th class="px-6 py-3 text-left">Product Name</th>
              <th class="px-6 py-3 text-left">Description</th>
              <th class="px-6 py-3 text-left">Price</th>
              <th class="px-6 py-3 text-left">Quantity</th>
              <th class="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(post, index) in userPosts"
              :key="post.id"
              class="border-b hover:bg-gray-100"
            >
              <td class="px-6 py-3">{{ index + 1 }}</td>
              <td class="px-6 py-3 font-semibold">{{ post.product_name }}</td>
              <td class="px-6 py-3">{{ post.description }}</td>
              <td class="px-6 py-3 text-green-600 font-bold">₹ {{ post.price }}</td>
              <td class="px-6 py-3">{{ post.quantity }}</td>
              <td class="px-6 py-3 flex space-x-4">
                <RouterLink
                  :to="`/posts/update/${post.id}`"
                  title="Edit Product"
                  class="text-blue-600 hover:text-blue-800"
                >
                  ✏️
                </RouterLink>
                <button
                  title="Delete product"
                  class="text-red-600 hover:text-red-800"
                  @click="removeProduct(post)"
                >
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

