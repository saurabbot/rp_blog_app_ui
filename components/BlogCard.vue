<template>
    <div
        class=" flex flex-col justify-between p-3 shadow-lg rounded-xl m-5 cursor-pointer duration-500 hover:translate-y-2 min-h-full">
        <div class="flex justify-between text-slate-500">
            <span>By {{ name }}</span>
            <span>{{ date.split('T')[0] }}</span>
        </div>

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
        name: String,
        date: String
    },
};
</script>