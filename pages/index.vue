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
import jwt_decode from "jwt-decode";

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
const { data, error, execute } = useAsyncQuery(query)
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
        useGeneralStore().$state.isUserLoggedIn = false
        router.push('/login')
    } else {
        useGeneralStore().$state.isUserLoggedIn = true
        const accessToken = window.localStorage.getItem("access_token")
        const decodedToken = jwt_decode(accessToken)
        console.log(decodedToken.sub, 'id')
        useUserStore().$state.id = decodedToken.sub
        execute()
    }
})


</script>
  
  