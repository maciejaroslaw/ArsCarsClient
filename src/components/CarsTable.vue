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
    <div>
        <nav class="pagination" role="navigation" aria-label="pagination">
            <a class="pagination-previous">Previous</a>
            <a class="pagination-next">Next page</a>
            <ul class="pagination-list">
                <li v-for="p in pages" :key="p">
                    <a class="pagination-link is-current" aria-label="Page 1" aria-current="page">{{p}}</a>
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
let elements = ref(9);

let pages = computed(() => {
    return Math.ceil(props.cars.length / elements.value);
})

let cars = computed(() => {
    const start = page.value * elements.value - elements.value;
    const end = start + elements.value - 1;

    return props.cars.filter((item, index) => index >= start && index <= end)
})


onMounted(() => {
    console.log(process.env.VUE_APP_API_URL);
    console.log(Math.ceil(props.cars / elements.value));
})

</script>

<style lang="scss" scoped>
// .grid{
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr;
// }

</style>