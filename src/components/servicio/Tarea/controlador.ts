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

Controlador.get('/fotos', Servicio.listarTareaFoto);
Controlador.post('/fotos', Servicio.crearTareaFoto, { body: schemaTareaFoto });
Controlador.put('/fotos/:id', Servicio.modificarTareaFoto, { body: schemaTareaFoto });
Controlador.delete('/fotos/:id', Servicio.eliminarTareaFoto);

export default Controlador;