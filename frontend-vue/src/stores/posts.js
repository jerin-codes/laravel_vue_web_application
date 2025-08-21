import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const usePostsStore = defineStore("postsStore", {
  state: () => {
    return {
      errors: {},
    };
  },
  actions: {
    /******************* Get all posts *******************/
    async getAllPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();

      console.log("Product data",data)
      return data;
    },
    /******************* Get a post *******************/
    async getPost(post) {
     

      const res = await fetch(`/api/posts/${post}`);
      const data = await res.json();
       console.log("hello world",data)
      
      return data;
    },
    /******************* Create a post *******************/
    async createPost(formData) {
      console.log("Im here")
      const res = await fetch("/api/posts", {
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.errors) {
        this.errors = data.errors;
      } else {
        
        this.router.push({ name: "home" });
      
        this.errors = {}
      }
    },
    /******************* Delete a post *******************/
    async deletePost(post) {
      const authStore = useAuthStore();
      if (authStore.user.id === post.user_id) {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: "delete",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          this.router.push({ name: "home" });
        }
        console.log(data);
      }
    },
    /******************* Update a post *******************/
async updatePost(user_id,post_id,formData) {
  const authStore = useAuthStore();
  console.log("reached",user_id,post_id,formData)

  if (authStore.user.id !== user_id) {
    console.error("Unauthorized: You can only update your own posts");
    return;
  }

  try {
    console.log("reached",user_id,post_id)
    const res = await fetch(`/api/posts/${post_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    if(res.ok){
      this.router.push({ name: "home" });
    }
    

    const data = await res.json();
     

    if (data.errors) {
      this.errors = data.errors;
    } else {
      this.errors = {};
      return data; // ✅ return updated post data to component
    }
    
  } catch (err) {
    console.error("Update failed:", err);
  }
},

  },
});
