<template>
  <div>
    <cars-table :cars="cars" />
  </div>
</template>

<script setup>
import CarsTable from '../components/CarsTable.vue';
import { ref, inject, onMounted} from 'vue';
import {useStore} from 'vuex';

const axios = inject('axios');
const token = inject('token');
const api_url = inject('api_url');
const store = useStore();

const cars = ref([]);

function getCars(){
  if(store.state.auth.user){
    axios.get(`${api_url}/cars`, {headers: token()}).then(res=>{
      cars.value = res.data.cars;
    }).catch(err=>{
      store.dispatch("err/setError", err.response.data.message);
    })
  }
}

onMounted(() => {
  getCars();
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
