<template>
    <div style="position: absolute; min-width: 100%" class="is-flex pt-6 is-align-items-start is-justify-content-center is-flex-direction-row columns mx-0 Popins has-text-weight-semibold">
        <form @submit.prevent="login" class="box p-6 column is-half">
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                <input v-model="loginCreds.email" class="input" type="username" placeholder="e.g. alex@example.com">
                </div>
            </div>

            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                <input v-model="loginCreds.password" class="input" type="password" placeholder="********">
                </div>
            </div>

            <div class="has-text-centered">
                <button :class="[isLoading ? 'is-loading' : '']" class="button is-link is-centered">Sign in</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const axios = inject('axios');
const api_url = inject('api_url');
const router = useRouter();

let isLoading = ref(false);

const loginCreds = reactive({
    email: '',
    password: '',
})

function login(){
    isLoading.value = true;
    
    axios.post(`${api_url}/auth/login`, {
        email: loginCreds.email,
        password: loginCreds.password,
    }).then(res=>{
        store.dispatch("auth/login", res.data);
        router.push('/');
    }).catch(err=>{
        store.dispatch('err/setError', "Credentials invalid");
        isLoading.value = false;
    })
}
</script>

<style lang="scss" scoped>

</style>