<template>
    <div>
        <span @click="toggleDrawer">
            <img class="h-6" src="https://img.icons8.com/?size=512&id=11642&format=png" />
            <span class="absolute top-1 bg-yellow-300 text-xs rounded-full p-1">{{ data?.alerts?.length }}</span>
        </span>
        <div v-if="showDrawer"
            class="overflow-auto bg-white border border-slate-500 fixed z-50 cursor-pointer w-1/5 h-1/2 rounded-md p-2 shadow-lg">
            <div class="text-black font-bold">Notifications</div>
            <div class="flex flex-col" v-show="data">
                <div v-if="data?.alerts?.length > 0">
                    <div v-for="alert in data?.alerts" :key="alert.id"
                        class="m-1 flex font-normal text-slate-400 bg-slate-200 text-center border rounded border-slate-200 p-2"
                        @click="handleMarkedAsRead(alert.id)">
                        <img class="h-6 mx-2" src="https://img.icons8.com/?size=512&id=21063&format=png" />
                        {{ alert.message }}
                    </div>
                </div>
                <div v-else>No alerts</div>
            </div>
        </div>
    </div>
</template>
<style></style>
    
<script setup>
const mutationQuery = gql`
    mutation Mutation($updateAlertInput: UpdateAlertInput!) {
      updateAlert(updateAlertInput: $updateAlertInput) {
        id
        created_at
        message
      }
    }
  `;
const stateUserId = useUserStore().$state.id
const variables = { userId: stateUserId }
const query = gql`
 query Query {
  alerts(userId: ${stateUserId}) {
    id
    message
    isViewed
    sender_id
    blog_id
  }
}
`;
watch(stateUserId, () => {
    refresh()
})
const { refresh, data, execute } = useAsyncQuery(query, variables);

const { mutate, loading, error } = useMutation(mutationQuery);

const handleMarkedAsRead = (alertId) => {
    try {
        const variables = { updateAlertInput: { id: alertId } };
        mutate(variables);
        toggleDrawer()
    } catch (err) {
        console.log(err);
    }
};

const showDrawer = ref(false);

watch(showDrawer, () => {
    execute();
});

function toggleDrawer() {
    showDrawer.value = !showDrawer.value;
}
</script>
  