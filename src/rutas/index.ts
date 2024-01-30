import { Elysia } from 'elysia';
import * as Servicio from '../components/servicio';
import * as Empleado from '../components/empleado';
import * as Cliente from '../components/cliente';
import Controlador from '../auth/usuario';
import * as Auth from '../auth';
import * as Equipo from '../components/articulo/Equipo';
import Sync from '../components/sync';

const RutaEquipos = new Elysia({ prefix: '/equipo' }).use(Equipo.Controlador);
const RutaCliente = new Elysia({ prefix: '/cliente' }).use(Cliente.Controlador);
const RutaEmpleado = new Elysia({ prefix: '/empleado' }).use(Empleado.Controlador);
const RutaServicio = new Elysia({ prefix: '/servicio' }).use(Servicio.Servicio.Controlador);
const RutaTarea = new Elysia({ prefix: '/tarea' }).use(Servicio.Tarea.Controlador);

const RutaUsuario = new Elysia({ prefix: '/usuario' }).use(Controlador);
const RutaAuth = new Elysia({ prefix: '/auth' }).use(Auth.default);
export default new Elysia()
    .use(Sync)
    .use(RutaEmpleado)
    .use(RutaEquipos)
    .use(RutaServicio)
    .use(RutaTarea)
    .use(RutaCliente)
    .use(RutaUsuario)
    .use(RutaAuth);