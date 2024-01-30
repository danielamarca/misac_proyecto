import { Elysia } from 'elysia';
import Servicio, { schemaTarea, schemaTareaFoto } from './servicio';
const Controlador = new Elysia()
    .onError(({ code, error, set }) => {
        if (code) {
            set.status = 400;
            return { error: { message: error.message } };
        }
    });

Controlador.get('/', Servicio.listarTarea);
Controlador.post('/', Servicio.crearTarea, { body: schemaTarea });
Controlador.put('/:id', Servicio.modificarTarea, { body: schemaTarea });
Controlador.delete('/:id', Servicio.eliminarTarea);

Controlador.get('/tarea', Servicio.listarTareaFoto);
Controlador.post('/tarea', Servicio.crearTareaFoto, { body: schemaTareaFoto });
Controlador.put('/tarea/:id', Servicio.modificarTareaFoto, { body: schemaTareaFoto });
Controlador.delete('/tarea/:id', Servicio.eliminarTareaFoto);

export default Controlador;