<template>
    <div class=" rounded-md shadow-xl p-5 w-1/3 ">
        <form class="w-full flex flex-col" @submit.prevent="handleSignin">
            <input v-model="loginUserInput.email" placeholder="Enter email" class="p-2 m-4" />
            <input v-model="loginUserInput.password" placeholder="Enter password" class="p-2 m-4" type="password" />
            <input v-model="loginUserInput.first_name" placeholder="Enter first name" class="p-2 m-4" />
            <input v-model="loginUserInput.last_name" placeholder="Enter last name" class="p-2 m-4" />
            <button v-if="!loading" class="bg-sky-400 p-2 font-normal rounded-md" type="submit">Login</button>
            <div v-if="loading">Loading...</div>
            <div v-if="error">Error occurred while logging in.</div>
        </form>
        <div class="m-5">Already have an accounnt?<nuxt-link class="font-bold mx-4 text-sky-500 cursor-pointer"
                to="/login">Login</nuxt-link> </div>
    </div>
</template>

<script>
const loginMutation = gql`mutation signin($signinUserInput: SigninUserInput!){
  signin(signinUserInput: $signinUserInput){
    user{
      first_name
      last_name
      email
    }
  }
}`;
export default {
    setup() {
        const { mutate, loading, error } = useMutation(loginMutation)
        const loginUserInput = ref({
            email: '',
            password: '',
            first_name: '',
            last_name: '',
        });

        const handleSignin = async () => {
            try {
                const { data } = await mutate({
                    "signinUserInput": {
                        "email": loginUserInput.value.email,
                        "password": loginUserInput.value.password,
                        "first_name": loginUserInput.value.first_name,
                        "last_name": loginUserInput.value.last_name,
                    }
                });

                console.log(data)
                window.location.replace('/login')
            } catch (error) {
                console.error('Login error:', error.message);
            }
        };

        return {
            loginUserInput,
            loading,
            error,
            handleSignin,
        };
    }
}
</script>