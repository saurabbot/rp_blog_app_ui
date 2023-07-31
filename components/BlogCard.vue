<template>
    <div class=" flex flex-col justify-between p-3 shadow-lg rounded-xl m-5 cursor-pointer duration-500 hover:translate-y-2 min-h-full">
        <div class="flex justify-between text-slate-500">
            <span>By Richard</span>
            <span>27/03/2023</span>
        </div>
        <!-- <div class="font-bold ">The Brain of Introvert</div>
        <div>The introverts brain treats interactions with people at the same intensity level that it and encounters with
            inanimate objects
        </div> -->
        <div class="font-bold ">{{ title }}</div>
        <div>{{ content }}
        </div>

    </div>
</template>
<script>
export default {
    props: {
        title: String,
        content: String,
    },
};
</script>