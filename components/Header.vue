<template>
    <div class="flex justify-between shadow-md p-3 rounded-md">
        <div class="  font-bold text-3xl text-blue-600 items-center">
            RP_Blogs
        </div>
        <div class=" w-1/4 flex justify-between items-center font-bold text-lg text-blue-600">
            <!-- <span>Notifcation</span> -->
            <NotificationDrawer />
            <nuxt-link v-if="!isLoggedIn" to="/login">Login</nuxt-link>
            <span v-else @click="logoutUser" class="cursor-pointer">Logout</span>
        </div>
    </div>
</template>
<script>
import { isLoggedIn } from "~/auth";

export default {
    setup() {
        const isLoggedInValue = ref(isLoggedIn()); // Call the isLoggedIn function to set the initial value
        const logoutUser = () => {
            if (typeof window !== "undefined") {
                window.localStorage.removeItem("access_token");
                window.location.reload() // Remove the access_token from localStorage
                // isLoggedInValue.value = false; // Update the isLoggedIn state to false
            }
        };
        return {
            isLoggedIn: computed(() => isLoggedInValue.value), // Use computed property for reactivity
            logoutUser,
        };
    },
}

</script>