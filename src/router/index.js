import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/auth/Login.vue"
import Register from "../components/auth/Register.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      enterClass: "animate__animated animate__fadeIn",
      leaveClass: "animate__animated animate__fadeOut",
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      enterClass: "animate__animated animate__slideInLeft",
      leaveClass: "animate__animated animate__fadeOutRightBig"
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      enterClass: "animate__animated animate__slideInRight",
      leaveClass: "animate__animated animate__fadeOutLeftBig"
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  const logged = localStorage.getItem('user');
  if(authRequired && !logged){
    next('/login')
  }else{
    next();
  }
})

export default router;