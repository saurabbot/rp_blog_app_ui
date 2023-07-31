<template>
    <div>
        <Header />

        <slot />
        <Alert v-if="useGeneralStore().$state.showAlert" />
    </div>
</template>
<script setup>

// onMounted(() => {
//     useGeneralStore().showAlert = true
//     setTimeout(() => {
//         useGeneralStore().showAlert = false
//     }, 3000)
// })

// const { showAlert } = storeToRefs($generalStore)
</script>
