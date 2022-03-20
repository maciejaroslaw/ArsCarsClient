<template>
<div v-if="currentUser">
    <div v-if="isLoading" class="flex justify-center">
      <button class="button is-light is-loading is-large">White</button>
    </div>
    <div v-else>
      <cars-table @addCar="modalAddCar = true" @delCar="handleDel" @editCar="handleEdit" :cars="cars" />
    </div>
    
    <AddEditCarModal @closeModal="modalEditCar = false" :isOpen="modalEditCar" :CarToEdit="carToEdit" />
    <AddEditCarModal @closeModal="modalAddCar = false" :isOpen="modalAddCar" :CarToEdit="null"/>
    
    <DeleteCarModal @refreshCars="getCars" @closeModal="modalDelCar = false" :modalDelCar="modalDelCar" :carToDelete="carToDelete"/>
</div>
<div v-else class="absolute w-full">
  <div class="md:hidden mt-24">
    <div class="text-3xl w-full text-center">
      Please <router-link to="/login">Log in</router-link> to see all cars
    </div>  
  </div>
  <div class="hidden md:block">
    <div style="background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 45%);
      z-index: 10;" class="fog absolute h-full z-10 w-full">
      <div class="absolute top-1/2 transform text-3xl w-full text-center">
        Please <router-link to="/login">Log in</router-link> to see all cars
      </div>  
    </div>
    <div class="grid md:grid-cols-3 gap-4 w-full">
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
          <footer class="card-footer invisible">
              <a href="#" class="card-footer-item">Edit</a>
              <a href="#" class="card-footer-item">Delete</a>
          </footer>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import CarsTable from '../components/CarsTable.vue';
import DeleteCarModal from '../components/DeleteCarModal.vue';
import AddEditCarModal from '../components/AddEditCarModal.vue';
import { ref, reactive, inject, onMounted, computed} from 'vue';
import {useStore} from 'vuex';


const axios = inject('axios');
const token = inject('token');
const api_url = inject('api_url');
const store = useStore();

const currentUser = computed(() => store.state.auth.user);

const dummyCars = ref([{"id":1,"producer":"Ford","model":"Five Hundred","year":2007,"date_of_entry":"2009-03-05","mileage":27763},
{"id":2,"producer":"Pontiac","model":"Bonneville","year":1987,"date_of_entry":"1984-10-06","mileage":37362},
{"id":3,"producer":"Dodge","model":"Ram Van 2500","year":2002,"date_of_entry":"2003-06-13","mileage":17125},
{"id":4,"producer":"Lamborghini","model":"Diablo","year":1998,"date_of_entry":"1985-07-22","mileage":34965},
{"id":5,"producer":"Infiniti","model":"G37","year":2008,"date_of_entry":"1971-05-11","mileage":28699},
{"id":6,"producer":"Ford","model":"Taurus","year":2001,"date_of_entry":"2005-03-28","mileage":34955},
{"id":7,"producer":"Mazda","model":"B-Series","year":1991,"date_of_entry":"1995-02-16","mileage":7615},
{"id":8,"producer":"Maserati","model":"430","year":1991,"date_of_entry":"1980-05-13","mileage":27717},
{"id":9,"producer":"Mercedes-Benz","model":"Sprinter 3500","year":2011,"date_of_entry":"2010-01-04","mileage":32561}])

const cars = ref([]);
const isLoading = ref(true);

const modalEditCar = ref(false);
const modalDelCar = ref(false);
const modalAddCar = ref(false);

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
  if(currentUser.value){
    axios.get(`${api_url}/cars`, {headers: token()}).then(res=>{
      cars.value = res.data.cars;
      isLoading.value = false;
    }).catch(err=>{
      store.dispatch("err/setError", err.response.data.message);
      isLoading.value = false;
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




onMounted(() => {
  getCars();
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
