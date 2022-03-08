<template>
    <div class="grid grid-cols-3 gap-4">
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
                    <a href="#" class="card-footer-item">Edit</a>
                    <a href="#" class="card-footer-item">Delete</a>
                </footer>
            </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  cars: Array,
});

let page = ref(1);
let elements = ref(9);

let cars = computed(() => {
    const start = page.value * elements.value - elements.value;
    const end = start + elements.value - 1;

    return props.cars.filter((item, index) => index >= start && index <= end)
   return props.cars
})

onMounted(() => {
    console.log(process.env.VUE_APP_API_URL);
    console.log(cars);
})

</script>

<style lang="scss" scoped>
// .grid{
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr;
// }

</style>