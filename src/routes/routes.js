import inicio from '../components/Inicio.vue'
import login from '../components/Login.vue'
import cotizacion from '../components/Cotizacion.vue'
import recepcionMuestra from '../components/RecepcionMuestra.vue'
export const routes = [
    {path: '/inicio', component: inicio},
    {path: '/', component: login},
    {path: '/cotizacion', component: cotizacion},
    {path:'/recepcionMuestra', component: recepcionMuestra}
]