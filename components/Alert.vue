<template>
    <div class="alert-notification bg-green-400 rounded-md text-black font-bold p-4">
        <div class="flex justify-between">
            <span class="font-bold">PeekaBooo!</span>
            <button class="text-white">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
        <p class="mt-2">{{ useGeneralStore().$state.alertMessage }}</p>
    </div>
</template>

<style>
.alert-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
}
</style>
<script setup>
</script>