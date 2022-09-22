import inicio from '../components/Inicio.vue'
import login from '../components/Login.vue'
import cotizacion from '../components/Cotizacion.vue'
import recepcionMuestra from '../components/RecepcionMuestra.vue'
import registro from '../components/Registro.vue'
import setup from '../components/SetUp.vue'
import informeDeResultados from '../components/InformeDeResultados.vue'
export const routes = [
    {path: '/inicio', component: inicio},
    {path: '/', component: login},
    {path: '/cotizacion', component: cotizacion},
    {path:'/recepcionMuestra', component: recepcionMuestra},
    {path: '/registro', component: registro},
    {path: '/informeDeResultados', component: informeDeResultados},
    {path: '/setup', component: setup}
]