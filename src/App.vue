<template>
  <div>
    <NavBar />
    
    <div class="container">
      <div class="mb-10">
        <div v-if="!currentUser" class="text-center">
          <h2 class="subtitle is-4 pl-2">ArsCars <br>
            <router-link to="/register" >
                Sign Up
            </router-link>
            <span class="is-size-6">Or 
                <router-link to="/login">
                Log in
                </router-link>
            </span>
          </h2>
        </div>
        <div v-else>
            <h2 class="no-margin text-5xl text-[#485fc7] pl-2">Hi!,
            <span class="is-size-6">
                {{currentUser.username.split(" ")[0]}}                        
            </span>
            </h2>
        </div>
      </div>
      <router-view v-slot="{Component, route}">
        <transition
          :enter-active-class="route.meta.enterClass"
          :leave-active-class="route.meta.leaveClass"
        >
          <component :is="Component" />
        </transition>
      </router-view>
      <div class="modal err" :class="[isErr ? 'is-active': '']">
          <div class="modal-background"></div>
          <div class="modal-content">
              <div class="box">
                  <div class="block content">
                      <h1 class="has-text-centered py-6">{{errMsg}}</h1>
                      <div class="is-flex is-justify-content-center mt-6">
                          <button @click.prevent="errOff" class="button is-info">Ok</button>
                      </div>
                  </div>
              </div>
          </div>
          <button @click.prevent="errOff" class="modal-close is-large" aria-label="close"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import { useStore } from 'vuex';
import { computed, onMounted, inject, ref } from 'vue';

const store = useStore();
const axios = inject('axios');
const token = inject('token');
const api_url = inject('api_url');

const cars = ref([]);

const currentUser = computed(() => store.state.auth.user);
const errMsg = computed(() => store.state.err.errMsg);
const isErr = computed(() => store.state.err.isErr);

function errOff(){
  store.dispatch('err/errOff');
};

onMounted(()=>{
  console.log(currentUser);
})


// provide('', () => {
//     let user = JSON.parse(localStorage.getItem('user'));
//     if(user && user.accessToken){
//         return {'x-access-token': user.accessToken};
//     }else{
//         return {}
//     }
// })
</script>

<style>
.router-link-active{
  color: #4a4a4a;
}
</style>
