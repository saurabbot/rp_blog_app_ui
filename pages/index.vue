<template>
    <div class="p-10">
        <div class="flex justify-end">
            <button @click="showPopup" class="bg-sky-400 p-2 rounded-md m-3 hover:bg-purple-300 duration-500">Add
                Blog</button>

        </div>
        <!-- <div v-if="data.loading">Loading...</div> -->
        <p class="text-lg font-extrabold">Check out these blogs..</p>
        <ul class="grid grid-cols-4 gap-5">
            <li v-for="blog in data.blogs" :key="blog.id">
                <BlogCard :title="blog.title" :content="blog.content" />
            </li>
        </ul>
        <Notification />
        <Popup v-if="isPopupVisible">
            <AddBlogForm :closePopup="hidePopup" />
        </Popup>

    </div>
</template>
  
<script setup >
import { storeToRefs } from 'pinia';
const { $generalStore } = useNuxtApp()
const { isUserLoggedIn } = storeToRefs($generalStore)
const router = useRouter()
const query = gql`
   query Query {
    blogs {
      id
      title
      content
    }
  }
  `;
// if (window.localStorage.getItem("access_token") === null) {
const { data, execute } = !isUserLoggedIn ? useAsyncQuery(query) : {
    data: {
        blogs: []
    }
}
// }
const isPopupVisible = ref(false);
const showPopup = () => {
    isPopupVisible.value = true;
};
const hidePopup = () => {
    isPopupVisible.value = false;
};
watch(isPopupVisible, () => {
    execute();
});
onMounted(async () => {
    if (window.localStorage.getItem("access_token") === null) {
        router.push('/login')
    }
})


</script>
  
  