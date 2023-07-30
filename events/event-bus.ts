import { reactive } from "vue";

const eventBus = reactive({
  refreshBlogs: false,
});

export default eventBus;
