import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Profil from '../views/Profil.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component : Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component : Signup
    },
    {
      path: '/profil',
      name: 'Profil',
      component : Profil
    },
  ]
})
// a chaque changement de page, on peut diriger l'utilisateur
router.beforeEach((to, from, next)=>{
  //
  const user = store.getters["user"];
  if(user === null && to.name !== "Login" && to.name !== "Signup"){
    next({name: "Login"});
  }else{
    next();
  }

})
export default router
