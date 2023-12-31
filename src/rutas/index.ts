import { Elysia } from 'elysia';
import * as Servicio from '../components/servicio';
import * as Empleado from '../components/empleado';
import * as Cliente from '../components/cliente';
import usuario from '../auth/usuario';
import * as Auth from '../auth';
import * as Equipo from '../components/articulo/Equipo';
const RutaServicio = new Elysia({ prefix: '/tarea' }).use(Servicio.Controller.default);
const RutaEmpleado = new Elysia({ prefix: '/empleado' }).use(Empleado.Controller.default);
const RutaCliente = new Elysia({ prefix: '/cliente' }).use(Cliente.Controller.default);
const RutaEquipos = new Elysia({ prefix: '/equipo' }).use(Equipo.Controlador.default);
const RutaUsuario = new Elysia({ prefix: '/usuario' }).use(usuario);
const RutaAuth = new Elysia({ prefix: '/auth' }).use(Auth.default);
export default new Elysia()
    .use(RutaEmpleado)
    .use(RutaEquipos)
    .use(RutaServicio)
    .use(RutaCliente)
    .use(RutaUsuario)
    .use(RutaAuth);