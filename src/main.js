import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios';



require('./assets/main.scss')

const app = createApp(App).use(store).use(router);
app.provide('axios', axios);
app.provide('token', ()=> {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user && user.accessToken){
        return {'x-access-token': user.accessToken};
    }else{
        return {}
    }
});
app.provide('api_url', process.env.VUE_APP_API_URL || 'http://localhost:3000');
// app.config.globalProperties.$axios = axios;
// app.config.globalProperties.$token = () => {
//     let user = JSON.parse(localStorage.getItem('user'));
//     if(user && user.accessToken){
//         return {'x-access-token': user.accessToken};
//     }else{
//         return {}
//     }
// };
// app.config.globalProperties.$api_url = process.env.VUE_APP_API_URL || 'http://localhost:3000';

app.mount('#app')
