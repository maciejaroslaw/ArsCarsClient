<template>
    <div style="position: absolute; min-width: 100%" class="is-flex pt-6 is-align-items-start is-justify-content-center is-flex-direction-row columns mx-0">
        <form class="box p-6 column is-half">
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                <input v-model="registerCreds.name" :class="[errors.name ? 'is-danger' : '']" class="input" type="text" placeholder="e.g. Jan Kowalski">
                <p v-show="errors.name" class="help is-danger">Namename is wrong</p>
                </div>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                <input v-model="registerCreds.email" :class="[errors.email ? 'is-danger' : '']" class="input" type="text" placeholder="e.g. alex@example.com">
                <p v-show="errors.email" class="help is-danger">Email is wrong</p>
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                <input v-model="registerCreds.password" :class="[errors.password ? 'is-danger' : '']" class="input" type="password" placeholder="********">
                <p v-show="errors.password" class="help is-danger">Password is wrong</p>
                <p v-show="errors.pswdReqs" class="help is-danger pl-2">
                    Password must contain:
                    <ul>
                        <li>- At least 6 symbols</li>
                        <li>- One digit</li>
                        <li>- One special character(@$!%*#?&)</li>
                    </ul>
                </p>
                </div>
            </div>

            <div class="field">
                <label class="label">Confirm password</label>
                <div class="control">
                <input v-model="registerCreds.password_confirm" :class="[errors.password ? 'is-danger' : '']" class="input" type="password" placeholder="********">
                <p v-show="errors.password" class="help is-danger">Passwords dont match</p>
                </div>
            </div>
            <div class="has-text-centered">
                <p class="help is-danger">{{errors.msg}}</p>
            </div>
            <div class="has-text-centered mt-4">
                <button @click="register" :class="[isLoading ? 'is-loading' : '']" class="button is-link is-centered">Sign Up</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import {ref, reactive, inject} from 'vue';
import {useStore} from 'vuex';
import { useRouter } from 'vue-router';



const store = useStore();
const axios = inject('axios');
const api_url = inject('api_url');
const router = useRouter();


let isLoading = ref(false);

const registerCreds = reactive({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
});
const errors = reactive({
    name: false,
    email: false,
    password: false,
    pswdReqs: false,
    msg: '',
});

function register(e){
    e.preventDefault();
    errors.name = false;
    errors.email = false;
    errors.password = false;
    errors.pswdReqs = false;
    errors.msg = '';

    var nameRegex = /(\w+\s+[^-])+\S[^-]+/;
    var pswdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    console.log(emailRegex.test(registerCreds.email))

    if(!nameRegex.test(registerCreds.name) || registerCreds.name.split(' ').length < 2){
        errors.name = true;
    }else if(!emailRegex.test(registerCreds.email)){
        errors.email = true;
    }else if(!pswdRegex.test(registerCreds.password)){
        errors.password = true;
        errors.pswdReqs = true;
    }else if(registerCreds.password != registerCreds.password_confirm){
        errors.password = true;
    }else{
        isLoading.value = true;
        axios.post(`${api_url}/auth/users`, {
            username: registerCreds.name,
            email: registerCreds.email,
            password: registerCreds.password,
        }).then(res=>{
            console.log(res);
            isLoading.value = false;

            axios.post(`${api_url}/auth/login`, {
                email: registerCreds.email,
                password: registerCreds.password,
            }).then(res=>{
                store.dispatch("auth/login", res.data);
                router.push('/');
            })

        }).catch(err=>{
            // console.log(err.response.data.message);
            // this.$store.dispatch('err/setError', err.response.data.message);
            if(err.response.data.message === "name already taken!"){
                errors.name = true;
            }
            store.dispatch("err/setError", err.response.data.message);
            isLoading.value = false;
        });
    }
}

</script>


<style lang="scss" scoped>

</style>