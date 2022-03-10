<template>
<div v-if="currentUser">
    <cars-table @addCar="modalAddCar = true" @delCar="handleDel" @editCar="handleEdit" :cars="cars" />
    <div class="modal edit-car-modal is-clipped" :class="[modalEditCar ? 'is-active': '']">
      <div class="modal-background"></div>
      <div class="modal-content">
          <div class="box">
            <div class="block content">
                <div>
                  <label class="label">Producer</label>
                  <input class="input is-large" type="text" v-model="carToEdit.producer" placeholder="Large input">
                </div>
                <div class="mt-4">
                  <label class="label">Model</label>
                  <input class="input is-normal w-1/2" type="text" v-model="carToEdit.model" placeholder="Normal input">
                </div>
                <div class="mt-4">
                 <label class="label">Year of production</label>
                 <input class="input is-normal w-1/2" type="number" v-model="carToEdit.year" placeholder="Normal input">
                </div>
                <div class="mt-4">
                  <label class="label">Mileage(km)</label>
                  <input class="input is-normal w-1/2" type="number" v-model="carToEdit.mileage" placeholder="Normal input">
                </div>
                <div class="mt-4">
                  <label class="label">Date of entry to ArsCars</label>
                  <input class="input is-normal w-1/2" type="date" v-model="carToEdit.date_of_entry" placeholder="Normal input">
                </div>
                <div>
                  <div class="is-flex is-justify-content-space-between mt-4">
                      <button @click.prevent="modalEditCar = false" class="button is-danger">Discard changes</button>
                      <button @click.prevent="editCar" class="button is-success">Save</button>
                  </div>
                </div>
            </div>
          </div>
      </div>
      <button class="modal-close is-large" @click="modalEditCar = false" aria-label="close"></button>
    </div>
    <div class="modal add-car-modal is-clipped" :class="[modalAddCar ? 'is-active': '']">
      <div class="modal-background"></div>
      <div class="modal-content">
          <div class="box">
            <div class="block content">
                <div>
                  <label class="label">Producer</label>
                  <input class="input is-large" type="text" v-model="newCar.producer">
                </div>
                <div class="mt-4">
                  <label class="label">Model</label>
                  <input class="input is-normal w-1/2" type="text" v-model="newCar.model">
                </div>
                <div class="mt-4">
                <label class="label">Year of production</label>
                <input class="input is-normal w-1/2" type="number" v-model="newCar.year" placeholder="2015">
                </div>
                <div class="mt-4">
                  <label class="label">Mileage(km)</label>
                  <input class="input is-normal w-1/2" type="number" v-model="newCar.mileage" >
                </div>
                <div class="mt-4">
                  <label class="label">Date of entry to ArsCars</label>
                  <input class="input is-normal w-1/2" type="date" v-model="newCar.date_of_entry">
                </div>
                <div>
                  <div class="is-flex justify-center mt-4">
                      <!-- <button @click.prevent="modalAddCar = false" class="button is-danger"></button> -->
                      <button @click.prevent="addCar" class="button is-success ">Save</button>
                  </div>
                </div>
            </div>
          </div>
      </div>
      <button class="modal-close is-large" @click="modalAddCar = false" aria-label="close"></button>
    </div>
    <div class="modal delete-task-modal is-clipped" :class="[modalDelCar ? 'is-active': '']">
      <div class="modal-background"></div>
      <div class="modal-content">
          <div class="box">
              <div class="block content">
                  <h1>Delete this car?</h1>
                  <div class="is-flex is-justify-content-space-between mt-4">
                      <button @click.prevent="modalDelCar = !modalDelCar" class="button is-danger">No</button>
                      <button @click.prevent="deleteCar" class="button is-success">Yes</button>
                  </div>
              </div>
          </div>
      </div>
      <button @click="modaDeleteTask = !modaDeleteTask" class="modal-close is-large" aria-label="close"></button>
    </div>
</div>
<div v-else>
  <div class="fog"></div>
  <div class="grid grid-cols-3 gap-4">
    <div v-for="car in dummyCars" :key="car.id" class="card group">
        <header class="card-header"></header>
        <div class="card-content pt-4 pl-4">
            <div class="content">
                <div>
                    <div class="text-3xl">
                        {{car.producer}}
                        <span class="text-lg">{{car.model}}</span>
                    </div>
                    <div class="mt-5">
                        <div>
                            Year: <span>{{car.year}}</span>
                        </div>
                        <div class="mt-2">
                            Mileage: <span>{{car.mileage}}</span>km
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="card-footer opacity-0 group-hover:opacity-100 duration-300">
            <a @click="editCar(car)" href="#" class="card-footer-item">Edit</a>
            <a @click="delCar(car)" href="#" class="card-footer-item">Delete</a>
        </footer>
    </div>
  </div>
</div>
</template>

<script setup>
import CarsTable from '../components/CarsTable.vue';
import { ref, reactive, inject, onMounted, computed} from 'vue';
import {useStore} from 'vuex';

const currentUser = computed(() => store.state.auth.user);

const axios = inject('axios');
const token = inject('token');
const api_url = inject('api_url');
const store = useStore();

const dummyCars = ref([{"id":1,"producer":"Ford","model":"Five Hundred","year":2007,"date_of_entry":"2009-03-05","mileage":27763},
{"id":2,"producer":"Pontiac","model":"Bonneville","year":1987,"date_of_entry":"1984-10-06","mileage":37362},
{"id":3,"producer":"Dodge","model":"Ram Van 2500","year":2002,"date_of_entry":"2003-06-13","mileage":17125},
{"id":4,"producer":"Lamborghini","model":"Diablo","year":1998,"date_of_entry":"1985-07-22","mileage":34965},
{"id":5,"producer":"Infiniti","model":"G37","year":2008,"date_of_entry":"1971-05-11","mileage":28699},
{"id":6,"producer":"Ford","model":"Taurus","year":2001,"date_of_entry":"2005-03-28","mileage":34955},
{"id":7,"producer":"Mazda","model":"B-Series","year":1991,"date_of_entry":"1995-02-16","mileage":7615},
{"id":8,"producer":"Maserati","model":"430","year":1991,"date_of_entry":"1980-05-13","mileage":27717},
{"id":9,"producer":"Mercedes-Benz","model":"Sprinter 3500","year":2011,"date_of_entry":"2010-01-04","mileage":32561},
{"id":10,"producer":"Suzuki","model":"Vitara","year":1999,"date_of_entry":"1972-08-15","mileage":27972}])

const cars = ref([]);

const modalEditCar = ref(false);
const modalDelCar = ref(false);
const modalAddCar = ref(false);

const newCar = reactive({
  producer: '',
  model: '',
  year: Number,
  mileage: 0,
  date_of_entry: '',
});

const carToEdit = reactive({
  id: 0,
  producer: '',
  model: '',
  year: 0,
  mileage: 0,
  date_of_entry: '',
});
let carToDelete = reactive({
  id: 0,
})


function getCars(){
  if(store.state.auth.user){
    axios.get(`${api_url}/cars`, {headers: token()}).then(res=>{
      cars.value = res.data.cars;
    }).catch(err=>{
      store.dispatch("err/setError", err.response.data.message);
    })
  }
}

function handleEdit(car){
  carToEdit.id = car.id
  carToEdit.producer = car.producer;
  carToEdit.model = car.model;
  carToEdit.year = car.year;
  carToEdit.mileage = car.mileage;
  carToEdit.date_of_entry = car.date_of_entry;

  modalEditCar.value = true;
};
function handleDel(car){
  modalDelCar.value = true;
  carToDelete.id = car.id
}


function addCar(){
  let data = new Date();
  let date_of_entry = new Date(newCar.date_of_entry)
  console.log(date_of_entry);
  if(newCar.producer === ''){
    store.dispatch("err/setError", "producer cannot be empty value")
  }else if(newCar.model === ""){
    store.dispatch("err/setError", "model cannot be empty value")
  }else if(newCar.year < 1900 || newCar.year > data.getFullYear()){
    store.dispatch("err/setError", "wrong year of production");
  }else if(newCar.mileage < 0){
    store.dispatch("err/setError", "Mileage cannot be lower than 0!");
  }else if(isNaN(date_of_entry.getTime()) || date_of_entry.getTime() >= data.getTime() || date_of_entry.getFullYear() < 1970){
    store.dispatch("err/setError", "wrong date of entry");
  }else{
    axios.post(`${api_url}/cars`, {
      newCar,
    }, {headers: token()}).then(res=>{
      modalAddCar.value = false;
      store.dispatch("err/setError", "You added new Car!");
      getCars();
    }).catch(err=>{
      console.log(err);
      store.dispatch("err/setError", err.response.data.message);
    })
  }
};
function editCar(){
  let data = new Date();
  let date_of_entry = new Date(carToEdit.date_of_entry)
  console.log(date_of_entry.getTime());
  if(carToEdit.producer === ''){
    store.dispatch("err/setError", "producer cannot be empty value")
  }else if(carToEdit.model === ""){
    store.dispatch("err/setError", "model cannot be empty value")
  }else if(carToEdit.year < 1900 || carToEdit.year > data.getFullYear()){
    store.dispatch("err/setError", "wrong year of production");
  }else if(carToEdit.mileage < 0){
    store.dispatch("err/setError", "Mileage cannot be lower than 0!");
  }else if(date_of_entry.getTime() > data.getTime() || date_of_entry.getFullYear() < 1970){
    store.dispatch("err/setError", "wrong date of entry");
  }else{
    axios.put(`${api_url}/cars/${carToEdit.id}`, {
      carToEdit,
    }, {headers: token()}).then(res=>{
      modalEditCar.value = false;
      getCars();
    }).catch(err=>{
      console.log(err);
      store.dispatch("err/setError", err.response.data.message);
    })
  }
};
function deleteCar(){
  axios.delete(`${api_url}/cars/${carToDelete.id}`, {headers: token()}).then(res=>{
    modalDelCar.value = false;
    console.log(res);
    getCars();
  }).catch(err=>{
    store.dispatch("err/setError", err.response.data.message);
  })
}



onMounted(() => {
  getCars();
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
