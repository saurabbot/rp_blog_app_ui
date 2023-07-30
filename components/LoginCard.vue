<template>
    <div class=" rounded-md shadow-xl p-5 w-1/3 ">
        <form class="w-full flex flex-col" @submit.prevent="handleLogin">
            <input id="email" v-model="loginUserInput.email" placeholder="Enter email" class="p-2 m-4" />
            <input v-model="loginUserInput.password" placeholder="Enter password" class="p-2 m-4" type="password" />
            <button v-if="!loading" class="bg-sky-400 p-2 font-normal rounded-md" type="submit">Login</button>
            <div v-if="loading">Loading...</div>
            <div v-if="error">Error occurred while logging in.</div>
        </form>
        <div class="m-5">Dont have an account?<nuxt-link class="font-bold mx-4 text-sky-500 cursor-pointer" to="/signin">Register</nuxt-link> </div>
    </div>
</template>

<script>
const loginMutation = gql`mutation login($loginUserInput: LoginUserInput!) {
  login(loginUserInput: $loginUserInput) {
    user {
      first_name
      last_name
      email
    }
    access_token
  }
}`;
export default {
    setup() {
        const { mutate, loading, error } = useMutation(loginMutation)
        const loginUserInput = ref({
            email: '',
            password: '',
        });
        // const email = ref('');
        // const password = ref('');
        const handleLogin = async () => {
            try {
                // Call the login mutation and pass loginUserInput as variables
                const { data } = await mutate({
                    "loginUserInput": {
                        "email": loginUserInput.value.email,
                        "password": loginUserInput.value.password
                    }
                });

                // Handle the response data
                const { user, access_token } = data.login;
                window.localStorage.setItem("access_token", access_token)
                console.log('Logged in user:', user);
                console.log('Access token:', access_token);
                window.location.replace('/')

                // Perform any necessary actions after successful login
                // For example, you might want to redirect the user to the dashboard page
            } catch (error) {
                console.error('Login error:', error.message);
                // Handle the error (e.g., display an error message to the user)
            }
        };

        return {
            loginUserInput,
            loading,
            error,
            handleLogin,
        };
    }
}
</script>