<template>
    <div class="grid md:grid-cols-3 gap-4">
        <div v-for="car in cars" :key="car.id" class="card group">
            <header class="card-header">
                <!-- <p class="card-header-title">
                Component
                </p>
                <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button> -->
            </header>
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
        <div v-show="page == 1" class="card add-car self-start">
            <header class="card-header">
                <!-- <p class="card-header-title">
                Component
                </p>
                <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button> -->
            </header>
            <div class="card-content pt-4 pl-4">
                <div class="content">
                    <div>
                        <div class="text-3xl">
                            Hey you...
                            <span class="text-lg">want to add...</span>
                        </div>
                        <div class="mt-5">
                            <div>
                            </div>
                            <div class="mt-2 flex justify-end">
                                <button @click="emit('addCar')" class="button is-medium is-link">Some cars?</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
    <div class="mt-4 px-4">
        <nav class="pagination is-right" role="navigation" aria-label="pagination">
            <!-- <a class="pagination-previous">Previous</a>
            <a class="pagination-next">Next page</a> -->
            <ul class="pagination-list">
                <li v-for="p in pages" :key="p">
                    <a @click="goToPage(p)" :class="[p === page ? 'is-current' : '']" class="pagination-link" aria-label="Page 1" aria-current="page">{{p}}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  cars: Array,
});

let page = ref(1);
let elements = ref(8);

let pages = computed(() => {
    if(props.cars.length > 0){
        // if(page.value === 1){
        //     return Math.ceil(props.cars.length / elements.value - 1);
        // }
        return Math.ceil(props.cars.length / elements.value);
    }
})

let cars = computed(() => {
    const start = page.value * elements.value - elements.value;
    const end = start + elements.value - 1;

    return props.cars.filter((item, index) => index >= start && index <= end)
});

function goToPage(p){
    page.value = p;
}

const emit = defineEmits(['editCar', 'delCar', 'addCar']);

function editCar(car){
    emit('editCar', car);
}
function delCar(car){
    emit('delCar', car);
}


onMounted(() => {
    // console.log(process.env.VUE_APP_API_URL);
    // console.log(Math.ceil(props.cars / elements.value));
})

</script>

<style lang="scss" scoped>
// .grid{
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr;
// }
.card{
    background-image: linear-gradient(45deg, rgba(14, 14, 14,0.03) 0%, rgba(14, 14, 14,0.03) 38%,rgba(250, 250, 250,0.03) 38%, rgba(250, 250, 250,0.03) 45%,rgba(113, 113, 113,0.03) 45%, rgba(113, 113, 113,0.03) 100%),linear-gradient(135deg, rgba(148, 148, 148,0.03) 0%, rgba(148, 148, 148,0.03) 36%,rgba(219, 219, 219,0.03) 36%, rgba(219, 219, 219,0.03) 63%,rgba(62, 62, 62,0.03) 63%, rgba(62, 62, 62,0.03) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255));
}

</style>