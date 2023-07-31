<template>
    <div class="">
        <div class="flex justify-between">
            <span class="text-3xl">
                Add Blog
            </span>
            <button @click="closePopup" class="bg-red-500 p-2 rounded-xl text-white m-3 hover:bg-red-300 duration-500">
                X
            </button>
        </div>

        <form class="w-full  flex flex-col" @submit.prevent="handleSubmit">
            <input v-model="addBlogInput.title" placeholder="Enter title"
                class="p-2 m-6 border border-sky-500 rounded-md " />
            <input v-model="addBlogInput.content" placeholder="Enter content"
                class="p-2 m-6 border border-sky-500 rounded-md " />
            <button v-if="!loading" class="bg-sky-400 p-2  m-6 font-normal rounded-md" type="submit">Add blog</button>

            <div v-if="loading">Loading...</div>
            <div v-if="error">Error occurred while logging in.</div>
        </form>

    </div>
</template>

<script lang="ts" setup>
const props = defineProps(['closePopup'])
const { closePopup } = toRefs(props)
const addBlogMutation = gql`mutation Mutation($createBlogInput: CreateBlogInput!){
  createBlog(createBlogInput: $createBlogInput){
    id
    title
    content
  }
}`
const { mutate, loading, error } = useMutation(addBlogMutation)
const addBlogInput = ref({
    title: '',
    content: ''
})
const handleSubmit = async () => {
    try {
        const { data } = await mutate({
            "createBlogInput": {
                "title": addBlogInput.value.title,
                "content": addBlogInput.value.content,
                "user_id": 4
            }
        })
        console.log(data)
        closePopup?.value()

    } catch (err) {
        console.error(err)
    }
}
    
</script>