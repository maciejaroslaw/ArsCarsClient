/* eslint-disable no-undef */
<template>
    <div class="modal edit-car-modal is-clipped" :class="[isOpen ? 'is-active': '']">
      <div class="modal-background"></div>
      <div class="modal-content">
          <div class="box">
            <div class="block content">
                <div>
                  <label class="label">Producer</label>
                  <input class="input is-large" type="text" v-model="car.producer" placeholder="Audi">
                </div>
                <div class="mt-4">
                  <label class="label">Model</label>
                  <input class="input is-normal w-1/2" type="text" v-model="car.model" placeholder="A4">
                </div>
                <div class="mt-4">
                 <label class="label">Year of production</label>
                 <input class="input is-normal w-1/2" type="number" v-model="car.year" placeholder="2015">
                </div>
                <div class="mt-4">
                  <label class="label">Mileage(km)</label>
                  <input class="input is-normal w-1/2" type="number" v-model="car.mileage" placeholder="120000">
                </div>
                <div class="mt-4">
                  <label class="label">Date of entry to ArsCars</label>
                  <input class="input is-normal w-1/2" type="date" v-model="car.date_of_entry" placeholder="21.12.1999">
                </div>
                <div>
                  <div class="is-flex is-justify-content-space-between mt-4">
                      <button @click.prevent="emit('closeModal')" class="button is-danger">Discard changes</button>
                      <button @click.prevent="AddOrEdit" class="button is-success">Save</button>
                  </div>
                </div>
            </div>
          </div>
      </div>
      <button class="modal-close is-large" @click="emit('closeModal')" aria-label="close"></button>
    </div>
</template>

<script setup>
import {computed, inject} from 'vue';
import {useStore} from 'vuex';

const axios = inject('axios');
const token = inject('token');
const api_url = inject('api_url');
const store = useStore();

const props = defineProps({
    CarToEdit: Object,
    isOpen: Boolean,
});

const emit = defineEmits(['update:carValue', 'closeModal', 'refreshCars']);

const car = computed({
    get: () => {
        if(props.CarToEdit){
            return props.CarToEdit
        }else{
            return {
                id: 0,
                producer: '',
                model: '',
                year: 0,
                mileage: 0,
                date_of_entry: '',
            }
        }
    },
    set: (val) => {
        emit('update:carValue', val);
    }
});

function AddOrEdit(){
	let data = new Date();
	let date_of_entry = new Date(car.value.date_of_entry)
	console.log(date_of_entry.getTime());
	if(car.value.producer === ''){
		store.dispatch("err/setError", "producer cannot be empty value")
	}else if(car.value.model === ""){
		store.dispatch("err/setError", "model cannot be empty value")
	}else if(car.value.year < 1900 || car.value.year > data.getFullYear()){
		store.dispatch("err/setError", "wrong year of production");
	}else if(car.value.mileage < 0){
		store.dispatch("err/setError", "Mileage cannot be lower than 0!");
	}else if(isNaN(date_of_entry.getTime()) || date_of_entry.getTime() >= data.getTime() || date_of_entry.getFullYear() < 1970){
		store.dispatch("err/setError", "wrong date of entry");
	}else{
		if(car.value.id === 0){
			axios.post(`${api_url}/cars`, {newCar: car.value}, {headers: token()}).then(()=>{
				emit('closeModal');
				store.dispatch("err/setError", "You added new Car!");
				emit('refreshCars');
			}).catch(err=>{
				console.log(err);
				store.dispatch("err/setError", err.response.data.message);
			})
		}else{
			axios.put(`${api_url}/cars/${car.value.id}}`, {
				car,
			}, {headers: token()}).then(()=>{
				emit('closeModal');
				emit('refreshCars');
			}).catch(err=>{
				console.log(err);
				store.dispatch("err/setError", err.response.data.message);
			})
		}
	}
}
</script>

<style lang="scss" scoped>

</style>