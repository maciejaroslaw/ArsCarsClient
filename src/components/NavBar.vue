<template>
    <nav class="navbar is-transparent has-text-weight-semibold" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <!-- <router-link to="/" class="navbar-item is-size-2">
                Car Catalog
            </router-link> -->
            <div  class="hello block pt-4 pl-4">
                <div v-if="!currentUser">
                    <h1 class="title is-1">Welcome</h1>
                    <h2 class="subtitle is-4 pl-2 no-margin">Please 
                    <router-link to="/register" class="">
                        Sign Up
                    </router-link>
                    <span class="is-size-6">Or 
                        <router-link to="/login">
                        Log in
                        </router-link>
                    </span>
                    </h2>
                </div>
            </div>
            <a @click="menuActive = !menuActive" role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div :class="[menuActive ? 'is-active' : '', ]" class="navbar-menu">
            <div class="navbar-start">
            </div>

            <div class="navbar-end">
                <div v-if="!currentUser" class="navbar-item">
                    <div class="buttons">
                        <router-link to="/register" class="button is-link">
                            <strong>Sign up</strong>
                        </router-link>
                        <router-link to="/login" class="button is-light">
                            Log in
                        </router-link>
                    </div>
                </div>
                <div v-else class="navbar-item"> 
                    <a @click.prevent="logout" class="button is-light">
                        Logout
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import {ref} from 'vue'
export default {
    name: 'NavBar',
    setup () {
        const menuActive = ref(false);

        return {menuActive}
    },
    computed: {
        currentUser(){
            return this.$store.state.auth.user;
        },
        isAdmin(){
            if(this.currentUser){
                return this.currentUser.role === "admin"
            }else{
                return false;
            }
        }
    },
    methods: {
        logout(){
            this.$store.dispatch('auth/logout');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>