<template>
    <div class="modal delete-task-modal is-clipped" :class="[modalDelCar ? 'is-active': '']">
      <div class="modal-background"></div>
      <div class="modal-content">
          <div class="box">
              <div class="block content">
                  <h1>Delete this car?</h1>
                  <div class="is-flex is-justify-content-space-between mt-4">
                      <button @click.prevent="emit('closeModal')" class="button is-danger">No</button>
                      <button @click.prevent="deleteCar" class="button is-success">Yes</button>
                  </div>
              </div>
          </div>
      </div>
      <button @click="emit('closeModal')" class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script setup>
import { inject } from 'vue';
import {useStore} from 'vuex';



const props = defineProps({
    modalDelCar: Boolean,
    carToDelete: Object
});

let emit = defineEmits(['closeModal', 'refreshCars']);

const axios = inject('axios');
const store = useStore();
const token = inject('token');
const api_url = inject('api_url');


function deleteCar(){
  axios.delete(`${api_url}/cars/${props.carToDelete.id}`, {headers: token()}).then(res=>{
    emit('refreshCars');
    emit('closeModal');
  }).catch(err=>{
    store.dispatch("err/setError", err.response.data.message);
  })
}
</script>

<style lang="scss" scoped>

</style>