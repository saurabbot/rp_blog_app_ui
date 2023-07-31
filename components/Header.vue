<template>
    <div class="flex justify-between shadow-md p-3 rounded-md">
        <div class="  font-bold text-3xl text-sky-500 items-center">
            RP_Blogs
        </div>
        <div class=" w-1/5 flex justify-between items-center font-bold text-lg text-sky-500">
            <!-- <span>Notifcation</span> -->

            <div class="flex justify-between items-center  w-full" v-show="isLoggedIn">
                <NotificationDrawer />
                <span @click="logoutUser"
                    class=" border bg-red-400 text-black border border-black p-1 rounded-lg cursor-pointer duration-200 hover:bg-sky-300 hover:text-white">Logout</span>
            </div>

            <div v-if="!isLoggedIn"
                class="border border-sky-300 p-1 rounded-md cursor-pointer duration-200 hover:bg-sky-300 hover:text-white">
                Login</div>

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