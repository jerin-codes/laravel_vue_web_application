<script setup>
import { useAuthStore } from "@/stores/auth";
import { usePostsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const { user } = storeToRefs(useAuthStore());
const { errors } = storeToRefs(usePostsStore());
const { getPost, updatePost } = usePostsStore();

const post = ref(null);
const user_id = ref(null);
const post_id = ref(null);

const formData = reactive({
  product_name: "",
  description: "",
  price: "",
  quantity: "",
});

// Loader state
const loading = ref(false);

onMounted(async () => {
  post.value = await getPost(route.params.id);
  user_id.value = post.value.user_id;
  post_id.value = post.value.id;

  formData.product_name = post.value.product_name;
  formData.description = post.value.description;
  formData.price = post.value.price;
  formData.quantity = post.value.quantity;
});

// Handle form submission with loader
async function handleUpdate() {
  loading.value = true;
  await updatePost(user_id.value, post_id.value, formData);
  // loading.value = false;
}
</script>


<template>
  <main class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div class="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
      <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">
         Update Product Product
      </h1>

      <form @submit.prevent="handleUpdate" class="space-y-6">

       
        <div>
          <label class="block text-gray-700 font-medium mb-1">Product Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            v-model="formData.product_name"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name[0] }}</p>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            rows="4"
            placeholder="Enter product description"
            v-model="formData.description"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          ></textarea>
          <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description[0] }}</p>
        </div>

        <!-- Price -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Price ($)</label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter product price"
            v-model="formData.price"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          <p v-if="errors.price" class="text-red-500 text-sm mt-1">{{ errors.price[0] }}</p>
        </div>

        <!-- Quantity -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Quantity</label>
          <input
            type="number"
            placeholder="Enter product quantity"
            v-model="formData.quantity"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          <p v-if="errors.quantity" class="text-red-500 text-sm mt-1">{{ errors.quantity[0] }}</p>
        </div>

         <button
    type="submit"
    :disabled="loading"
    class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl shadow-lg transition duration-300 flex items-center justify-center"
  >
   
    <span
      v-if="loading"
      class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
    ></span>
    {{ loading ? "Updating..." : "Update Product" }}
  </button>
      </form>
    </div>
  </main>
</template>
