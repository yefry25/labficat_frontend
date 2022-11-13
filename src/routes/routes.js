import inicio from '../components/Inicio.vue'
import login from '../components/Login.vue'
import cotizacion from '../components/Cotizacion.vue'
import recepcionMuestra from '../components/RecepcionMuestra.vue'
import registro from '../components/Registro.vue'
import configuracion from '../components/Configuracion.vue'
import informeDeResultados from '../components/InformeDeResultados.vue'
import setup from '../components/SetUp.vue'
import ensayo from '../components/Ensayo.vue'
import bitacora from '../components/Bitacora.vue'
import calidad from '../components/Calidad.vue'
import mostrarCotizacion from '../components/MostrarCotizacion.vue'
import mostrarMuestra from '../components/MostrarMuestra.vue'
import ordenServicio from '../components/OrdenDeServicios.vue'
import mostrarUsuario from '../components/MostrarUsuario.vue'
import mostrarEnsayo from '../components/MostrarEnsayos.vue'
import lismamu from '../components/LisMaMu.vue'
import prueba from '../components/Pruebas.vue'
import cambiar from '../components/CambiarPassword.vue'
import actualizar from '../components/Actualizacion.vue'
import perfil from "../components/Perfil.vue"

export const routes = [
    {path: '/inicio', component: inicio},
    {path: '/', component: login},
    {path: '/cotizacion', component: cotizacion},
    {path:'/recepcionMuestra', component: recepcionMuestra},
    {path: '/registro', component: registro},
    {path: '/informeDeResultados', component: informeDeResultados},
    {path: '/configuracion', component: configuracion},
    {path: '/setup', component: setup},
    {path: '/ensayo', component: ensayo},
    {path: '/bitacora', component: bitacora},
    {path: '/calidad', component: calidad},
    {path: '/mostrarCotizacion', component: mostrarCotizacion},
    {path: '/mostrarMuestra', component: mostrarMuestra},
    {path:'/ordenServicio', component: ordenServicio},
    {path:'/mostrarUsuarios',component: mostrarUsuario},
    {path:'/mostrarEnsayos',component: mostrarEnsayo},
    {path:'/lismamu' , component: lismamu},
    {path:'/pruebas', component:prueba},
    {path:'/cambiarPrueba', component:cambiar},
    {path:'/actualizar', component:actualizar},
    {path:'/perfil', component:perfil}
]