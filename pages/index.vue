<template>
    <div>
        <div class="flex justify-end">
            <button @click="showPopup" class="bg-sky-400 p-2 rounded-md m-3 hover:bg-purple-300 duration-500">Add
                Blog</button>

        </div>
        <div v-if="data.loading">Loading...</div>
        <div v-else class="p-3">
            <p class="text-lg font-extrabold">Blog Titles:</p>
            <ul class="grid grid-cols-4 gap-5">
                <li v-for="blog in data.blogs" :key="blog.id">
                    <BlogCard :title="blog.title" :content="blog.content" />
                </li>
            </ul>
        </div>
        <Popup v-if="isPopupVisible">
            <AddBlogForm :closePopup="hidePopup" />
            <!-- <button @click="hidePopup">Close Popup</button> -->
        </Popup>

    </div>
</template>
  
<script >


const query = gql`
   query Query {
    blogs {
      id
      title
      content
    }
  }
  `;

export default {
    setup() {

        const { data } = useAsyncQuery(query);

        const isPopupVisible = ref(false);

        const showPopup = () => {
            isPopupVisible.value = true;
        };

        const hidePopup = () => {
            isPopupVisible.value = false;
        };

        return {
            isPopupVisible,
            showPopup,
            hidePopup,
            data,

        };

    },
};
</script>
  
  