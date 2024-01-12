import { Elysia } from 'elysia';
import * as Tarea from './Tarea';
import * as Servicio from './Servicio';
const Controlador = new Elysia()
    .onError(({ code, error, set }) => {
        if (code) {
            set.status = 400;
            return { error: { message: error.message } };
        }
    });

Controlador.use(Servicio.Controlador);
Controlador.use(Tarea.Controlador);
export default Controlador;