<template>
    <div class="p-10">
        <div class="flex justify-end">
            <button @click="showPopup" class="bg-sky-400 p-2 rounded-md m-3 hover:bg-purple-300 duration-500">Add
                Blog</button>

        </div>
        <span class="font-bold text-4xl">Hi,{{ useUserStore().$state.first_name }}</span>
        <p class="text-lg font-extrabold">Check out these blogs..</p>
        <div v-if="useUserStore().$state.blogsData?.errors" class="p-4 text-center text-5xl">
            Session Expired, logout and try again
        </div>
        <ul class="grid grid-cols-4 gap-5">
            <li v-for="blog in useUserStore().$state.blogsData.data?.blogs" :key="blog.id">
                <BlogCard :title="blog.title" :content="blog.content" :name="blog.User.first_name"
                    :date="blog.created_at" />
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
const getBlogs = async () => {
    await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
            query: `
              query Query {
                blogs {
                  id
                  title
                  content
                  created_at
                  User {
                    id
                    first_name
                    last_name
                  }
                }
              }
            `,
        }),
    }).then(res => res.json()).then(data => {
        if (data.errors) {
            useGeneralStore().$state.isUserLoggedIn = false
            setTimeout(() => {
                window.localStorage.removeItem("access_token");
                router.push('/login')
            }, 3000)
        }
        useUserStore().$state.blogsData = data
    })
}
getBlogs()

const router = useRouter()
const isPopupVisible = ref(false);
const showPopup = () => {
    isPopupVisible.value = true;
};
const hidePopup = () => {
    isPopupVisible.value = false;
};
watch(isPopupVisible, () => {
    getBlogs()
});
onMounted(async () => {
    if (window.localStorage.getItem("access_token") === null) {
        useGeneralStore().$state.isUserLoggedIn = false
        router.push('/login')
    } else {
        useGeneralStore().$state.isUserLoggedIn = true
        const accessToken = window.localStorage.getItem("access_token")
        const decodedToken = jwt_decode(accessToken)
        console.log(decodedToken, 'id')
        useUserStore().$state.id = decodedToken.sub
        useUserStore().$state.first_name = decodedToken.email.split('@')[0]
    }
})


</script>
  
  