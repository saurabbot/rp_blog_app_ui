<!-- <script>
import { io } from 'socket.io-client';

export default {
    data() {
        return {
            notification: null,
        };
    },
    created() {
        this.socket = io('http://localhost:3000');

        this.socket.on('blogCreated', (blogData) => {
            alert(`${blogData.User.first_name} created a new blog`)
        });
    },
    beforeDestroy() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
};

</script> -->

<template>
    <div>
        <!-- Display existing notifications -->
        <div v-for="notification in existingNotifications" :key="notification.id" class="notification">
            Existing blog: {{ notification.title }}
        </div>

        <!-- Display real-time notification -->
        <!-- <div v-if="realTimeNotification" class="notification">
            New blog created: {{ realTimeNotification.title }}
        </div> -->
    </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
    data() {
        return {
            socket: null,
            realTimeNotification: null,
        };
    },
    computed: {
        existingNotifications() {
            return this.notifications;
        },
    },
    created() {
        this.socket = io('http://localhost:3000');

        this.notifications = [];

        this.socket.on('blogCreated', (blogData) => {
            if (useUserStore().$state.id !== blogData.User.id) {
                useGeneralStore().showAlert = true
                useGeneralStore().alertMessage = `${blogData.User.first_name} posted a blog`
            }
            setTimeout(() => {
                useGeneralStore().showAlert = false
                useGeneralStore().alertMessage = ''
            }, 3000)
            this.notifications.push(blogData);
            this.realTimeNotification = blogData;
        });
    },
    beforeDestroy() {
        if (this.socket) {
            this.socket.off('blogCreated');
            this.socket.disconnect();
        }
    },
};
</script>

<style>
.notification {}
</style>
