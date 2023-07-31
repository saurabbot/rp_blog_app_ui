<template>
    <div>
        <Header />

        <slot />
        <Alert v-if="useGeneralStore().$state.showAlert" />
    </div>
</template>
<script setup>

</script>
