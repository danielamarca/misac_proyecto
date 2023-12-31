import { Elysia } from 'elysia';
import * as Tarea from './Tarea';
import * as Servicio from './Servicio';
const servicio = new Elysia();

// servicio.use(Tarea.Controller.default);
servicio.use(Servicio.Controller.default);
export default servicio;