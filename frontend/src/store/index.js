import {createStore} from "vuex"
import axios from "axios"
const store = createStore({
    // créer une variable globale accessible danbs tous les composants de l'app
    state:{
        user:null
    },
    // créer des fonctions qui peuvent modifier le state
    mutations:{
        // payload  = paramètre externe de la fonction
        setUser(state, payload){
            state.user = payload
        }
    },
    //requêtes
    actions:{
        logOut(context){
            context.commit("setUser", null);
            localStorage.token = null;
            location.reload();
        },
        logIn(context, payload){
            return new Promise((resolve, reject)=>{
                axios.post("/auth/login", payload).then((res)=>{
                    //commit accéder aux mutations
                   context.commit("setUser", res.data.user)
                   localStorage.setItem("token", res.data.token)
                   //Metre le token au début de chaque requête  
                   axios.defaults.headers.common["Authorization"] = res.data.token
                   resolve()                   
                }).catch(error => reject(error))
            })

        },
        // context permet d'accéder au store
        signUp(context, payload){
            // resolve promesse résolue, reject promesse rejetée
            return new Promise((resolve, reject)=>{
                axios.post("/auth/signup", payload).then(()=>{
                   resolve()                   
                }).catch(error => reject(error))
            })

        },
        deleteUser(context, payload){
            axios.delete("/auth/"+payload).then(() => {
                context.commit("setUser", null)
                localStorage.token = null;
                location.reload();
            })
        },
        init(context){
            return new Promise((resolve, reject)=>{
                if(localStorage.token !== null){
                    axios.defaults.headers.common["Authorization"] = localStorage.token;
                    axios.get("/auth/me").then((res)=>{
                        context.commit("setUser", res.data);
                        resolve()                   
                     }).catch(error => {
                        if(error.response.status === 403){
                            resolve();
                        }
                        reject(error)
                    })
                }else{
                    resolve();
                }
            })

        }
    },
    getters:{
        user(state){
            return state.user
        }
    }
})

export default store